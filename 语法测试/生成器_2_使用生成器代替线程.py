from collections import deque

"""
但是关键点在于收集消息的队列。 本质上，调度器在有需要发送的消息时会一直运行着
"""
class ActorScheduler:
    def __init__(self):
        self._actors = {}  # Mapping of names to actors
        self._msg_queue = deque()  # Message queue

    def new_actor(self, name, actor):
        '''
        Admit a newly started actor to the scheduler and give it a name
        注册一个线程再python程序中
        '''
        self._msg_queue.append((actor, None))
        self._actors[name] = actor

    def send(self, name, msg):
        '''
        Send a message to a named actor
        '''
        actor = self._actors.get(name)
        if actor:
            self._msg_queue.append((actor, msg))

    def run(self):
        '''
        Run as long as there are pending messages.
        '''
        """
        队列 queue里面就放入了 counter 200
        """
        while self._msg_queue:
            actor, msg = self._msg_queue.popleft()
            try:
                actor.send(msg)
            except StopIteration:
                pass


# Example use
if __name__ == '__main__':
    def printer():
        while True:
            msg = yield
            print('Got:', msg)


    def counter(sched):
        while True:
            # Receive the current count
            n = yield
            if n == 0:
                break
            # Send to the printer task
            sched.send('printer', n)
            # Send the next count to the counter task (recursive)
            sched.send('counter', n - 1)


    # sched = ActorScheduler()
    # # Create the initial actors
    # sched.new_actor('printer', printer())
    # sched.new_actor('counter', counter(sched))
    #
    # # Send an initial message to the counter to initiate
    # sched.send('counter', 10)
    # sched.run()
