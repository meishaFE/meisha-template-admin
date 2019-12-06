<template>
  <section class="not-found">
    <div class="part-word">
      <div class="not-found-icon"></div>
      <div class="para-1">
        Oh，页面不见了
      </div>
      <!-- <div class="para-2">
        这时候你可以：
      </div> -->
      <div class="para-3">
        <el-button type="primary" @click="$router.push({name: 'Welcome'})">回到首页</el-button>
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

  .part-word {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .not-found-icon {
    width: 210px;
    height: 140px;
    background: no-repeat center/100% url('../assets/img/notFound.png');
  }

  .para-1 {
    margin-top: 20px;
    font-size: 18px;
    color: #303133;
    line-height: 25px;
    text-align: center;
  }

  .para-3 {
    margin: 30px auto 0;
    text-align: center;

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
