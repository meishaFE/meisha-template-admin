<template>
   <section>
     <div class="common-bread-zone">
        <el-breadcrumb separator="/" class="bread-crumb-left" v-if="breadArr">
          <el-breadcrumb-item v-for="(item, k) in breadArr" :key="k" :to="item.to">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-input
          v-if="hasSearch"
          class="top-search-input"
          placeholder="请输入搜索内容"
          size="small"
          @input="handleInput"
          clearable
          v-model.trim="searchContent"
          @keyup.enter.native="handleIconClick">
          <el-button slot="append" @click="handleIconClick" icon="el-icon-search"></el-button>
        </el-input>
     </div>
     <div class="common-content-zone">
         <router-view ref="childRef" v-on:setBreadCrumb="setBreadCrumb" v-on:changeLoading="changeLoading"/>
     </div>
   </section>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      hasSearch: false,
      breadArr: null,
      searchContent: ''
    };
  },
  methods: {
    setBreadCrumb (breadCrumbArr, hasSearch) {
      this.hasSearch = hasSearch;
      this.breadArr = breadCrumbArr;
    },
    handleInput (value) {
      if (value === '') {
        this.$refs.childRef.getSearchResult(this.searchContent);
      }
    },
    handleIconClick () {
      this.$refs.childRef.getSearchResult(this.searchContent);
    },
    changeLoading (flag) {
      this.$emit('changeLoading', flag);
    }
  },
  components: {
  }
};
</script>
