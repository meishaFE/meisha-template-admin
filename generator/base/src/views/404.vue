<template>
  <section class="not-found">
    <div class="part-word">
      <div class="not-found-icon"></div>
      <div class="para-1">
        Ohno,你要的页面不见了。
      </div>
      <div class="para-2">
        这时候你可以：
      </div>
      <div class="para-3">
        <router-link class="para-3__homebtn" :to="{name: 'Welcome'}">返回到首页</router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'notFound'
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.not-found {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: $bgColorTotal;

  .part-word {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .not-found-icon {
    width: 300px;
    height: 125px;
    background: url('../assets/img/notFound.png') no-repeat left top;
  }

  .para-1 {
    margin-top: 60px;
    @include font-style(18px,$fontColorSubTitle, 18px);
  }

  .para-2 {
    margin-top: 10px;
    @include font-style(18px,$fontColorSubTitle, 18px);
  }

  .para-3 {
    margin: 15px auto 0;

    &__homebtn {
      cursor: pointer;
      display: inline-block;
      width: 122px;
      height: 42px;
      background: $bgColorTotal;
      text-align: center;
      border: 1px solid $defaultColorNormal;
      @include rounded(4px);
      @include font-style(16px,$defaultColorNormal, 42px);
    }
  }
}
</style>
