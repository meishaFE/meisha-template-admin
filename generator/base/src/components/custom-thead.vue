<template>
  <div class="fe-custom-header">
    <template v-if="!$slots.content">
      <template v-if="isTip">
        <el-tooltip effect="light" content="自定义列" placement="top">
          <el-button size="small" :class="{'fe-custom-header__customBtn':!$slots.default}" @click="showCustomHeader">
            <slot>
              <i :class="iconClass"></i>
            </slot>
          </el-button>
        </el-tooltip>
      </template>
      <template v-else>
        <el-button size="small" :class="{'fe-custom-header__customBtn':!$slots.default}" @click="showCustomHeader">
          <slot>
            <i :class="iconClass"></i>
          </slot>
        </el-button>
      </template>
    </template>
    <template v-else>
      <slot name="content"></slot>
    </template>
    <v-dialog :dialogObj="dialogObj">
      <template #content>
        <div class="el-tablehead">
          <div class="el-tablehead__checkboxall" v-if = "bEnableSelectAll">
            <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          </div>
          <el-checkbox-group class="el-tablehead__checkboxgroup" v-model="selectedTHead">
            <el-checkbox class="el-tablehead__checkboxitem" v-for="tHead in allThead" :label="tHead.label" :key="tHead.label" :disabled="tHead.isDisabled">
                <template v-if = "!tHead.tip.content"><span :title="tHead.label">{{tHead.label}}</span></template>
                <template v-else>
                  <el-tooltip class="item" effect="light" placement="top-start">
                    <template #content>
                      <span class="tip-title" v-if = "tHead.tip.title">{{tHead.tip.title}}</span>
                      <span class="tip-content">{{tHead.tip.content}}</span>
                    </template>
                    <span>{{tHead.label}}</span>
                  </el-tooltip>
                </template>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </template>

    </v-dialog>
  </div>

</template>

<script>
import vDialog from '@/components/the-dialog';

