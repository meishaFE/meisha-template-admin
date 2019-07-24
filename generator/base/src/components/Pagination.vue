<template>
  <section class="page-opera-view">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handleCurrentChange"
      @next-click="handleCurrentChange"
      :current-page="pageObj.currentPage"
      :small = "pageObj.isSamll"
      :page-sizes="pageSizeArr"
      :page-size="pageSize"
      :layout="pageObj.layOutString"
      :total="pageObj.pageTotal">
    </el-pagination>
  </section>
</template>

<script>
// pageObj.pageTotal:总条目数
// pageObj.layOutString：组件布局
// pageObj.isSmall：是否使用小型分页 默认false
// changePage：页码或者每页数量发生改变时调用的函数，perPage 标志每页数量发生的改变，gotoPage 标志为去到第几页
import { PAGE } from '@/config/index';
export default {
  name: 'Pagination',
  methods: {
    handleSizeChange (val) {
      this.$emit('changePage', val, 'perPage');
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.$emit('changePage', val, 'gotoPage');
    }
  },
  created () {
    if ($type.isType(this.pageObj, 'Object')) {
      if (!this.pageObj.currentPage) {
        this.pageObj.currentPage = 1;
      };
    };
  },
  data () {
    return {
      pageSize: PAGE.PAGE_SIZE,
      pageSizeArr: PAGE.PAGE_SIZE_ARRARY
    };
  },
  props: {
    pageObj: {
      validator: function (value) {
        return typeof value === 'object' && typeof value.pageTotal === 'number' && typeof value.layOutString === 'string';
      }
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  <%_ if(!options.sassPattern){ _%>
  @import "../assets/scss/index";
  <%_ } _%>
  .page-opera-view{
      text-align: right;
  }
</style>

