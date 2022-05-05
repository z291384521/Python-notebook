from jsonpath import jsonpath
'''
$ 根节点
. or [] 取子节点
.. 不管位置 选择所有符合的条件子孙节点
用于以下的json字符串会很快
'''
data = {'key1':{'key2':{"key3":{'key4':{"key5":{"key6":"python"}}}}}}
print(jsonpath(data,"$.key1.key2.key3.key4.key5.key6"))
print(jsonpath(data,"$..key6"))
'''
$ 根节点
. or [] 取子节点
.. 不管位置 选择所有符合的条件子孙节点

@ 现行节点
n/a 取父节点 未支持
* 匹配所有元素节点
'''
book_dict = { 
  "store": {
    "book": [ 
      { "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      { "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      { "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      { "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}
'''
$. store . book[*]. author
store中的所有的book的作者
$.. author
所有的作者
$.store. *
store下的所有的元素
$.store. . price
store中的所有的内容的价格
$. . book[2]
第三本书
$.. book[(@.1ength-1)] | $.. book[-1:]
最后一本书
$..book[0,1] | $..book[:2]
前两本书
$.. book[?(@.isbn)]
获取有isbn的所有数
$. . book[?(@.price<10)]
获取价格大于10的所有的书
$..*
获取所有的数据

'''
print(jsonpath(book_dict, '$..author'))
print(jsonpath(book_dict, '$.store..price'))