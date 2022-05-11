###
#Pydantic 是一个基于 Python 类型提示来定义数据验证，序列化和文档（使用 JSON 模式）库

"""
Data validation and settings management using python type annotations.
使用Python的类型注解来进行数据校验和settings管理

pydantic enforces type hints at runtime, and provides user friendly errors when data is invalid.
Pydantic可以在代码运行时提供类型提示，数据校验失败时提供友好的错误提示

Define how data should be in pure, canonical python; validate it with pydantic.
定义数据应该如何在纯规范的Python代码中保存，并用Pydantic验证它
"""
from typing import List
from typing import Optional
from pydantic import BaseModel, ValidationError
from datetime import datetime, date
from pydantic import constr


#对象序列化是指将内存中保存的对象以二进制数据流的形式进行处理传输

class User(BaseModel):
    id: int  # 必须字段
    name: str = "John Snow"  # 有默认值，选填字段
    signup_ts: Optional[datetime] = None    #选填字段
    friends: List[int] = []  # 列表中元素是int类型或者可以直接转换成int类型

external_data = {
    "id": "123",
    "signup_ts": "2024-12-22 12:22",
    "friends": [1, 2, "3"],  # "3"是可以int("3")的
}

user = User(**external_data)
print(user.id, user.friends) # 实例化后调用属性

print("\033[31m2. --- 校验失败处理 ---\033[0m")
try:
    User(id=1, signup_ts=datetime.today(), friends=[1, 2, "not number"])#不能强行转换为int
except ValidationError as e:
    print(e.json())

print("\033[31m3. --- 模型类的的属性和方法 ---\033[0m")
print(user.dict())
print(user.json())
print(user.copy())  # 这里是浅拷贝
#parse_obj
"""
这与模型的__init__方法非常相似，只是它采用字典而不是关键字参数。如果传递的对象不是字典，则将引发 ValidationError。 
"""
print(User.parse_obj(external_data))
#parse_raw
"""
这将获取一个 str 或字节并将其解析为 json，然后将结果传递给 parse_obj。通过适当地设置content_type参数，也可以支持解析泡菜数据。 
"""
print(User.parse_raw('{"id": "123", "signup_ts": "2021-12-22 12:22", "friends": [1, 2, "3"]}'))
#parse_file
"""
这会接收文件路径，读取文件并将内容传递给parse_raw。如果省略content_type，则从文件扩展名推断出来。
"""
from pathlib import Path
path = Path('data.json')
path.write_text('{"id": 123, "name": "James"}')
m = User.parse_file(path)
print(m)
#会带上格式 数据再properties里面
print(user.schema())
print(user.schema_json())


user_data = {"id": "error", "signup_ts": "2020-12-22 12 22", "friends": [1, 2, 3]}  # id是字符串 是错误的
print(User.construct(**user_data))  # 不检验数据直接创建模型类，不建议在construct方法中传入未经验证的数据



print(User.__fields__.keys())  # 定义模型类的时候，所有字段都注明类型，字段顺序就不会乱

print("\033[31m4. --- 递归模型 ---\033[0m")
#什么递归模型 就是一个类调用另外一个方法





class Sound(BaseModel):
    sound: str


class Dog(BaseModel):
    birthday: date
    weight: float = Optional[None]
    sound: List[Sound]  # 不同的狗有不同的叫声。递归模型（Recursive Models）就是指一个嵌套一个


dogs = Dog(birthday=date.today(), weight=6.66, sound=[{"sound": "wang wang ~"}, {"sound": "ying ying ~"}])
print(dogs.dict())

dogs = Dog(birthday=date.today(), weight=6.66, sound=[{"sound":"汪汪"}, {"sound":"汪汪2"}])

print(dogs.dict())

print("\033[31m5. --- ORM模型：从类实例创建符合ORM对象的模型  ---\033[0m")

