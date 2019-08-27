# Components
  - [the-header 头部](#header-%E5%A4%B4%E9%83%A8)
  - [Menu 菜单](#menu-%E8%8F%9C%E5%8D%95)
  - [the-pagination 分页](#the-pagination-%E5%88%86%E9%A1%B5)
  - [custom-log 日志](#custom-log-%E6%97%A5%E5%BF%97)
  - [the-dialog 弹窗](#the-dialog-%E5%BC%B9%E7%AA%97)
  - [ends-layout 布局](#ends-layout%E4%B8%A4%E7%AB%AF%E5%B8%83%E5%B1%80)
  - [step-view 步骤条](#step-view%E6%AD%A5%E9%AA%A4%E6%9D%A1)
  - [custom-thead 自定义表头](#custom-thead-%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A1%A8%E5%A4%B4)
  - [select-input 选择输入框](#select-input-%E9%80%89%E6%8B%A9%E8%BE%93%E5%85%A5%E6%A1%86)
## the-header 头部
基于梅沙管理端设计规范定义的头部布局。  
使用前提为使用vuex并且将userInfo存入state中。字段名、选项、方法全部写死，如有不同请进入组件内修改。

### Example
```html
<the-header :title="title"></the-header>
```
```js
import theHeader from '@/components/the-header';

export default {
  data() {
    title: '梅沙工作平台'
  }
}
```

### Attributes
| 参数        | 说明           | 类型    | 可选值                               | 默认值  |
| ----------- | -------------- | ------- | ------------------------------------ | ------- |
| title  | 项目名称 | String  | - | - |

## Menu 菜单
在Element UI的menu组件的基础上进行二次封装，映射关系参照config中的menu.js。  
添加了默认icon。

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


## the-pagination 分页
在Element UI的pagination组件的基础上进行二次封装，有两种规格
### Example
```html
<the-pagination :pageObj="pageObj" v-on:changePage="changePage"></the-pagination>
```
```js
import thePagination from '@/components/the-pagination';
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
      if (type === 'gotoPage') { // 页数改变
        this.tableobj.currentPage = val;
      } else { // 每页展示数量改变
        this.tableobj.currentPage = 1; // 注意重置或修改当前页数
        this.tableobj.pageSize = val;
      }
      this.getList();
    }
  }
}
```
### Attributes

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
| currentPage | 当前页数  | Number  | - | - |


### Events

| 事件名 | 说明           | 参数 |
| ---- | -------------- |---|
| changePage   | 页码或者每页数量发生改变时的回调，参数为(val,type)； perPage 标志每页数量发生的改变；gotoPage 标志为去到第几页 | val,type |


## custom-log 日志
对操作日志进行封装
### Example
```html
<custom-log 
  :api="logApi"
  ref="log"
>
  <!-- 默认slot -->
  <template #default="{item}">
    <span>{{item.explain}}</span>
    <span>{{item.description}}</span>
  </template>
  <!-- Content slot -->
  <template #content="{item}">{{item.explain}}</template>
</custom-log>
```
```js
import customLog from '@/components/custom-log';

export default {
  data() {
    api:CONFIG.API.LOGAPI //log api 地址
  },
  mounted () {
    // 在获取完要传递的固定参数后主动启动，暂不支持动态参数
    this.$refs.log.startGetLog({
      merchantId: this.selectMerchant
    });
  }
}
```
### Attributes

| 参数  | 说明  | 类型 | 可选值  | 默认值  |
| ------- | ----- | ---- | ----- | ------- |
| api | api地址，必填 | String  | - | - |
| time | 时间字段名 | String  | - | createTime |
| name | 姓名字段名 | String  | - | operatorName |
| explain | 详情字段名 | String  | - | explain |

### Methods
| name   | 说明   | 参数 |
|------- | ----- | ---- |
| startGetLog  | 主动调用开始请求日志列表，可将自定义请求参数传入，传入后翻页请求日志列表会自动带上设置的参数，若参数修改则需要重新调用。  | param(Object) |

### Slot
| name   | 说明   |
|------- | ----- |
| default  | 详情的内容  |
| content  | 整行的内容  |

## the-dialog 弹窗
在Element UI的dialog组件的基础上进行二次封装，有small：460尺寸  normal: 900尺寸 large:1240尺寸三种尺寸

### Example
```html
<the-dialog :dialogObj="dialogObj">
  <div>
    这里是弹窗内容
  </div>
  <div 
    slot="infoView">
    这里是弹窗已选择内容展示区域，不注入不展示
  </div>
</the-dialog>
```

```js
import TheDialog from '@/components/the-dialog';

export default {
  data() {
    dialogObj: {
      title: '提示',
      content: '这是文本内容',
      dialogVisible: false,
      modal: true,
      type: 'small',
      isNeedCancel: true,
      confirmTxt: '确 定',
      cancelTxt: '取 消',
      confirmCall () {},
      cancelCall () {}
    }
  },
  components: {
    TheDialog
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
| type        | 弹窗类型       | String  | small:460尺寸  normal:900尺寸 large:1240尺寸 | - |
| isNeedCancel        | 是否显示取消按钮       | Boolean  | - | true |
| confirmTxt        | 确认按钮文案       | String  | - | - |
| cancelTxt        | 取消按钮文案       | String  | - | - |
| confirmCall        | 确认回调       | Function  | - | - |
| cancelCall        | 取消回调       | Function  | - | - |


### Slot
| name        | 说明           |
|------- | ------------------------------------ |
| defaults        | 弹窗body内容插槽       |
| infoView        | 选择内容提示插槽       |
| btnDefine        | 弹窗footer底部插槽，用来自定义按钮       |


## ends-layout两端布局
常用于左右两端布局的结构

### Example
```html
<ends-layout>
  <template slot="left">
    <el-button size="small">按钮一</el-button>
    <el-button size="small">按钮二</el-button>
  </template>
  
  <template slot="right">
    <el-button size="small">按钮三</el-button>
  </template>
</ends-layout>
```


```js
import endsLayout from '@/components/ends-layout';

export default {
  data() {
  },
  components: {
    endsLayout
  }
}
```

### Slot
| name        | 说明           |
|------- | ------------------------------------ |
| left        | 布局左侧的插槽       |
| right        | 布局右侧的插槽       |

## step-view步骤条
分布操作的步骤展示

### Example
```html
<step-view
  :active="active"
  :stepArr="stepArr">
</step-view>
```

```js
import stepView from '@/components/step-view';

export default {
  data() {
    stepArr: ['步骤一', '步骤二'],
    active: 0
  },
  components: {
    stepView
  }
}
```

### API
| 参数        | 说明           | 类型    | 可选值                               | 默认值  |
| ----------- | -------------- | ------- | ------------------------------------ | ----- -- |
| stepArr     | 步骤数组       | Array  | - | [] |
| active      | 当前步骤（从0开始）       | Number  | - | 0 |

## custom-thead 自定义表头
自定义表头组件，需要the-dialog组件。
### Example
```html
<custom-thead :value="label" @labelChange="labelChange" icon="ic_custom"></custom-thead>
```
```js
import customThead from '@/components/custom-thead';

export default {
  data() {
    label: [ // 每一列的标题，isDiabled决定是否可选。
      {
        label: '订单信息',
        isDisabled: true
      },
      {
        label: '课程信息'
      }
    ],
    showLabel: {}
  },
  methods: {
    labelChange (val) {
      this.showLabel = val; // 然后在每一列中添加 v-if = "showLabel[对应的label]",个人感觉可以有更好的方法，这样需要每一行都去手动设置一遍
    },
  }
}
```
### Attributes

| 参数  | 说明  | 类型 | 可选值  | 默认值  |
| ------- | ----- | ---- | ----- | ------- |
| value | 每一列的数据组成的数组，具体格式见下表 | Array  | - | - |
| id | 由于自定义表头的缓存是按照路由名称来存储，若页面中有多个自定义表格，需要添加id属性 | String  | - | - |
| isTip | 是否展示Tip | Boolean  | - | true |
| icon | 显示的icon，默认为element的图标，设置后则添加iconfont类以及设置的icon类 | String  | - | - |
| beforeClick | 开启之前的事件，只有返回true才会展示dialog框 | Function  | - | ()=>true |
| beforeClose | 关闭之前的事件，只有返回true才会关闭dialog框 | Function  | - | ()=>true |

### value's Object

| 参数  | 说明  | 类型 | 可选值  | 默认值  |
| ------- | ----- | ---- | ----- | ------- |
| label | 这一列的名称 | String  | - | - |
| isDisabled | 是否为不可选选项 | Boolean  | - | false |
| tip | {title:‘提示的标题’,content:'提示的内容'}| Object  | - | - |

### Events

| 事件名 | 说明           | 参数 |
| ---- | -------------- |---|
| labelChange | 当用户修改了自定义表头后触发，返回更改后的表头数据 | labelData |

### Slot
| name   | 说明   |
|------- | ----- |
| default  | 按钮内的内容  |
| content  | 展示的内容，替换了按钮  |


## select-input 选择输入框
自定义表头组件，需要the-dialog组件。
### Example
```html
<select-input :selectList="selectInputList" @search="searchDetailList"></select-input>
```
```js
import selectInput from '@/components/select-input';

export default {
  data() {
    selectInputList: [{
      value: 'orderId',
      label: '订单号'
    }, {
      value: 'courseName',
      label: '课程名称'
    }, {
      value: 'salesItem',
      label: '销售项'
    }]
  },
  methods: {
    searchDetailList (input, select) {
      if (input && select) { //只有在input值与select值都存在的时候进行搜索
        this.searchItem = {
          field: select,
          value: input
        };
      }
      this.getDetailList();
    },
  }
}
```
### Attributes

| 参数  | 说明  | 类型 | 可选值  | 默认值  |
| ------- | ----- | ---- | ----- | ------- |
| inputPlaceholder | input框中的placeHolder | String  | - | 请输入搜索内容 |
| selectPlaceholder | select框中的placeHolder | String  | - | 请选择 |
| value | 输入框的默认值，可加.sync进行同步 | -  | - | - |
| selectValue | 设置后为select选择框的默认值，可加.sync进行同步 | - | - | - |
| selectList | select中选择列表，必填 | Array  | - | - |
| id | 缓存时采用路由名称进行记录，若同一个路由名称下有多个此组件，需加上id号进行区分 | - | - | - |
| isChache | 是否进行缓存，默认值的优先顺序为：1.缓存值；2.selectValue值；3.selectList的第一条数据的值。 | Boolean  | - | true |

### Events

| 事件名 | 说明           | 参数 |
| ---- | -------------- |---|
| selectChange | 当select值出现了变化时触发，返回更新后的值 | selectValue |
| search | 当用户进行搜索时触发，返回输入框与选择框中的值 | input,select |
| clear | 当用户点击输入框清空按钮时触发 | - |

