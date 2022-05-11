from typing import Optional
import uvicorn
from fastapi import FastAPI

app = FastAPI()

#uvicorn  main:app --reload
@app.get("/")
def read_root():
    return {"Hello": "World"}

"""/items/路径参数"""
"""查询参数定义放到函数类即可"""
'''
发送请求http://127.0.0.1:8000/itemsid/13231?q=%2212121%22
回应
{"item_id":13231,"q":"\"12121\""}
注意是 q 参数
'''
@app.get("/itemsid/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

@app.put("/itemsid/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

#加上async就是异步处理