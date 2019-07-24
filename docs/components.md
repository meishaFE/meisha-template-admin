# Components
  - [Header 头部](#header-%E5%A4%B4%E9%83%A8)
  - [Menu 菜单](#menu-%E8%8F%9C%E5%8D%95)
  - [Pagination 分页](#pagination-%E5%88%86%E9%A1%B5)
  - [Log 日志](#log-%E6%97%A5%E5%BF%97)
  - [Dialog 弹窗](#dialog-%E5%BC%B9%E7%AA%97)

## Header 头部
基于梅沙管理端设计规范定义的头部布局

### Example
```html
  <v-header :userInfo="userInfo" @logout="logout"></v-header>
```
```js
import vHeader from '@/components/Header';

export default {
  data() {
    userInfo: {}
  },
  methods: {
    logout: () => {}
  }
}
```

### API
| 参数        | 说明           | 类型    | 可选值                               | 默认值  |
| ----------- | -------------- | ------- | ------------------------------------ | ------- |
| title  | 项目名称 | String  | - | - |
| rightLinks  | 右侧链接 | Array  | - | - |
| userInfo  | 用户信息 | Object  | - | - |
| userInfo.realname  | 用户名称 | String  | - | - |

### Events
| 事件名 | 说明           | 参数 |
| ---- | -------------- |---|
| logout | 退出 | - |

## Menu 菜单
在Element UI的menu组件的基础上进行二次封装，映射关系参照config中的menu.js

[el-menu组件文档链接](https://element.eleme.io/#/zh-CN/component/menu)

### Example
```html
  <v-menu :router="router" @collapse="toggleMenuCollapse"></v-menu>
```
```js
import vMenu from '@/components/Menu';

export default {
  data() {
    pageObj: {
      router: true,
      isMenuColllapse: false
    }
  },
  methods: {
    toggleMenuCollapse (status) {
      this.isMenuColllapse = status;
    }
  }
}
```
MENU_CONFIG示例
```js
[
  {
    title: '导航',
    index: '1',
    icon: 'message',
    children: [
      {
        title: '分组一',
        children: [
          {
            title: '选项1',
            index: '1-1'
          }
        ]
      }
    ]
  }
]
```
### API
| 参数        | 说明           | 类型    | 可选值                               | 默认值  |
| ----------- | -------------- | ------- | ------------------------------------ | ------- |
| router        | 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转       | boolean  | - | true |

### Menu组件内部data参数
| 参数        | 说明           | 类型    | 可选值                               | 默认值  |
| ----------- | -------------- | ------- | ------------------------------------ | ------- |
| defaultActive | 默认active状态的菜单index值  | String  | - | - |
| defaultOpeneds | 默认展开的一级菜单index值 | Array  | - | - |
| isCollapse | 菜单栏是否收缩 | Boolean  | - | - |
| MENU_CONFIG | 菜单的路由映射关系 | Array  | - | - |
| PROJECT_NAME | 菜单总名称 | String  | - | - |

#### MENU_CONFIG Attribute
| 参数 | 说明           | 类型 | 可选值 | 默认值 |
| ---- | -------------- |---|---|---|
| title | 菜单标题 | String | - | - |
| index | 唯一标志 | String | - | - |
| icon | 图标名称，会自动生成icon-XXX后缀类名，请使用iconfont图标 | String | - | - |
| children | 子菜单对象 | Object | - | - |

#### MENU_CONFIG children Attribute
| 参数 | 说明           | 类型 | 可选值 | 默认值 |
| ---- | -------------- |---|---|---|
| title | 子菜单分组名称 | String | - | - |
| children | 分组后的子菜单 | Object | - | - |
| children.title | 子菜单名称 | String | - | - |
| children.index | 子菜单路径地址 | String | - | - |

### Events
| 事件名 | 说明           | 参数 |
| ---- | -------------- |---|
| toggleMenu | 菜单栏收缩展开回调 | status: true为收缩起菜单，false为展开菜单 |
| select   | 菜单激活回调 | index: 选中菜单项的 index, indexPath: 选中菜单项的 index path |
| open   | sub-menu 展开的回调 | index: 打开的 sub-menu 的 index， indexPath: 打开的 sub-menu 的 index path |
| close   | sub-menu 收起的回调 | index: 收起的 sub-menu 的 index， indexPath: 收起的 sub-menu 的 index path |


## Pagination 分页
在Element UI的pagination组件的基础上进行二次封装，有两种规格
### Example
```html
<vPage :pageObj="pageObj" v-on:changePage="changePage"></vPage>
```
```js
import vPage from '@/components/Pagination';
export default {
  data() {
    pageObj: {
      currentPage: 1,
      perPage: 10,
      pageTotal: 10,
      layOutString: 'total, sizes, prev, pager, next, jumper'
    }
  },
  methods: {
    changePage(val,type) {
      if (type === 'gotoPage') { // 页码数改变
        this.pageObj.currentPage = val;
      } else { // 每页数量改变
        this.pageObj.perPage = val;
      }
    }
  }
}
```
### API

| 参数        | 说明           | 类型    | 可选值                               | 默认值  |
| ----------- | -------------- | ------- | ------------------------------------ | ------- |
| pageObj        | 参数对象       | Object  | - | - |
#### PageObj

| 参数        | 说明           | 类型    | 可选值                               | 默认值  |
| ----------- | -------------- | ------- | ------------------------------------ | ------- |
| pageTotal        | 总条目数       | Number  | - | - |
| layOutString        | 组件布局       | String  | sizes, prev, pager, next, jumper, ->, total, slot | 'prev, pager, next, jumper, ->, total' |
| isSmall        | 是否使用小型分页       | Boolean  | - | false |
| pageTotal        | 总条目数       | Number  | - | - |

### Events

| 事件名 | 说明           | 参数 |
| ---- | -------------- |---|
| changePage   | 页码或者每页数量发生改变时的回调，参数为(perPage,gotoPage)；perPage 标志每页数量发生的改变；gotoPage 标志为去到第几页 | perPage,gotoPage |


## Log 日志
对操作日志进行封装，调用统一的日志接口
### Example
```html
<vLog :logObj="logObj"></vLog>
```
```js
import vLog from '@/components/Log';

export default {
  data() {
    logObj: {}
  }
}
```
### API

| 参数        | 说明           | 类型    | 可选值                               | 默认值  |
| ----------- | -------------- | ------- | ------------------------------------ | ------- |
| logObj        | 参数对象，主要是请求的参数，根据各自项目而定       | Object  | - | - |


## Dialog 弹窗
在Element UI的pagination组件的基础上进行二次封装，有大、中、小三种规格
### Example
```html
<vDialog :dialogObj="dialogObj">
  <div slot="template">
    这里是弹窗内容
  </div>
</vDialog>
```
```js
import vDialog from '@/components/Dialog';

export default {
  data() {
    dialogObj: {
      title: '提示',
      content: '这是文本内容',
      dialogVisible: false,
      type: 'A',
      modal: true,
      isNeedCancel: true,
      confirmTxt: '确 定',
      cancelTxt: '取 消',
      confirmCall () {},
      cancelCall () {}
    }
  }
}
```
### API
| 参数        | 说明           | 类型    | 可选值                               | 默认值  |
| ----------- | -------------- | ------- | ------------------------------------ | ------- |
| dialogObj        | 参数对象       | Object  | - | - |

#### DialogObj

| 参数        | 说明           | 类型    | 可选值                               | 默认值  |
| ----------- | -------------- | ------- | ------------------------------------ | ------- |
| title        | 弹窗标题       | String  | - | - |
| content        | 弹窗文本内容       | String  | - | - |
| modal        | 是否显示遮罩层       | Boolean  | - | true |
| dialogVisible        | 弹窗显示隐藏标志位       | Boolean  | - | false |
| type        | 弹窗类型       | String  | A:380尺寸  B:460尺寸 C:948尺寸 | - |
| isNeedCancel        | 是否显示取消按钮       | Boolean  | - | true |
| confirmTxt        | 确认按钮文案       | String  | - | - |
| cancelTxt        | 取消按钮文案       | String  | - | - |
| confirmCall        | 确认回调       | Function  | - | - |
| cancelCall        | 取消回调       | Function  | - | - |


### Slot
| name        | 说明           |
|------- | ------------------------------------ |
| template        | 弹窗body内容插槽       |
| btnDefine        | 弹窗footer底部插槽，用来自定义按钮       |

