<template>
  <section class="step-view">
    <el-steps
    class="step-view__component"
    :align-center="true"
    :active="active" 
    finish-status="success">
      <el-step 
        v-for="(item, k) in stepArr" 
        :key="k"
        :title="item"></el-step>
    </el-steps>
  </section>
</template>

<script>
/***
 * des:步骤条样式改造
 */
export default {
  name: 'step-view',
  props: {
    stepArr: {
      type: Array,
      default () {
        return [];
      }
    },
    active: {
      type: Number,
      default () {
        return 0;
      }
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
  $main-color: #3D7AF8;
  $white-color: #ffffff;
  @include b(step-view){
    @include e(component){
      // 样式覆盖重写
      .el-step__icon{
        width: 30px;
        height: 30px;
      }
      .el-step__head.is-success, 
      .el-step__title.is-success,
      .el-step__title.is-process,
      .el-icon-check:before{
        color: $main-color;
      }
      .el-step__title.is-process{
        font-weight: normal;
      }
      .el-step__head.is-success{
        border-color: $main-color;
      }
      .is-process .el-step__icon.is-text{
        border-color: $main-color;
        background: $main-color;
      }
      .is-process .el-step__icon-inner{
        color: $white-color;
      }
      .is-success .el-step__icon.is-text{
        background: $white-color;
      }
      .is-success .el-step__line{
        background: $main-color;
      }
      .el-step.is-horizontal .el-step__line{
        top: 14px;
      }
    }
  }
</style>
