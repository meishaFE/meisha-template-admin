<template>
  <section
    :class="{'info-view__inner--padding': hasInnerPadding}" 
    class="info-view">
    <slot></slot>
  </section>
</template>

<script>
/***
 * des: 信息展示布局
 * */
export default {
  name: 'info-view',
  props: {
    hasInnerPadding: { // 是否有内边距
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @include b(info-view){
    background: #ffffff;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    @include e(inner){
      @include m(padding){
        padding: 20px 20px 0 20px;
      }
    }
  }
</style>
