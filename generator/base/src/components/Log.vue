<template>
  <section class="view-log">
    <div class="log-name">操作日志</div>
    <template v-if="logArr && logArr.length">
      <ul>
        <li v-for="(item, k) in logArr" :key="k" :class="{'attention-status': item.level === 2, 'red-status':item.level === 3}">
          <div class="time-div">
            {{item.createTime}}
          </div>
          <div class="w-200">
            {{item.operator | setDefaultText}}
          </div>
          <div class="flex1">{{item.description}}</div>
        </li>
      </ul>
      <div class="load-more-log" v-if="hasMore">
        <span @click="loadMore">加载更多记录</span><i class="el-icon-arrow-down"></i>
      </div>
    </template>

    <div class="no-data-default" v-else>
      暂无数据
    </div>

  </section>
</template>

<script>
// 日志操作，得更换后台接口地址
export default {
  name: 'Log',
  props: {
    logObj: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      logArr: [],
      hasMore: true,
      pageObj: {
        currentPage: 1,
        perPage: 10,
        count: 0
      }
    };
  },
  created () {
    this.getLogList();
  },
  methods: {
    getLogList () {
      setTimeout(() => {
        this.logArr.push({
          changedRecordId: 'de09a86400312a1a',
          createTime: '2018-03-23 17:51:32',
          description: '修改了数据ID为：1768815(de09a86400312a1a) 的数据',
          detail: 'XXXXXXXXX',
          operator: 'aaron',
          operatorId: 'a0a88a563a845c52',
          operatorTeamId: 'meisha',
          level: 0
        });
        this.checkHasMore();
      }, 200);
    },
    checkHasMore () {
      this.pageObj.currentPage > 3 && (this.hasMore = false);
    },
    loadMore () {
      ++this.pageObj.currentPage;
      this.getLogList();
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss"  scoped>
<%_ if(!options.sassPattern){ _%>
@import "../assets/scss/index";
<%_ } _%>
  .view-log{
    margin-top: 10px;
    .log-name{
      @include  font-style(14px,$fontColorSubTitle,48px);
      font-weight: bold;
    }
    ul{
      margin-top: 3px;
      li{
        display: flex;
        margin-bottom: 10px;
      }
      div{
         padding-right: 40px;
         @include  font-style(14px,$fontColorSubTitle,18px);
         word-break: break-all;
         white-space: normal;
         height: 18px;
         &.w-200{
           width: 200px;
         }
         &:last-child{
           height: auto;
         }
         &.time-div{
           position: relative;
           padding-left: 12px;
           &:before{
             content: '';
             position: absolute;
             display: block;
             width: 6px;
             height: 6px;
             left: 0;
             top:50%;
             margin-top: -3px;
             background: $fontColorSubTitle;
           }
         }
      }
      li.red-status{
        div{
          color: $negativeColorNormal;
          &.time-div{
            &:before{
              background: $negativeColorNormal;
            }
          }
        }
      }
      li.attention-status{
        div{
          color: $defaultColorNormal;
          &.time-div{
            &:before{
              background: $defaultColorNormal;
            }
          }
        }
      }
    }

    .load-more-log{
      text-align: center;
      padding:10px 0 20px 0;
      span,i{
        @include  font-style(14px,$fontColorTip,20px);
        cursor: pointer;
      }
      i{
        padding-left: 10px;
        font-size: 12px;
      }
    }
  }
</style>

