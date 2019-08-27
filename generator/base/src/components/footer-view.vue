<template>
  <section class="footer-view" :class="{'isCollapse': isCollapse}">
    <slot></slot>
    <!-- <div class="footer-view__bg"></div> -->
  </section>
</template>

<script>
/***
 * des:底部常驻信息展示
 */
export default {
  name: 'footer-view',
  computed: {
    isCollapse () {
      return this.$store.getters.getIsCollapse;
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
  @include b(footer-view){
    position: fixed;
    left: 200px;
    z-index: 100;
    right: 20px;
    bottom: 20px;
    background: #ffffff;
    padding: 12px 0;
    text-align: center;
    border-top: 1px solid #f0f2f5;
    &.isCollapse{
      left: 68px;
      @include e(bg){
        left: 68px;
      }
    }
    // @include e(bg){
    //   position: fixed;
    //   left: 200px;
    //   z-index: 100;
    //   right: 20px; // 会以滚动条位置参考定位，所以得加上滚动条宽度
    //   bottom: 0px;
    //   height: 20px;
    //   background: #f0f2f5;
    // }
  }
</style>
