from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi import FastAPI, Query


class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price:  int
    tax: Optional[float] = None

item1 = Item(name="Tom",price=111.00)
print(item1.json()) # {"name": "Tom"}


app = FastAPI()


@app.post("/items/")
async def create_item(item: Item):
    # item_dict = item.dict()
    # if item.tax:
    #     price_with_tax = item.price + item.tax
    #     item_dict.update({"price_with_tax": price_with_tax})
    return item





@app.get("/items2/")
async def read_items(q: Optional[str] = Query(None, max_length=50)):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
