<template>
  <section class="view-menu"
    :class="{'hidden-menu': isCollapse}">
    <div class="view-menu__toggle-view">
      {{!isCollapse ? PROJECT_NAME : ''}}
      <span @click="toggleMenu" class="view-menu__toggle-span">
        <img src="@/assets/img/icon/icon_menu.png" class="view-menu__menuIcon">
      </span>
    </div>
    <el-menu :default-active="defaultActive"
      :default-openeds="defaultOpeneds"
      @select="onSelect"
      @close="onClose"
      @open="onOpen"
      v-if="menuConfig && menuConfig.length"
      :router="router"
      :collapse="isCollapse">
      <template v-for="(item, index) in menuConfig">
        <el-submenu v-if="item.children && item.children.length"
          :key="`menu-${index}`"
          :index="item.index">
          <template v-if="item.title"
            slot="title">
            <i v-if="item.icon"
              class="iconfont view-menu__iconfont"
              :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <template v-for="(child, childIdx) in item.children">
            <el-menu-item-group v-if="child.children && child.children.length"
              :key="`menu-group-${childIdx}`">
              <template v-if="child.title"
                slot="title">
                <i v-if="child.icon"
                  class="iconfont view-menu__iconfont"
                  :class="`ic_${child.icon}`"></i>
                <span slot="title">{{child.title}}</span>
              </template>
              <el-menu-item v-for="(groupItem, groupItemIdx) in child.children"
                :key="`menu-groupItem-${groupItemIdx}`"
                :index="groupItem.index"
              >
                <span slot="title">{{groupItem.title}}</span>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item v-else
              :key="`menu-item-${childIdx}`"
              :index="child.index">
              <span slot="title">{{child.title}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else
          :key="`menu-${index}`"
          :index="item.index">
          <!-- <span class="one-level-menu"> -->
            <i v-if="item.icon" class="iconfont view-menu__iconfont" :class="`ic_${item.icon}`"></i>
            <span slot="title" class="one-level-menu">{{item.title}}</span>
          <!-- </span> -->
        </el-menu-item>
      </template>
    </el-menu>
  </section>
</template>

<script>
import { PROJECT_NAME } from '@/config';
const ROUTE_REG = /^(\/[^/]*)[/]?/;

export default {
  name: 'the-menu',
  props: {
    router: {
      type: Boolean,
      default () {
        return true;
      }
    },
    menuConfig: {
      type: Array
    }
  },
  watch: {
    $route () {
      this.$nextTick(() => {
        if (this.$route.meta && ROUTE_REG.exec(this.$route.meta.activeSrc)) {
          this.defaultActive = ROUTE_REG.exec(this.$route.meta.activeSrc)['input'];
        }
      });
    }
  },
  created () {
    this.$nextTick(() => {
      if (this.$route.meta && ROUTE_REG.exec(this.$route.meta.activeSrc)) {
        this.defaultActive = ROUTE_REG.exec(this.$route.meta.activeSrc)['input'];
      }
    });
  },
  data () {
    return {
      defaultActive: '1',
      defaultOpeneds: ['1'],
      isCollapse: false,
      PROJECT_NAME
    };
  },
  methods: {
    onSelect (index, indexPath) {
      if (this.$route.path !== index) {
        this.$emit('select', arguments);
        this.$router.push({ path: index });
      }
    },
    toggleMenu () {
      this.isCollapse = !this.isCollapse;
      this.$emit('collapse', this.isCollapse);
      // this.$store.commit('SET_COLLAPSE', this.isCollapse);
    },
    onOpen () {
      this.$emit('open', arguments);
    },
    onClose () {
      this.$emit('close', arguments);
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@include b(view-menu) {
  position: absolute;
  top: 50px;
  left: 0;
  width: 180px;
  height: 100%;
  background: $bgColorDisabled;
  overflow: hidden;
  @include e(toggle-view) {
    position: relative;
    height: 48px;
    text-indent: 16px;
    background: $bgColorDisabled;
    border-bottom: 1px solid #f0f2f5;
    @include font-style(16px, #313233, 48px);
  }
  @include e(toggle-span) {
    position: absolute;
    height: 48px;
    width:48px;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    @include font-style(16px, #313233, 48px);
    img{
      margin-right: 0px;
    }
  }
  @include e(menuIcon) {
    height: 16px;
  }
  @include e(iconfont menuIcon){
    margin-right: 16px;
  }
  &.hidden-menu {
    width: 48px;
  }

  // 重写样式
  .el-menu {
    top: 48px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow-y: auto;
    border-right: none;
    padding-bottom: 40px;
    .el-menu-item {
      // NOTE: 当菜单收起的时候，如果存在一级导航，它的名称气泡会在 180px 以外
      color: #606266;
      &.is-active{
        background:  rgba(61,122,248,0.10);
        color: #3D7AF8;
      }
    }

    // NOTE: 一级导航不需要缩进
    .el-menu--inline {
      .el-menu-item {
        text-indent: 8px;
      }
    }

     // NOTE： 只有二级导航的菜单也需要向左移动 4px
    .el-menu-item,
    ::v-deep .el-submenu__title{
      height: 50px;
      line-height: 50px;
      color: #606266;
      display: flex;
      align-items: center;
      margin-left: -4px;
    }

      // 导航中的 icon
    .view-menu__iconfont,
    .view-menu__menuIcon {
      margin-right: 16px;
      font-size: 16px;
      width: 16px;
      line-height: 16px;
      display: inline-block;
    }
  }
}
</style>
