<!-- <vue 根据提示回车即可出现如下结构 -->
<template>
  <div>
    <!-- 2. 把值赋予到标签 -->
    <h1>{{ msg }}</h1>
    <h2>{{ obj.name }}</h2>
    <h3>{{ obj.age >= 18 ? "成年了" : "未成年" }}</h3>
    <a :href="url">点击去百度</a>
    <!-- 语法: :原生属性名="vue变量" -->
    <img :src="imgUrl" />

    <p>你要购买商品的数量: {{ count }}</p>
    <!-- 1. 绑定事件
     语法: v-on:事件名="少量代码"
     语法: v-on:事件名="methods里函数名"
     语法: v-on:事件名="methods里函数名(值)"
     语法: @事件名="methods里函数名"
     -->
    <button v-on:click="count = count + 1">+1</button>
    <button v-on:click="addFn">addFn</button>
    <button v-on:click="addCountFn(3)">+3</button>
    <button @click="subFn">减少</button>
    <p></p>
    <!-- 事件对象 -->
    <a @click="one" href="http://www.baidu.com">点击传递值给浏览器</a>
    <a @click="two(10, $event)" href="http://www.taobao.com"
      >点击传递值给浏览器10</a
    >
  </div>
</template>

<script>
export default {
  // 1. 变量在data函数return的对象上
  data() {
    return {
      count: 0,
      url: "http://www.baidu.com",
      imgUrl:
        "http://yun.itheima.com/Upload/./Images/20210412/60741c11ab77b.jpg",
      msg: "Hello, Vue",
      obj: {
        name: "小vue",
        age: 5,
      },
    };
  },
  methods: {
    addFn() {
      // this代表export default后{}对象, data和methods里的属性都直接挂在它身上
      this.count++;
    },
    addCountFn(num) {
      this.count = this.count + num;
    },
    subFn() {
      this.count--;
    },
    // 1. 事件触发, 无传值, 可以直接获取事件对象是
    one(e) {
      // 该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）。
      // 例如，如果 type 属性是 "submit"，在事件传播的任意阶段可以调用任意的事件句柄，
      // 通过调用该方法，可以阻止提交表单。注意，如果 Event 对象的 cancelable 属性是 fasle，
      // 那么就没有默认动作，或者不能阻止默认动作。
      // 无论哪种情况，调用该方法都没有作用。
      e.preventDefault();
      console.log("跳转被取消了");
    },
    // 2. 事件触发, 传值, 需要手动传入$event
    two(num, e) {
      console.log(num);
      e.preventDefault();
      console.log("跳转被取消了");
    },
  },
};
</script>

<style>
</style>