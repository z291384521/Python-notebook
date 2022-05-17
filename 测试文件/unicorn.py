import uvicorn
"""
使用进程管理器确保你以弹性方式运行运行多个进程，你可以执行服务器升级而不会丢弃客户端的请求。

一个进程管理器将会处理套接字设置，启动多个服务器进程，监控进程活动，监听进程重启、关闭等信号。

Uvicorn 提供一个轻量级的方法来运行多个工作进程，比如 `--workers 4`，但并没有提供进行的监控。

### 使用 Gunicorn

Gunicorn 是成熟的，功能齐全的服务器，Uvicorn 内部包含有 Guicorn 的 workers 类，允许你运行 ASGI 应用程序，这些 workers 继承了所有 Uvicorn 高性能的特点，并且给你使用 Guicorn 来进行进程管理。

这样的话，你可能动态增加或减少进程数量，平滑地重启工作进程，或者升级服务器而无需停机。

在生产环境中，Guicorn 大概是最简单的方式来管理 Uvicorn 了，生产环境部署我们推荐使用 Guicorn 和 Uvicorn 的 worker 类：

"""
async def app(scope, receive, send):
    assert scope['type'] == 'http'
    await send({
        'type': 'http.response.start',
        'status': 200,
        'headers': [
            [b'content-type', b'text/plain'],
        ]
    })
    await send({
        'type': 'http.response.body',
        'body': b'Hello, world!',
    })

if __name__ == "__main__":
    
    uvicorn.run(app='unicorn:app', host="127.0.0.1", port=8000, reload=True, debug=True)