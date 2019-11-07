<template>
  <section class="tag-panel" ref = "tagPanelEle" v-if="Array.isArray(list) && list.length">
    <span class='label'>多选项：</span>
    <div
      class="tag-line"
      v-for="(category, key) in list"
      :key="`tags-${key}`"
    >
        <span class="tag-type">{{category.name}}：</span>
        <template v-if = "category.showPopper">
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              {{category.tags.join('、')}}
              <!-- <span v-for = "(tag, tagIndex) in category.tags" :key = "tagIndex">
                {{tag}}
                <span v-if="tagIndex !==category.tags.length-1">、</span>
                <br v-if = "!((tagIndex+1)%3)">
              </span> -->
            </div>
            <span class="tag-name-wrapper">
              <span v-for="(tag, index) in category.tags" :key="`${key}-${index}`" class = "category">
                <span class="item">{{tag}}</span>
                <span v-if = "index !== category.tags.length - 1">、</span>
              </span>
            </span>
          </el-tooltip>
        </template>
        <template v-else>
          <span class="tag-name-wrapper">
            <span v-for="(tag, index) in category.tags" :key="`${key}-${index}`" class = "category">
              <span class="item">{{tag}}</span>
              <span v-if = "index !== category.tags.length - 1">、</span>
            </span>
          </span>
        </template>
        <i class="el-icon-close" @click="handleClose(category.name, category.prop)"></i>
    </div>
    <span class="clear-all" @click="clearAll">清空筛选</span>
  </section>
</template>

<script>
/**
 *
 * @param {array} categoryList - 不同筛选类别下的筛选项
 * [{
 *   prop: fieldPropertyName,
 *   name: fieldLabel,
 *   tags: [ItemLabels],
 *   tagsId: [ItemIds]
 * }]
 */
// 在父级监听删除和清除筛选项的 @delete 事件，
// 删除筛选项： 返回最新的筛选项

export default {
  name: 'tag-panel',
  props: {
    categoryList: {
      type: Array
    }
  },
  watch: {
    '$props.categoryList': {
      handler (newV, oldV) {
        this.list = this.$props.categoryList.map(d => {
          return {
            ...d,
            showPopper: false
          };
        });
      },
      deep: true,
      immediate: true
    },
    'list': {
      handler (newV, oldV) {
        this.resizeTagPanel();
      },
      deep: true
    }
  },
  data () {
    return {
      list: [],
      resizeTimer: null
    };
  },
  created () {
    window.addEventListener('resize', this.resizeTagPanel, false);
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeTagPanel, false);
  },
  methods: {
    resizeTagPanel () {
      if (this.resizeTimer) clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        if (this.$refs.tagPanelEle) {
          this.$refs.tagPanelEle.querySelectorAll('.tag-line').forEach((d, i) => {
            this.list[i].showPopper = d.scrollWidth > this.$refs.tagPanelEle.scrollWidth;
          });
        }
      }, 400);
    },

    handleClose (name, prop) {
      this.list = this.deleteOneCategory(this.list, name);
      this.$emit('delete', {
        categoryList: this.list,
        name: name,
        prop: prop,
        type: 'category'
      });
    },

    deleteOneCategory (list, name) {
      let index = list.findIndex(d => d.name === name);
      list.splice(index, 1);

      return list;
    },

    clearAll () {
      this.$emit('delete', { categoryList: [], type: 'all' });
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-panel {
  width: 100%;
  font-size: 12px;
  // display: inline-flex;
  .label {
    line-height: 22px;
    color: #909399;
  }
  .label + .tag-line {
    margin-right: 6px;
  }

  .tag-line + .tag-line {
    margin-right: 6px;
  }
  .tag-line {
    display: inline-block;
    line-height: 22px;
    max-width: calc(100% - 54px);
    vertical-align: top;
    background: #E9EBEF;
    border-radius: 4px;
    position: relative;
    padding-left: 10px;
    padding-right: 34px;
    margin-bottom: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    .el-icon-close {
      border-radius: 50%;
      text-align: center;
      position: relative;
      cursor: pointer;
      font-size: 12px;
      width: 14px;
      vertical-align: middle;
      position: absolute;
      right: 10px;
      top: 4px;
      line-height: 13px;
    }
    .el-icon-close:hover {
      color: #FFFFFF;
      background-color: #909399;
    }
  }
  .tag-type {
    color: rgb(126, 128, 135);
  }
  .tag-name-wrapper {
    color: #606266;
    .item {
      max-width: 120px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      vertical-align: top;
      display: inline-block;
    }
  }

  .clear-all:hover{
    color: #606266;
  }

  .clear-all {
    color: #909399;
    cursor: pointer;
    white-space: nowrap;
    margin-bottom: 10px;
    display: inline-block;
  }
}
</style>
