<template>
  <div class="welcome-page">
    <div class="main-content">
      <img src="../assets/img/welcome_bg.png">
      <div class="title">欢迎登录梅沙工作平台</div>
      <p>点击左侧导航菜单进入指定功能模块</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MerchantWelcome'
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .welcome-page{
    background: #ffffff;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 20px;
    min-height: 500px;
    .main-content{
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translate(0, -50%)
    }
    img{
      display: block;
      width: 338px;
      margin: 0 auto;
    }
    .title{
      font-size: 24px;
      color: #303133;
      text-align: center;
      line-height: 33px;
      margin-top: 30px;
    }
    p{
      font-size: 14px;
      color: #909399;
      margin-top: 4px;
      line-height: 20px;
      text-align: center;
    }
  }
</style>
