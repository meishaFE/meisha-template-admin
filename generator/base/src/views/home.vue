<template>
  <section class="view-all">
    <the-header class="view-top"></the-header>
    <the-menu @collapse="toggleMenuCollapse" :menuConfig="menuConfig"></the-menu>
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
import theHeader from '@/components/the-header.vue';
import theMenu from '@/components/the-menu.vue';
export default {
  name: 'Home',
  data () {
    return {
      userInfo: null,
      isMenuColllapse: false,
      isLoading: false,
      menuConfig: CONFIG.MENU_CONFIG
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
