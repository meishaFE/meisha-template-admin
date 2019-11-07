<template>
  <div class="auto-collapse">
    <div class="title" v-show = "$props.bShowTitle">
      <span class="name">{{title}}</span>
      <el-button
        type = 'text'
        @click="handleCollapseHide"
        :disabled = "$props.disableCollapseBtn"
        v-show = "bShowCollapseIcon">
        {{status === 'collapsed' ? '展开' : '收起'}}
        <i class="ml-5"  :class="status === 'collapsed' ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
      </el-button>
    </div>

    <div class = 'tag-wrapper' ref = "tagWrapper" :style = "{'max-height': curHeight+'px'}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'auto-collapse',
  data () {
    return {
      curHeight: 28,
      bHideElement: true,
      bShowCollapseIcon: false,
      throttleFn: null
    };
  },
  props: {
    // 当auto-caollapse 处于隐藏状态，这个时候改变窗口大小getCurHeight 会返回0
    // 在不需要根据窗口大小动态改变和处于隐藏时取消监听，显示后才开始坚定
    bListenToResize: {
      type: Boolean,
      default: true
    },
    bShowTitle: {
      type: Boolean,
      default: true
    },
    eleHeight: { // 最小视口高度
      type: Number,
      default: 28
    },
    // 当计算是否需要显示折叠按钮时，用元素高度和视口比较的是时候，
    // subtractedHeight是元素高度的“不计高度”
    subtractedHeight: {
      type: Number,
      default: 10
    },
    title: { // 标题
      type: String,
      default: 'Untitled'
    },
    disableCollapseBtn: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    '$props.bListenToResize': {
      handler (newV, oldV) {
        if (newV) {
          this.throttleFn();
          this.getCurHeight();

          window.addEventListener('resize', this.throttleFn, false);
          window.addEventListener('resize', this.getCurHeight, false);
        } else {
          window.removeEventListener('resize', this.throttleFn, false);
          window.removeEventListener('resize', this.getCurHeight, false);
        }
      }
    }
  },

  computed: {
    status () {
      return this.bHideElement ? 'collapsed' : 'uncallapsed';
    }
  },
  methods: {
    handleCollapseHide () {
      if (this.status === 'collapsed') {
        this.bHideElement = false;
        this.curHeight = this.$refs.tagWrapper.scrollHeight;
      } else {
        this.bHideElement = true;
        this.curHeight = this.$props.eleHeight;
      }
    },

    resizeDOM () {
      let vm = this;
      let wrapper = vm.$refs.tagWrapper;

      if (!vm.bHideElement) {
        // 实际DOM大小 > 最小视口
        vm.bShowCollapseIcon = wrapper.scrollHeight - vm.$props.subtractedHeight > vm.$props.eleHeight;
      } else {
        // 实际DOM大小 > 最小视口
        vm.bHideElement = wrapper.scrollHeight > vm.$props.eleHeight;
        // 实际DOM大小 > 实际视口
        vm.bShowCollapseIcon = wrapper.scrollHeight - vm.$props.subtractedHeight > wrapper.clientHeight;
      }
    },
    getCurHeight () {
      if (!this.bHideElement) {
        let wrapper = this.$refs.tagWrapper;
        this.curHeight = wrapper.scrollHeight;
      }
    }
  },

  created () {
    this.curHeight = this.$props.eleHeight;
    this.throttleFn = $tools.throttle(this.resizeDOM, 100, 300);
  },

  mounted () {
    let wrapper = this.$refs.tagWrapper;
    this.bShowCollapseIcon = wrapper.scrollHeight - this.$props.subtractedHeight > wrapper.clientHeight;
    if (this.$props.bListenToResize) {
      window.addEventListener('resize', this.throttleFn, false);
      window.addEventListener('resize', this.getCurHeight, false);
    }
    var config = { childList: true, subtree: true };
    this.DOMObserver = new MutationObserver(this.throttleFn);
    this.DOMObserver.observe(wrapper, config);
  },

  beforeDestroy () {
    this.DOMObserver.disconnect();
    if (this.$props.bListenToResize) {
      window.removeEventListener('resize', this.throttleFn, false);
      window.removeEventListener('resize', this.getCurHeight, false);
    }
  }
};
</script>

<style lang="scss" scoped>
  .auto-collapse {
    width: 100%
  }
  .title {
    display: flex;
    margin-bottom: 10px;
    .name {
      flex: 1;
      font-size: 14px;
      color: #606266;
    }
    button {
      padding: 0;
    }
  }

  .tag-wrapper {
    overflow: hidden;
    display: inline-block;
    -webkit-transition: max-height 0.3s; /* For Safari 3.1 to 6.0 */
    transition: max-height 0.3s;
  }
</style>
