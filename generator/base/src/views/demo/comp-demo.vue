<template>
  <section class="test__wrap">
    <div class="test__section">
      <h1 class="test__section-title">分页组件</h1>
      <div>
        <thePage :pageObj="pageObj" @changePage="changePage"></thePage>
      </div>
    </div>
    <div class="test__section">
      <h1 class="test__section-title">日志组件</h1>
      <div>
        <the-log :logObj="logObj"></the-log>
      </div>
    </div>
    <div class="test__section">
      <h1 class="test__section-title">弹窗组件</h1>
      <div>
        <el-button @click="dialogObj.dialogVisible = true">弹窗</el-button>
      </div>
    </div>
    <the-dialog :dialogObj="dialogObj"></the-dialog>
  </section>
</template>

<script>
import thePage from '@/components/the-pagination';
import theLog from '@/components/custom-log';
import theDialog from '@/components/the-dialog';

export default {
  name: 'Test',
  data () {
    return {
      breadCrumbArr: [{
        name: '首页',
        to: '/'
      }, {
        name: '组件',
        to: {}
      }],
      pageObj: {
        currentPage: 1,
        perPage: CONFIG.PAGE.PAGE_SIZE,
        pageTotal: 20,
        layOutString: 'total, sizes, prev, pager, next, jumper'
      },
      logObj: {
        objectType: '1'
      },
      dialogObj: {
        title: '提示',
        content: '这是文本内容',
        dialogVisible: false,
        type: 'A',
        modal: true,
        isNeedCancel: true,
        confirmTxt: '确 定',
        cancelTxt: '取 消',
        confirmCall () {},
        cancelCall () {}
      }
    };
  },
  created () {
    this.$emit('changeLoading', false);
    this.$emit('setBreadCrumb', this.breadCrumbArr, true);
  },
  methods: {
    getSearchResult (val) {
      console.log('搜索框输入', val);
    },
    changePage (val, type) {
      if (type === 'gotoPage') { // 页码数改变
        this.pageObj.currentPage = val;
      } else { // 每页数量改变
        this.pageObj.perPage = val;
      }
    }
  },
  components: {
    thePage,
    theLog,
    theDialog
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.test__wrap {
  padding: 10px;
}
.test__section {
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.test__section-title {
  margin-bottom: 10px;
  text-indent: 4px;
  border-left: 4px solid #20a0ff;
}
</style>
