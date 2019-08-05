<template>
  <section class="the-dialog">
    <el-dialog :title="dialogObj.title"
      :close-on-click-modal="false"
      :modal="dialogObj.modal"
      :before-close="handleClose"
      :visible.sync="dialogObj.dialogVisible"
      :class="'the-dialog__' + dialogObj.type">
      <div class="the-dialog__content">
        <slot name="content"></slot>
      </div>
      <div slot="footer"
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
              {{dialogObj.confirmTxt || '确 定'}}
            </el-button>
            <el-button 
              size="small"
              v-if="dialogObj.isNeedCancel"  @click="handleClose">
              {{dialogObj.cancelTxt || '取 消'}}
            </el-button>
          </div>
        </template>
        <template v-else>
          <slot name="btnDefine"></slot>
        </template>
      </div>
    </el-dialog>
  </section>
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
          title: '提示',
          dialogVisible: true,
          type: 'normal',
          isNeedCancel: true,
          confirmTxt: '确 定',
          cancelTxt: '取 消',
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
        this.dialogObj.confirmCall();
      }
    },
    handleClose () {
      if (this.dialogObj.cancelCall) {
        this.dialogObj.cancelCall();
      }
      this.dialogObj.dialogVisible = false;
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
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
    .el-dialog__header{
      padding: 0 0 0 20px;
      height: 50px;
      background: #FFFFFF;
      box-shadow: inset 0 -1px 0 0 #EAEEF5;
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
      padding: 0;
    }
    .el-dialog__footer{
      padding: 0;
      text-align: center;
    }
    @include e(content){
      padding: 20px;
      max-height: 488px;
      min-height: 100px;
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
  }
</style>
