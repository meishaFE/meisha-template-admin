<template>
  <section class="view-header">
    <a class="logo-left">
      <span>{{title}}</span>
    </a>
    <ul class="right-link">
      <li v-if="userInfo">
        <span class="user-info">{{userInfo.realname}}</span>
      </li>
      <li v-for="(item, index) in rightLinks" :key="index">
        <router-link :to="item.router">{{item.label}}</router-link>
      </li>
      <li>
        <a @click.prevent.stop="$emit('logout')">退出</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: '梅沙教育'
    },
    rightLinks: {
      type: Array,
      default () {
        return [{
          router: '',
          label: '个人设置'
        }];
      }
    },
    userInfo: {
      type: Object,
      default () {
        return null;
      }
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
<%_ if(!options.sassPattern){ _%>
@import "../assets/scss/index";
<%_ } _%>
.view-header {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 50px;
  background: $bgColorNav;
  .logo-left {
    display: block;
    width: 180px;
    height: 50px;
    cursor: pointer;
    text-align: center;
    span {
      display: inline-block;
      padding-left: 35px;
      @include font-style(16px, $fontColorWhite, 50px);
      background: url('https://cdn.meishakeji.com/camps/camppic/f988f49793f9455dab80afcc11a2049a.png') no-repeat left center;
    }
    &:hover {
      background: $fontColorSubTitle;
    }
  }
  .right-link {
    position: absolute;
    right: 28px;
    top: 0;
    li {
      float: left;
      margin-left: 40px;
      a {
        cursor: pointer;
        @include font-style(14px,$fontColorWhite,50px);
      }
    }
  }
}
</style>

