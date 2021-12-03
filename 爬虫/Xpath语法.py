'''
| nodename | 选中该元素。                                               |
| -------- | ---------------------------------------------------------- |
| /        | 从根节点选取、或者是元素和元素间的过渡。                   |
| //       | 从匹配选择的当前节点选择文档中的节点，而不考虑它们的位置。 |
| .        | 选取当前节点。                                             |
| ..       | 选取当前节点的父节点。                                     |
| @        | 选取属性。                                                 |
| text()   | 选取文本。                                                 |

案例网站http://bangumi.tv/book/browser?sort=rank
匹配标题
//html/head/title
或者//html//title
或者//title
title上上级
//title/../../
//title/text()

#@选取属性
//div/a/@href


| //title[@lang="eng"]                | 选择lang属性值为eng的所有title元素                                                     |
| /bookstore/book[1]                  | 选取属于 bookstore 子元素的第一个 book 元素。                                           |
| /bookstore/book[last()]             | 选取属于 bookstore 子元素的最后一个 book 元素。                                         |
| /bookstore/book[last()-1]           | 选取属于 bookstore 子元素的倒数第二个 book 元素。                                       |
| /bookstore/book[position()>1]       | 选择bookstore下面的book元素，从第二个开始选择                                           |
| //book/title[text()='Harry Potter'] | 选择所有book下的title元素，仅仅选择文本为Harry Potter的title元素                         |
| /bookstore/book[price>35.00]/title  | 选取 bookstore 元素中的 book 元素的所有 title 元素，且其中的 price 元素的值须大于 35.00。 |

http://bangumi.tv/subject/28842
//div/ul/li[1]/ul/li[2]/a[last()]

//div[@class="game-hot fl"]//li[@class="info"]/a
//div[@class="game-hot fl"]//li[@class="info"]/a[@class="name"] []进行筛选标签

模糊查询
//*[@id="friendLink_data_content"]/a[contains(text(),"书")]

| *      | 匹配任何元素节点。   |
| ------ | -------------------- |
| node() | 匹配任何类型的节点。 |
| ------ | -------------------- |
| @*      | 匹配任何属性节点。   |


或者|
//p[@class="name"]|//li[@class="info"]/a[@class="name"]
'''
