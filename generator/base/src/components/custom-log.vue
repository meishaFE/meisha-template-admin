<template>
  <section class="fe-log">
    <div v-loading="defaultLoad">
      <p class="fe-log__title">操作日志</p>
      <ul class="fe-log__ul" v-if="defaultList.length > 0">
        <li class="felog-line" v-for="item in defaultList" :key="item.id">
          <template v-if="$scopedSlots.content">
            <slot name="content" :item="item"></slot>
          </template>
          <template v-else>
            <span class="felog-line__s1">{{item[time] | dateFilter(4)}}</span>
            <span class="felog-line__s2" :title="item[name]">{{item[name]}}</span>
            <span class="felog-line__s3">{{item.phoneNo, item.phoneCode | phoneFilter}}</span>
            <span class="felog-line__s4">
              <slot :item="item">
                <p>{{item.explain}} {{item.description}}</p>
                <template v-if="showRemark">
                  <p v-for="(item,idx) in item.remark" :key="idx">{{item}}</p>
                </template>
              </slot>
            </span>
          </template>
        </li>
      </ul>
      <p v-else class="fe-log__nodata">暂无数据</p>
      <el-link :underline="false" v-if="pageObj.pageTotal > 3" type="primary" class="fe-log__more" @click="viewMore">查看更多</el-link>
    </div>
    <v-dialog :dialogObj="dialogObj">
      <div slot="content" class="felog-content" v-loading="load">
        <ul class="fe-log__ul" id="feLogDialog">
          <li class="felog-line" v-for="item in list" :key="item.id">
            <template v-if="$scopedSlots.content">
              <slot name="content" :item="item"></slot>
            </template>
            <template v-else>
              <span class="felog-line__s1">{{item[time] | dateFilter(4)}}</span>
              <span class="felog-line__s2" :title="item[name]">{{item[name]}}</span>
              <span class="felog-line__s3">{{item.phoneNo, item.phoneCode | phoneFilter}}</span>
              <span class="felog-line__s4">
                <slot :item="item">
                  <p>{{item.explain}} {{item.description}}</p>
                  <template v-if="showRemark">
                    <p v-for="(item,idx) in item.remark" :key="idx">{{item}}</p>
                  </template>
                </slot>
              </span>
            </template>
          </li>
        </ul>
        <div class="felog-content__nav">
          <pagination :pageObj="pageObj" @changePage="changePage"></pagination>
        </div>
      </div>
      <div slot="btnDefine"></div>
    </v-dialog>
  </section>
</template>

<script>
import vDialog from '@/components/the-dialog';
import pagination from '@/components/the-pagination.vue';
/**
 * @param apiParams 日志API参数配置
 */
export default {
  props: {
    api: {
      type: String,
      required: true
    },
    time: {
      type: String,
      default: 'createTime'
    },
    name: {
      type: String,
      default: 'operatorName'
    },
    showRemark: {
      default: true
    }
    // explain: {
    //   type: String,
    //   default: 'explain'
    // }
  },
  data () {
    return {
      pageObj: {
        layOutString: 'prev,pager,next',
        isSmall: false,
        perPage: CONFIG.PAGE.PAGE_SIZE,
        currentPage: 1,
        pageTotal: 0
      },
      dialogObj: {
        hasBottomButton: false,
        title: '操作日志',
        dialogVisible: false,
        type: 'normal',
        isNeedCancel: true,
        confirmTxt: '确定',
        cancelTxt: '取消',
        confirmCall () {},
        cancelCall () {}
      },
      param: {},
      // 默认展示的三条日志
      defaultList: [],
      list: [],
      load: false,
      defaultLoad: false
    };
  },
  methods: {
    viewMore () {
      this.dialogObj.dialogVisible = true;
    },
    changePage (val) {
      this.pageObj.currentPage = val;
      this.getLogList();
    },
    getLogList (param) {
      let params = Object.assign({}, {
        currentPage: this.pageObj.currentPage,
        perPage: this.pageObj.perPage
      }, this.param);
      this.load = true;
      return $http.post(this.api, params).then(res => {
        this.load = false;
        this.pageObj.currentPage = res.data.currentPage;
        this.pageObj.pageTotal = res.data.count;
        this.list = res.data.list || [];
        this.$nextTick(() => {
          if (document.querySelector('#feLogDialog')) {
            document.querySelector('#feLogDialog').scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
          }
        });
        return this.list;
      }).catch(err => {
        this.load = false;
        $tool.handleCommonError(err);
      });
    },
    startGetLog (param) {
      if (param) {
        if ($type.isType(param, 'Object')) {
          if (param.currentPage || param.perPage) {
            console.warn('⚠️传入的参数中包含列表请求参数，将覆盖组件中列表请求参数');
          }
          this.param = param;
        } else {
          console.warn('日志组件传入的参数须为Object类型');
        }
      }
      this.pageObj.currentPage = 1;
      this.defaultLoad = true;
      this.getLogList()
        .then(res => {
          if (res) this.defaultList = res.slice(0, 3);
          this.defaultLoad = false;
        });
    }
  },
  components: {
    vDialog,
    pagination
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/index";
@include b(fe-log) {
  padding: 20px;
  background: white;
  @include e(title) {
    @include font-style(14px,#606266,20px);
    margin-bottom: 20px;
  }
  @include e(ul) {
    flex:0 0 396px;
    overflow-y:auto;
    li + li{
      margin-top: 12px;
    }
  }
  @include e(more) {
    margin-top: 12px;
  }
  ::v-deep .the-dialog__footer {
    padding:0;
    box-shadow: 0;
  }
  @include e(nodata){
    font-size: 14px;
    color: #909399;
  }
}
@include b(felog-line) {
  display: flex;
  @include font-style(14px,#909399,normal);
  @include e(s1 s2){
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @include e(s1){
    flex: 0 0 143px;
  }
  @include e(s2){
    margin-left: 40px;
    flex: 0 0 80px;
  }
  @include e(s3){
    margin-left: 10px;
    flex: 0 0 123px;
  }
  @include e(s4){
    margin-left: 10px;
    flex:1;
    color: #606266;
  }
  @include e(margin){
    margin-right: 10px;
  }
}
@include b(felog-content) {
  display:flex;
  flex-direction: column;
  @include e(nav) {
    flex: 0 0 32px;
    margin-top: 20px;
  }
}
</style>

