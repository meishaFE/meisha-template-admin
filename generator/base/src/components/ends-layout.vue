<template>
  <section 
    :class="{'ends-layout__inner--padding': hasInnerPadding}" 
    class="ends-layout">
      <div
        v-if="$slots.left" 
        class="ends-layout__left">
        <slot name="left"></slot>
      </div>
      <div 
        v-if="$slots.right" 
        class="ends-layout__right">
        <slot name="right"></slot>
      </div>
    </section>
</template>

<script>
/***
 * des: 两端布局
 * */
export default {
  name: 'ends-layout',
  props: {
    hasInnerPadding: { // 是否有内边距
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @include b(ends-layout){
    padding: 0;
    display: flex;
    align-items: center;
    @include e(inner){
      @include m(padding){
        padding: 20px;
      }
    }
    @include e(left){
      margin-right: 20px;
    }
    @include e(right){
      flex: 1;
      text-align: right;
    }
  }
</style>
