<template>
  <div class="info-item">
    <div class="info-item__title">
      {{title}}<template v-if="title.indexOf(':') === -1">:</template>
    </div>
    <div 
      v-if="$slots.default"
      class="info-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/***
 * des: 信息展示布局
 * 传入title:String
 * */
export default {
  name: 'info-item',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @include b(info-item){
    width: 50%;
    display: flex;
    margin-bottom: 20px;
    &.whole-line{
      width: 100%;
    }
    @include e(title) {
      width: 100px;
      @include font-style(14px, #909399, 20px);
    }
    @include e(content) {
      flex: 1;
      padding-right: 20px;
      @include font-style(14px, #303133, 22px);
      span{
        @include font-style(14px, #909399, 22px);
      }
    }
    // &:nth-child(n + 3){
    //   margin-top: 20px;
    // }
  }
</style>
