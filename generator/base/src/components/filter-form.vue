<template>
  <section 
    class="filter-view">
      <el-form ref="form" 
        class="filter-view__form"
        :class="{'filter-view__average-form': isAverage}" 
        label-position="left"
        :model="form" 
        label-width="100px">
        <slot></slot>
      </el-form>
    </section>
</template>

<script>
/***
 * des: 筛选器布局
 * 传入form:Object
 * isAverage：Boolean
 * */
export default {
  name: 'filter-form',
  props: {
    form: {
      type: Object,
      default () {
        return {};
      }
    },
    isAverage: { // 是否均分成两等份，默认false
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../assets/scss/mixin';
  // 筛选器样式覆盖
  @include b(filter-view){
    padding: 20px 0px 10px 20px;
    @include e(form){
      display: flex;
      flex-wrap: wrap;
      .el-form-item{
        margin-bottom: 10px;
        width: 33.3333%;
        &.form-item--total{
          width: 100%;
        }
      }
    }
    @include e(average-form){
      .el-form-item{
        width: 50%;
      }
    }
    .el-form-item__label{
      color: #909399;
    }
    .el-form-item__content, .el-form-item__label{
      line-height: 32px;
    }
    .el-form-item__content{
      padding-right: 20px;
    }
    .el-select{
      width: 100%;
    }
  }
</style>
