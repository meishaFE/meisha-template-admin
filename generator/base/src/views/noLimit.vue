<template>
  <section class="view-all">
    <the-header class="view-top" :userInfo="userInfo"/>
    <section class="not-found">
      <div class="part-word">
        <div class="not-found-icon"></div>
        <div class="common-word-style mt-40">
          抱歉，你没有权限访问当前页面，请联系相关负责人。
        </div>
        <div class="common-word-style mt-20">
          若你不清楚该联系谁:
        </div>
        <div class="common-word-style mt-10">1. 可以到系统反馈群里提问；</div>
        <div class="common-word-style mt-5">2. 联系你所在团队的管理员为你开通</div>
        <div class="para-3">
          <el-button type="primary" @click="gotoAccount" plain>返回到首页</el-button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import theHeader from '../components/the-header.vue';

export default {
  name: 'notFound',
  data () {
    return {

    };
  },
  computed: {
    // ...mapState([
    //   'userInfo'
    // ])
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
  .not-found{
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
    .not-found-icon{
      height: 125px;
      background: url('../assets/img/pic_nopermission@2x.png') no-repeat center top;
      @include backgroundSize(100px, 125px);
    }
    .common-word-style{
      @include font-style(18px,$fontColorSubTitle,18px);
    }
    .para-3{
      margin: 15px auto 0;
      &__homebtn{
        cursor:pointer;
        display: inline-block;
        width: 122px;
        height: 42px;
        background: $bgColorTotal;
        text-align: center;
        border:1px solid $defaultColorNormal;
        @include rounded(4px);
        @include font-style(16px,$defaultColorNormal,42px);
      }
    }
  }
</style>
