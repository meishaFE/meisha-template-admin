# eslint 规则说明

## JavaScript Standard Style

大部分规则基于 [JavaScript Standard Style](https://standardjs.com/)
具体规则说明可以点击[此链接](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)

## 其他自定义规则说明

* 一行的最大长度：**180**

  eslint: `max-len`

* **一个函数的复杂性**不超过 10，所有分支、循环、回调加在一起，在一个函数里不超过 10 个

  eslint: `complexity`

* 一个函数最多 **5** 个参数

  eslint: `max-params`

* 一个函数的**嵌套**不能超过 **5** 层

  eslint: `max-depth`

* 一个函数最多有 **100** 行代码

  eslint: `max-statements`

* 允许使用 async-await

  eslint: `generator-star-spacing`

* 允许开发的时候使用 debugger

  eslint: `no-debugger`
