module.exports = [
  {
    name:"name",
    type: "string",
    default: '后端模版',
    message: "请输入项目中文名称"
  },
  {
    name:"buildName",
    type: "string",
    default: 'dist',
    message: "请输入项目打包文件名"
    // message: "请输入项目打包地址"
  },
  // {
  //   name:"description",
  //   type: "string",
  //   required: false,
  //   message: "Project description",
  //   default: "A Vue.js project"
  // },
  // {
  //   name:"author",
  //   type: "string",
  //   message: "Author"
  // },
  // {
  //   name:"build",
  //   type: "list",
  //   message: "Vue build",
  //   "choices": [
  //     {
  //       "name": "Runtime + Compiler: recommended for most users",
  //       "value": "standalone",
  //       "short": "standalone"
  //     },
  //     {
  //       "name": "Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere",
  //       "value": "runtime",
  //       "short": "runtime"
  //     }
  //   ]
  // },
  {
    name:"router",
    type: "confirm",
    message: "是否使用vue-router?",
    default: true
  },
  {
    name:"vuex",
    type: "confirm",
    message: "是否使用vue-vuex?",
    default: true

  },
  {
    name:"element",
    type: "confirm",
    message: "是否使用elementUI?",
    default: true
  },
  {
    name:"polyfill",
    type: "confirm",
    message: "是否使用polyfill?",
    default: false
  },
  {
    name:"precommit",
    type: "confirm",
    message: "Use pre-commit for auto fix + format?",
    default: false
  },
  {
    name:"meishaWatch",
    type: "confirm",
    message: "是否使用meishaWatch?",
    default: true
  },
  {
    name:"sassPattern",
    type: "confirm",
    message: "是否自动导入公共scss变量、mixin等?",
    default: true
  }
  // {
  //   name:"unit",
  //   type: "confirm",
  //   message: "Setup unit tests with Karma + Mocha?",
  //   default: false
  // },
  // {
  //   name:"e2e",
  //   type: "confirm",
  //   message: "Setup e2e tests with Nightwatch?",
  //   default: false
  // }
]