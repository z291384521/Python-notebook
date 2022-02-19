#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-18 16:09:09
#@FilePath     : \Python-notebook\alas任务管理\utils.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-19 14:52:55


from ast import operator
import ctypes
import threading
import time
from tkinter import EXCEPTION
from typing import Callable, Generator
from logger import logger
from typing import List

class Thread(threading.Thread):

    # 加了停止线程方法的线程
    # https://www.geeksforgeeks.org/python-different-ways-to-kill-a-thread/
    def _get_id(self):
        # returns id of the respective thread
        if hasattr(self, '_thread_id'):
            return self._thread_id
        for thd_id, thread in threading._active.items():
            if thread is self:
                return thd_id

    def stop(self):
        if self.is_alive():
            thread_id = self._get_id()
            res = ctypes.pythonapi.PyThreadState_SetAsyncExc(thread_id,
                                                             ctypes.py_object(SystemExit))
            if res > 1:
                ctypes.pythonapi.PyThreadState_SetAsyncExc(thread_id, 0)
                logger.error('Exception raise failure')

class Task:
    def __init__(self,g:Generator,delay:float,next_run:float=None,name:str=None) -> None:
        self.g=g
        g.send(None)
        self.delay = delay
        #如果写了 下次执行时间就是下次执行时间 没有就是当前时间
        self.next = next_run if next_run else time.time()
        self.name = name if name is not None else self.g.__name__
    #delay延迟执行
    def __str__(self) -> str:
        return f'<{self.name} (delay={self.delay})>'    
    

    def __next__(self) -> None:
        return next(self.g)

    def send(self, obj) -> None:
        return self.g.send(obj)

    __repr__ = __str__    

class TaskHandler:
    def __init__(self) -> None:
        # List of background running task
        # 后台执行的任务
        self.tasks: List[Task] = []
        # List of task name to be removed
        #需要移除的任务列表
        self.pending_remove_tasks: List[Task] = []
        # Running task
        self._task = None
        # Task running thread
        self._thread: Thread = None
        #防止进程打架的
        self._lock = threading.Lock()

    def add(self,func,delay:float, pending_delete: bool = False):
        "pending_delete 是否准备删除"
        "将方法变成任务 Callable为可以调用的方法 "
        if isinstance(func,Callable):               
            g = get_generator(func)
        elif isinstance(func, Generator):
            g = func
        self.add_task(Task(g, delay), pending_delete=pending_delete)

    def add_task(self, task: Task, pending_delete: bool = False) -> None:
        """
        Add a task running background.
        和删除任务
        """
        if task in self.tasks:
            logger.warning(f"Task {task} already in tasks list.")
            return
        logger.info(f"Add task {task}")
        with self._lock:
            self.tasks.append(task)
        if pending_delete:
            self.pending_remove_tasks.append(task)

    def _remove_task(self, task: Task) -> None:
        #如果再列表里面移除
        if task in self.tasks:
            self.tasks.remove(task)
            logger.info(f"Task {task} removed.")
        else:
            logger.warning(
                f"Failed to remove task {task}. Current tasks list: {self.tasks}")    
    def remove_task(self,task:Task,nowait:bool=False):
        """
        Remove a task in `self.tasks`.
        Args:
            task:
            nowait: if True, remove it right now, 如果
                    otherwise remove when call `self.remove_pending_task`
        """
        if nowait:
            with self._lock:
                self._remove_task(task)
        else:
            #不是马上移除 添加列表
            self.pending_remove_tasks.append(task)

    def remove_pending_task(self) -> None:
        """
        Remove all pending remove tasks.移除所有准备删除的任务
        """
        with self._lock:
            for task in self.pending_remove_tasks:
                self._remove_task(task)
                #删除完了以后给空值
            self.pending_remove_tasks = []

    def get_task(self, name) -> Task:
        with self._lock:
            for task in self.tasks:
                if task.name == name:
                    return task
            return None            

    def remove_current_task(self) -> None:
        self.remove_task(self._task, nowait=True)        


    #核心中的核心 执行循环方法
    def loop(self):
        while True:
            if self.tasks:
                with self._lock:
                    #根据下次执行时间来排序
                    self.tasks.sort(key=operator.attrgetter('next_run'))
                    task = self.tasks[0]
                if task.next_run < time.time():
                    start_time = time.time()
                    try:
                        self._task=task
                        #执行send程序
                        task.send(self)
                    except Exception as e:
                        logger.exception(e)
                        #报错程序移除后台程序 立即移除
                        self.remove_task(task,nowait=True)
                    finally:
                        self._task =None
                    end_time = time.time()
                    #如果有下次执行时间加上下次执行时间
                    task.next_run += task.delay    
                    #所有任务加上时间    
                    with self._lock:
                        for task in self.tasks:
                            task.next_run += end_time - start_time 
                else:
                    time.sleep(0.05)
            else:
                time.sleep(0.5)                                                               
def get_generator(func: Callable):
    def _g():
        yield
        while True:
            yield func()
    g = _g()
    g.__name__ = func.__name__
    return g