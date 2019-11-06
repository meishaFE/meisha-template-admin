<template>
  <el-dialog class="the-dialog" :title="dialogObj.title"
    :close-on-click-modal="false"
    :modal="dialogObj.modal"
    :append-to-body="dialogObj.append"
    :before-close="handleClose"
    :visible.sync="dialogObj.dialogVisible"
    :class="['the-dialog__' + dialogObj.type.toLowerCase(), dialogObj.customClass]">
    <div class="the-dialog__content">
      <slot name="content"></slot>
    </div>
    <div slot="footer"
      v-if = "dialogObj.hasBottomButton"
      class="the-dialog__footer">
      <template v-if="!hasBtnDefineSlot">
        <div v-if="$slots.infoView" class="the-dialog__info">
          <slot name="infoView"></slot>
        </div>
        <div class="the-dialog__btn">
          <el-button
            type="primary"
            size="small"
            @click="sure"
            :loading="!btnFlag">
            {{dialogObj.confirmTxt || '确定'}}
          </el-button>
          <el-button
            size="small"
            v-if="dialogObj.isNeedCancel"  @click="handleClose">
            {{dialogObj.cancelTxt || '取消'}}
          </el-button>
        </div>
      </template>
      <template v-else>
        <slot name="btnDefine"></slot>
      </template>
    </div>
  </el-dialog>
</template>
<script>
/**
 * desc: 弹窗二次封装
 * param: dialogObj->弹窗数据对象
 * 格式：{
          title: '提示',
          content: '这是文本内容',
          dialogVisible: false,
          type: 'normal', // small：460尺寸  normal: 900尺寸 large:1240尺寸
          confirmTxt: '确 定',
          cancelTxt: '取 消',
          hasBottomButton: true, // 是否显示底部操作按钮
          append: false, // 是否嵌套弹窗
          customClass: '', // 添加自定义 class
          confirmCall () {}, // 确认回调
          cancelCall () {} // 取消回调
        }
    slot: content -> 弹层主题内容； infoView -> 底部按钮层上侧信息展示 ； btnDefine -> 地底按钮层内容自定义
 */
export default {
  name: 'the-dialog',
  data () {
    return {
      btnFlag: true
    };
  },
  props: {
    dialogObj: {
      type: Object,
      default () {
        return {
          hasBottomButton: true,
          customClass: '',
          title: '提示',
          append: false,
          dialogVisible: true,
          type: 'normal',
          isNeedCancel: true,
          confirmTxt: '确定',
          cancelTxt: '取消',
          modal: true,
          confirmCall () {},
          cancelCall () {}
        };
      }
    }
  },
  computed: {
    hasBtnDefineSlot () {
      return !!this.$slots.btnDefine;
    }
  },
  methods: {
    changeBtnStatus (flag) {
      this.btnFlag = flag;
    },
    sure () {
      if (this.btnFlag) {
        if (this.dialogObj.confirmCall) {
          this.dialogObj.confirmCall();
        }
      }
    },
    handleClose () {
      if (this.dialogObj.beforeClose) {
        this.dialogObj.beforeClose();
      } else {
        if (this.dialogObj.cancelCall) {
          this.dialogObj.cancelCall();
        }
        this.dialogObj.dialogVisible = false;
      }
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../assets/scss/index";
  //弹窗样式改造
  @include b(the-dialog){
    @include e(small){
      .el-dialog{
        width: 460px;
      }
    }
    @include e(normal){
      .el-dialog{
        width: 960px;
      }
    }
    @include e(large){
      width: 1240px;
    }
    .the-dialog__btn {
      font-size: 0px;
      // 防止 line-height 使用继承样式
      height: 32px;
      line-height: 32px;
    }
    .el-dialog__header{
      padding: 0 0 0 20px;
      height: 50px;
      background: #FFFFFF;
      // box-shadow: inset 0 -1px 0 0 #EAEEF5;
    }
    .el-dialog__title{
      line-height: 50px;
      font-size: 16px;
    }
    .el-dialog__headerbtn{
      height: 50px;
      width: 50px;
      top: 0;
      right: 0;
      text-align: center;
    }
    .el-dialog__body{
      // 整个弹窗高度为 600，减去弹窗底部和底部后的高度为487px
      max-height: 487px;
      padding: 0;
      overflow: auto;
    }
    .el-dialog__footer{
      padding: 0;
    }
    @include e(content){
      padding: 20px;
      max-height: 488px;
      overflow-y: auto;
    }
    @include e(info){
      margin-bottom: 10px;
      text-align: center;
    }
    @include e(footer){
      background: #FFFFFF;
      box-shadow: inset 0 1px 0 0 #EBEEF5;
      padding: 15px 0;
    }
    //A类弹窗
    .the-dialog__a /deep/ .el-dialog{
      width: 380px;
    }

    //B类弹窗
    .the-dialog__b /deep/ .el-dialog{
      width: 460px;
    }

    //C类弹窗
    .the-dialog__c /deep/ .el-dialog{
      width: 948px;
    }
  }
</style>
