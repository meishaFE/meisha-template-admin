<template>
  <section class="welcome-page">
    <div class="txt-center">欢迎登录{{PROJECT_NAME}}系统，点击左侧列表进入平台功能模块</div>
  </section>
</template>

<script>
import { PROJECT_NAME } from '@/config';
export default {
  name: 'Welcome',
  data () {
    return {
      PROJECT_NAME
    };
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  <%_ if(!options.sassPattern){ _%>
  @import "../assets/scss/index";
  <%_ } _%>
  .welcome-page {
    padding-top: 140px;
    .txt-center {
       text-align: center;
       padding-top: 126px;
       background: url('../assets/img/welcome.png') no-repeat center top;
       @include font-style(18px,$fontColorSubTitle, 42px);
    }
  }
</style>

