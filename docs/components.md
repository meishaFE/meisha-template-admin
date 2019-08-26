# Components
  - [Header 头部](#header-%E5%A4%B4%E9%83%A8)
  - [Menu 菜单](#menu-%E8%8F%9C%E5%8D%95)
  - [Pagination 分页](#pagination-%E5%88%86%E9%A1%B5)
  - [Log 日志](#log-%E6%97%A5%E5%BF%97)
  - [the-dialog 弹窗](#the-dialog-%E5%BC%B9%E7%AA%97)
  - [ends-layout 布局](#ends-layout%E4%B8%A4%E7%AB%AF%E5%B8%83%E5%B1%80)
  - [step-view 步骤条](#step-view%E6%AD%A5%E9%AA%A4%E6%9D%A1)

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
| ----------- | -------------- | ------- | ------------------------------------ | ------- |
| stepArr     | 步骤数组       | Array  | - | [] |
| active      | 当前步骤（从0开始）       | Number  | - | 0 |


## footer-view底部常驻组件
底部常驻条，用于放置常用按钮和信息以及操作；由于菜单栏可收缩，所以需要计算属性isCollapse，来检测当前菜单栏状态

### Example
```html
<footer-view>
  <div>some info</div>
</footer-view>
```

```js
import footerView from '@/components/footer-view';

export default {
  components: {
    footerView
  }
}
```
### Slot
| name        | 说明           |
|------- | ------------------------------------ |
| default        | 展示的内容和操作信息       |


## content-header标题信息布局组件
标题信息展示布局，多用于内容块的头部信息展示

### Example
```html
<content-header title="课程信息">
  <button>右边按钮</button>
</content-header>
```

```js
import contentHeader from '@/components/content-header';

export default {
  components: {
    contentHeader
  }
}
```

### API
| 参数        | 说明           | 类型    | 可选值                               | 默认值  |
| ----------- | -------------- | ------- | ------------------------------------ | ------- |
| title     | 标题       | String  | - | '' |

### Slot
| name        | 说明           |
|------- | ------------------------------------ |
| default        | 内容头部除标题外的其他信息      |


## filter-form筛选栏信息布局组件
筛选栏信息展示布局，多用于列表页的筛选框布局,默认三栏布局

### Example
```html
<filter-form :form="filterForm">
  <el-form-item label="日期一:">
    <el-date-picker
      v-model="filterForm.payTime"
      type="daterange"
      range-separator="至"
      size="small"
      @change="search"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="日期二:">
    <el-date-picker
      v-model="filterForm.orderTime"
      type="daterange"
      range-separator="至"
      size="small"
      @change="search"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="日期三:">
    <el-date-picker
      v-model="filterForm.classTime"
      type="daterange"
      range-separator="至"
      size="small"
      @change="search"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>
</filter-form>
```

```js
import filterForm from '@/components/filter-form';

export default {
  data () {
    return {
      filterForm: {
        orderTime: '',
        payTime: '',
        classTime: ''
      }
    };
  },
  components: {
    filterForm
  }
}
```

### API
| 参数        | 说明           | 类型    | 可选值                               | 默认值  |
| ----------- | -------------- | ------- | ------------------------------------ | ------- |
| form     | 筛选项所需model的对象集合       | Object  | - | {} |
| isAverage     | 是否均分两栏布局       | Boolean  | true, false | false |

### Slot
| name        | 说明           |
|------- | ------------------------------------ |
| default        | 所有的筛选信息行.特殊说明，如果当前行需要整行展示，可给当前行加入一个类名`form-item--total` |

## info-view,info-item内容信息展示布局组件
内容信息展示布局，info-view用于外层父组件包裹元素，info-item用于单个分条展示的信息

### Example
```html
<info-view :form="filterForm">
  <info-item title="信息1:">
    内容1
  </info-item>
  <info-item title="信息2:">
    内容2
  </info-item>
  <info-item title="信息3:">
    内容3
  </info-item>
</info-view>
```

```js
import infoView from '@/components/info-view';
import infoItem from '@/components/info-item';
export default {
  data () {
    return {
    };
  },
  components: {
    infoView,
    infoItem
  }
}
```
### infoView
### API
| 参数        | 说明           | 类型    | 可选值                               | 默认值  |
| ----------- | -------------- | ------- | ------------------------------------ | ------- |
| hasInnerPadding     | 是否有内边距(弹层内一般没得)       | Boolean  | true,false | true |

### Slot
| name        | 说明           |
|------- | ------------------------------------ |
| default        | 放置展示子项信息列 |

### infoItem
### API
| 参数        | 说明           | 类型    | 可选值                               | 默认值  |
| ----------- | -------------- | ------- | ------------------------------------ | ------- |
| title     | label标题    | String  | - | '' |

### Slot
| name        | 说明           |
|------- | ------------------------------------ |
| default        | 展示的内容 |
