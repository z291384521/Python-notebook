



注： 普通函数没有明确调用者时 `this` 值为 `window`，严格模式下没有调用者时 `this` 的值为 `undefined`。

~~~
    <script>
        // 普通函数没有明确调用者时 `this` 值为 `window`，严格模式下没有调用者时 `this` 的值为 `undefined`。
        function a() {
            function b() {
                console.log(this);
                function c() {
                    "use strict"
                    console.log(this)
                }
                c()
            }
            b()
        }
        a()
    </script>
~~~