export default {
  name: 'fe-custom-theader',
  /**
   * 本组件防坑指南(vue-loader和elementUI渲染冲突)
   * 每个 el-table-column 加个唯一识别 key 才不会报错
   * （ 为什么？ 我也想问  -。-！）
   */
  props: {
    /**
     * 选项数组，格式：
     * [{
          label: '订单信息',
          isDisabled: true,
          tip:{
            title:'title',
            content:'content'
          }
        }]
     */
    bEnableSelectAll: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default () {
        return [];
      }
    },
    // 修改前：已经勾选的选项会保存在localstorage中，以前是用当前路由为key
    // 但是有时候同一个路由下可能多次使用，这样保存的选项会出现冲突
    // 修改后：默认会采用 field 设置 localStorage，为了兼容以前使用该组件的模块，
    // 如果没有设置field会采用 路由(path)设置localStorage
    id: {
      type: String,
      default: ''
    },
    isTip: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: null
    },
    beforeClick: {
      type: Function,
      default () {
        return true;
      }
    },
    beforeClose: {
      type: Function,
      default () {
        return true;
      }
    }
  },
  computed: {
    iconClass () {
      if (this.icon) {
        return `iconfont ${this.icon}`;
      } else {
        return 'el-icon-setting';
      }
    }
  },
  watch: {
    selectedTHead: {
      handler (newV, oldV) {
        let bool = false;
        if (Array.isArray(this.selectedTHead)) {
          bool = this.selectedTHead.length === this.allThead.length;
        }
        this.checkAll = bool;
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      checkAll: false,
      selectedTHead: [], // 子级选中的thead
      checkedTHead: [], // 父级选中的thead
      disabledTHead: [], // 父级不能点击的thead
      ableTHead: [], // 父级可点击的thead 关联数组
      allThead: [],
      fieldQuery: null, // 用于保存在localStorage的属性名
      dialogObj: {
        hasBottomButton: true,
        title: '自定义列',
        dialogVisible: false,
        type: 'small',
        isNeedCancel: true,
        confirmTxt: '确 定',
        cancelTxt: '取 消',
        confirmCall: this.confirmCall,
        cancelCall: this.cancelCall
      },
      prefixName: 'fe-custom-theader'
    };
  },
  created () {
    this.fieldQuery = this.getStorageQuery();
    // 初始化 checkedTHead / disabledTHead / ableTHead
    this.checkedTHead = this.value.map((val) => {
      return val.label;
    });
    for (let item of this.value) {
      // let item = thMaps[key];
      let thead = item;
      thead.tip = this.getTipObj(item['tip']);
      if (item['isDisabled']) {
        this.disabledTHead.push(thead);
      } else {
        this.ableTHead.push(thead);
      }
    }
    this.allThead = this.disabledTHead.concat(this.ableTHead);
    // 初始化 selectedTHead
    let personalCustomThead = localStorage.getItem(this.fieldQuery);
    // let personalCustomThead = localStorage.getItem(this.$route.path);
    if (personalCustomThead === null) { // 没有自定义过
      this.selectedTHead = this.checkedTHead;
    } else if (personalCustomThead === '') { //   边界情况：用户全部自定义表头都不显示
      this.selectedTHead = [];
    } else {
      this.selectedTHead = personalCustomThead.split(',');
    }
    this.emitChange();
  },
  methods: {
    getStorageQuery () {
      let field = '';
      if (!this.id) {
        if (CONFIG.ENV.DEV) console.warn('建议在自定义表头组件添加id属性');
        field = `${this.prefixName}_${this.$route.name}`;
      } else {
        field = `${this.prefixName}_${this.id}_${this.$route.name}`;
      }
      return field;
    },
    handleCheckAllChange (val) {
      if (val) {
        this.selectedTHead = this.allThead.map(d => d.label);
      } else {
        this.selectedTHead = this.disabledTHead.map(d => d.label);
      }
    },
    // 修改 父子共用对象 thmap 同步数据 / 本地缓存，下次加载生效
    ayncThmap () {
      localStorage.setItem(this.fieldQuery, this.selectedTHead);
    },
    getTipObj (tip) {
      let res = null;
      if ($type.isType(tip, 'Object')) {
        res = {
          title: tip.title ? tip.title.toString() : '',
          content: tip.content ? tip.content.toString() : ''
        };
      } else {
        res = {
          title: '',
          content: tip ? tip.toString() : ''
        };
      }
      return res;
    },
    emitChange () {
      let emitData = {};
      for (let i of this.selectedTHead) {
        emitData[i] = true;
      }
      this.$emit('labelChange', emitData);
    },
    showCustomHeader () {
      if (this.beforeClick()) {
        this.temp = this.selectedTHead;
        this.dialogObj.dialogVisible = true;
      }
    },
    cancelCall () {
      if (this.beforeClose()) {
        this.selectedTHead = this.temp;
        this.dialogObj.dialogVisible = false;
      }
    },
    confirmCall () {
      if (this.beforeClose()) {
        this.ayncThmap();
        this.emitChange();
        this.dialogObj.dialogVisible = false;
      }
    }
  },
  components: {
    vDialog
  }
};
</script>

<style lang="scss" scoped>
  // @import "../assets/scss/index";

  /* 覆盖自带样式 */
  @include b(el-tablehead){
    @include e(checkboxgroup) {
      display: flex;
      flex-wrap: wrap;
    }
    @include e(checkboxall) {
      text-align: left;
      margin-bottom: 15px;
    }
    @include e(checkboxitem) {
      flex: 0 0 33.33%;
      max-width:33.33%;
      margin:0;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      /deep/.el-checkbox__label{
        max-width: 116px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
  @include b(fe-custom-header){
    display: inline-block;
    @include e(customBtn){
      .iconfont{
        font-size:14px;
      }
      width: 32px;
      padding: 8px 0px;
    }
  }
  .tip-title{
    display: block;
    margin-bottom: 6px;
  }
  /deep/.the-dialog__content{
    padding-bottom: 5px;
    min-height: unset;
  }
  /deep/.the-dialog .el-dialog__header{
    text-align: left;
  }
  .el-icon-setting{
    font-size: 14px;
  }
</style>
