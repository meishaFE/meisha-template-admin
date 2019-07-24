<template>
  <el-dialog :title="dialogObj.title"
    :close-on-click-modal="false"
    :modal="dialogObj.modal"
    :before-close="handleClose"
    :visible.sync="dialogObj.dialogVisible"
    :class="{'dialog-a':dialogObj.type == 'A','dialog-b':dialogObj.type == 'B','dialog-c':dialogObj.type == 'C','dialog-self':true}">
    <span v-if="dialogObj.type == 'A'"><i class="icon-style el-icon-information"></i>{{dialogObj.content}}</span>
    <slot v-if="dialogObj.type == 'B' || dialogObj.type == 'C'"
      name="template"></slot>
    <span slot="footer"
      class="dialog-footer">
      <template v-if="!hasBtnDefineSlot">
        <el-button v-if="dialogObj.isNeedCancel"  @click="handleClose">
          <template v-if="dialogObj.cancelTxt">
            {{dialogObj.cancelTxt}}
          </template>
          <template v-else>取 消</template>
        </el-button>
        <el-button type="primary" @click="sure" :loading="!btnFlag">
          <template v-if="dialogObj.confirmTxt">
            {{dialogObj.confirmTxt}}
          </template>
          <template v-else>确 定</template>
        </el-button>
      </template>
      <template v-else>
        <slot name="btnDefine"></slot>
      </template>
    </span>
  </el-dialog>
</template>
<script>
// 弹窗种类3种 根据 dialogObj.type来区分 A：380尺寸  B 460尺寸 C:948尺寸 btn层可自定义
export default {
  name: 'Dialog',
  data () {
    return {
      btnFlag: true
    };
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
  },
  props: {
    dialogObj: {
      type: Object,
      default () {
        return {
          title: '提示',
          content: '这是文本内容',
          dialogVisible: false,
          type: 'A',
          isNeedCancel: true,
          confirmTxt: '确 定',
          cancelTxt: '取 消',
          confirmCall () {},
          cancelCall () {}
        };
      }
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
<%_ if(!options.sassPattern){ _%>
@import "../assets/scss/index";
<%_ } _%>
  //弹窗样式改造
  .dialog-self .el-dialog{
    .el-dialog__header{
      padding: 20px;
      border-bottom: 1px solid $borderColorTable;
    }
    .el-dialog__body{
      max-height: 469px;
      overflow-y: auto;
    }
    .el-dialog__footer{
      border-top: 1px solid $borderColorTable;
      padding: 16px 20px;
    }
    .icon-style{
      color: $warnColorNormal;
      margin-right: 10px;
    }
  }

  //A类弹窗
  .dialog-a .el-dialog{
    width: 380px;
  }

  //B类弹窗
  .dialog-b .el-dialog{
    width: 460px;
  }

  //C类弹窗
  .dialog-c .el-dialog{
    width: 948px;
  }
</style>
