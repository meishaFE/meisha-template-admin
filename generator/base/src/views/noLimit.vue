<template>
  <section class="view-all">
    <the-header class="view-top"/>
    <section class="no-limit">
      <div class="part-word">
        <div class="no-limit-icon"></div>
        <div class="tip-1">抱歉，你没有权限访问当前页面</div>
        <div class="tip-2">请联系相关负责人或所在团队的管理员</div>
        <div class="para-3">
          <el-button type="primary" @click="$router.replace({name: 'Welcome'})">回到首页</el-button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import theHeader from '../components/the-header.vue';

export default {
  name: 'noLimit',
  data () {
    return {

    };
  },
  methods: {
    gotoAccount () {
      let accountBase = $tool.getSystemAddress();
      window.location.href = (accountBase + 'index');
    }
  },
  components: {
    theHeader
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .view-all{
    // overflow: hidden;
    // position: absolute;
    // top: 0;
    // bottom: 0;
    // left: 0;
    // right: 0;
    // min-width: 1103px;
    .view-top{
      position: relative;
      z-index: 1000;
    }
    .view-right{
      position: absolute;
      top: 50px;
      left: 180px;
      right: 0;
      bottom: 0;
      @include transition(left .3s ease);
    }
    .view-right.is-change{
      left: 64px;
    }
  }
  .no-limit{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: $bgColorTotal;
    .part-word{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
    .no-limit-icon{
      width: 210px;
      height: 140px;
      background: no-repeat center/100% url('../assets/img/pic_nopermission@2x.png');
    }
    .common-word-style{
      @include font-style(18px,$fontColorSubTitle,18px);
    }
    .para-3{
      margin: 20px auto 0;
      text-align: center;
    }
    .tip-1{
      font-size: 18px;
      color: #303133;
      text-align: center;
      margin-top: 20px;
    }
    .tip-2{
      font-size: 14px;
      color: #909399;
      text-align: center;
      margin-top: 6px;
    }
  }
</style>
