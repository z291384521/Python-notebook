from typing import Optional
import uvicorn
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}



def get_full_name(first_name, last_name):
    full_name = first_name.title() + " " + last_name.title()
    return full_name


@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}

"""
在创建路径操作时，你会发现有些情况下路径是固定的。

比如 /users/me，我们假设它用来获取关于当前用户的数据.

然后，你还可以使用路径 /users/{user_id} 来通过用户 ID 获取关于特定用户的数据。

由于路径操作是按顺序依次运行的，你需要确保路径 /users/me 声明在路径 /users/{user_id}之前：
"""
@app.get("/users/me")
async def read_user_me():
    return {"user_id": "the current user"}


@app.get("/users/{user_id}")
async def read_user(user_id: str):
    return {"user_id": user_id}

from enum import Enum


class ModelName(str, Enum):
    alexnet = "alexnet"
    resnet = "resnet"
    lenet = "lenet"



@app.get("/models/{model_name}")
async def get_model(model_name: ModelName):
    if model_name == ModelName.alexnet:
        return {"model_name": model_name, "message": "Deep Learning FTW!"}

    if model_name.value == "lenet":
        return {"model_name": model_name, "message": "LeCNN all the images"}

    return {"model_name": model_name, "message": "Have some residuals"}


from fastapi import FastAPI

app = FastAPI()

"""
在这种情况下，参数的名称为 file_path，结尾部分的 :path 说明该参数应匹配任意的路径。

因此，你可以这样使用它：
访问
http://127.0.0.1:8000/files/home/johndoe/myfile.txt
会返回
{"file_path":"home/johndoe/myfile.txt"}
"""
@app.get("/files/{file_path:path}")
async def read_file(file_path: str):
    return {"file_path": file_path}


fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]


@app.get("/items/")
async def read_item(skip: int = 0, limit: int = 10):
    return fake_items_db[skip : skip + limit]

#可选参数
#http://127.0.0.1:8000/items_a/item_id=sdadasdas?q=asdasda
#返回{"item_id":"item_id=sdadasdas","q":"asdasda"}
@app.get("/items_a/{item_id}")
async def read_item(item_id: str, q: Optional[str] = None):
    if q:
        return {"item_id": item_id, "q": q}
    return {"item_id": item_id}
#必需查询参数
#这里的查询参数 needy 是类型为 str 的必需查询参数。
# http://127.0.0.1:8000/items/foo-item
# 会报错
@app.get("/items_b/{item_id}")
async def read_user_item(item_id: str, needy: str):
    item = {"item_id": item_id, "needy": needy}
    return item
#当然，你也可以定义一些参数为必需的，一些具有默认值，而某些则完全是可选的：
@app.get("/items/{item_id}")
async def read_user_item(
    item_id: str, needy: str, skip: int = 0, limit: Optional[int] = None
):
    item = {"item_id": item_id, "needy": needy, "skip": skip, "limit": limit}
    return item
    