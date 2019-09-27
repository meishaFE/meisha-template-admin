<template>
  <section class="view-all">
    <!-- <v-header class="view-top" :userInfo="userInfo" @logout="logout"></v-header> -->
    <the-header class="view-top"></the-header>
    <the-menu @collapse="toggleMenuCollapse"></the-menu>
    <div class="view-right" :class="{'is-change': isMenuColllapse}" v-loading="isLoading">
      <template v-if="$route.meta.keepAlive">
        <keep-alive>
          <router-view v-on:changeLoading="changeLoading"/>
        </keep-alive>
      </template>
      <template v-else>
        <router-view v-on:changeLoading="changeLoading"></router-view>
      </template>
    </div>
  </section>
</template>

<script>
// import vHeader from '@/components/Header.vue';
import theHeader from '@/components/the-header.vue';
import theMenu from '@/components/the-menu.vue';
export default {
  name: 'Home',
  data () {
    return {
      userInfo: null,
      isMenuColllapse: false,
      isLoading: false
    };
  },

  methods: {
    toggleMenuCollapse (status) {
      this.isMenuColllapse = status;
    },
    logout () {
      this.$store.dispatch('logout');
    },
    changeLoading (isLoading) {
      this.isLoading = !!isLoading;
    }
  },

  components: {
    // vHeader,
    theHeader,
    theMenu
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .view-all {
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    min-width: 1103px;

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
      &.is-change {
        left: 64px;
      }
    }
  }
</style>
