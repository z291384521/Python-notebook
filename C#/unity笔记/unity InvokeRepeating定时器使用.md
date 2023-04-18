在Unity中，InvokeRepeating()是一个方法，用于在指定时间间隔内重复执行一个指定的函数。

方法原型如下：

```
public void InvokeRepeating(string methodName, float time, float repeatRate);
```

- `methodName`：重复执行的函数的名称。
- `time`：从调用InvokeRepeating()方法开始，需要等待多长时间才开始执行第一次重复调用方法。
- `repeatRate`：以秒为单位，每隔多少秒重复调用一次该方法。

例如，以下代码将每1秒钟执行一次“SomeFunction”函数，从第5秒钟开始执行：

```
void Start () {
    InvokeRepeating("SomeFunction", 5f, 1f);
}

void SomeFunction() {
    Debug.Log("Repeatedly called function");
}
```

InvokeRepeating()方法在开始执行后，将按指定的时间间隔不断重复调用指定的函数，直到对象被禁用或该方法被取消为止。

如果需要停止InvokeRepeating()的重复调用，请使用CancelInvoke()方法：

```
CancelInvoke();
```