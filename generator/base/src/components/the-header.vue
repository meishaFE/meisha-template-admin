<template>
  <section class="the-header">
    <a class="the-header__logo" @click="toSystem">
      <img src="@/assets/img/logo.png">
      <span>{{title}}</span>
    </a>
    <el-dropdown v-if="userInfo" class="the-header__dropdown"  trigger="click" placement="bottom-start" @command="dropClick">
      <span class="vhd-link">
        <span class="vhd-link__name">{{userInfo.realname}}</span>
        <span class="vhd-link__middle"></span>
        <span class="vhd-link__form">{{userInfo.groupName}}</span>
        <i class="el-icon-arrow-down vhd-link__icon"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="toUserManager">用户管理</el-dropdown-item>
        <el-dropdown-item command="toPersonSet">个人设置</el-dropdown-item>
        <el-dropdown-item command="loginOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </section>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'the-header',
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  props: {
    title: {
      type: String,
      default: '梅沙工作平台'
    }
  },
  methods: {
    dropClick (val) {
      this[val]();
    },
    loginOut () {
      this.$ms_confirm('确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $cookie.delCookie('myAuth');
        let accountBase = $tool.getSystemAddress();
        window.location.href = `${accountBase}login`;
      }).catch(() => {});
    },
    toPersonSet () {
      let accountBase = $tool.getSystemAddress();
      window.open(`${accountBase}account/personal/detail?id=${this.userInfo.userId}`, '_blank');
    },
    toUserManager () {
      let accountBase = $tool.getSystemAddress();
      window.open(`${accountBase}account/personal`, '_blank');
    },
    toSystem () {
      let accountBase = $tool.getSystemAddress();
      window.open(`${accountBase}`, '_blank');
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@include b(the-header) {
  position: absolute;
  display: flex;
  justify-content: space-between;
  left: 0;
  top: 0;
  right: 0;
  height: 50px;
  background: $bgColorNav;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  @include e(logo) {
    display: flex;
    align-items: center;
    padding-left: 16px;
    width: 180px;
    height: 50px;
    cursor: pointer;
    color: #606266;
    img {
      width: 24px;
      height: 24px;
    }
    span {
      font-weight: bold;
      padding-left: 10px;
    }
  }
}
@include b(vhd-link) {
  padding-right: 20px;
  cursor: pointer;
  @include font-style(14px,#666666,50px);
  @include e(link) {
    display: inline-block;
  }
  @include e(middle) {
    display: inline-block;
    width: 1px;
    height: 12px;
    background: #E5E9F0;
    margin: 19px 8px 0;
  }
  @include e(icon) {
    color: #C0C4CC;
    padding-left: 4px;
  }

  .vhd-link__name,
  .vhd-link__form {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 120px;
    display: inline-block;
    vertical-align: top;
  }
}
::v-deep .el-dropdown-menu__item{
  line-height: 34px;
  width: 151px;
  color: #606266;
}
.el-dropdown-menu{
  padding: 6.7px 0 7.3px;
}
</style>
