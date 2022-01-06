#定义 __iter__ 表示这个类是一个迭代器（iterator）。它只在迭代开始的时候运行一次
#返回必须是迭代器
#接下来就是循环调用 __next__ 直到遇到 raise StopIteration 为止
class Node:
    def __init__(self, value):
        self._value = value
        self._children = []

    def __repr__(self):
        return 'Node({!r})'.format(self._value)

    def add_child(self, node):
        self._children.append(node)

    def __iter__(self):
        return iter(self._children)


# Example
if __name__ == '__main__':
    root = Node(0)
    child1 = Node(1)
    child2 = Node(2)
    root.add_child(child1)
    root.add_child(child2)
    # Outputs Node(1), Node(2)
    for ch in root:
        print(ch)


# 一个小列子
class Fib:
    def __init__(self, max):
        self.max = max

    def __iter__(self):
        # returnd的对象必须是可以迭代的(有next属性)
        print('__iter__ called')
        self.a = 0
        self.b = 1
        return self

    def __next__(self):
        print('__next__ called')
        fib = self.a
        if fib > self.max:
            raise StopIteration
        self.a, self.b = self.b, self.a + self.b
        return fib
for i in Fib(3):
    print(i)
