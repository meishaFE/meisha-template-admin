<%# if_eq build "standalone" _%>
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
<%# /if_eq _%>
<%_ if(options.polyfill){ _%>
import '@babel/polyfill';
<%_ } _%>
import Vue from 'vue';

<%_ if(options.element){ _%>
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
<%_ } _%>

import App from './App';

<%_ if(options.router){ _%>
import router from '@/router';
<%_ } _%>

<%_ if(options.vuex){ _%>
import store from '@/store';
<%_ } _%>

import { $http, $type, filters, $cookie, $tool } from '@/utils';
import * as CONFIG from '@/config';
import './assets/scss/app.scss';
import { handleNoLogin } from './utils/fetch';
import MSMessageBox from '@/components/message-box';
<%_ if(options.meishaWatch){ _%>
import MeishaWatch from 'meisha-fe-watch';
Vue.use(MeishaWatch.useVue());
MeishaWatch.init({
  // 是否向后端提交MeishaWatch收集信息，默认为true，可自行检测当前环境，在开发、测试、预发布环境关闭，如：isReport: !/127.0.0.1|192.168|localhost|test-|pre-/.test(window.location.host)
  isReport: !CONFIG.ENV.DEV,
  // 向后端提交MeishaWatch收集信息的URL(必填，否则无法提交)
  reportURL: (CONFIG.ENV.TEST || CONFIG.ENV.DEV) ? '//test-monitor.meishakeji.com/v1/fex/post_log' : '//monitor.meishakeji.com/v1/fex/post_log',
  projectId: null // 日志系统设置的项目英文名（必填，否则无法提交）
});
<%_ } _%>

Vue.use(filters);

<%_ if(options.element){ _%>
Vue.use(ElementUI);
<%_ } _%>

Vue.config.productionTip = false;

// 检测是否有登陆信息
let cookie = '';
if (CONFIG.ENV.DEV) {
  cookie = $cookie.getCookie('myAuth') || 'testcookie';
} else {
  cookie = $cookie.getCookie('myAuth');
}
if (!cookie) {
  handleNoLogin();
}
<%_ if(options.vuex){ _%>
store.commit('SETAUTH', cookie);
<%_ } else { _%>
localStorage.setItem('auth', cookie);
<%_ } _%>
/*
 * HTTP 请求函数，使用方法请查看：https: //github.com/axios/axios
 * 已封装 Auth 到 Header 里面，默认会处理错误的响应，返回 Promise
 * 例子：
 * $http.post(API.ANY, {username: '', password: '' })
 *     .then(res => {
 *         // do anything for res
 *     })
 *     .catch(error => {
 *         // handle error
 *     })
*/
window.$http = $http;
window.$type = $type;
window.CONFIG = CONFIG;
window.$tool = $tool;
window.$cookie = $cookie;
window.MeishaWatch = MeishaWatch;

// 自定义 MessageBox
Vue.prototype.$ms_msgbox = MSMessageBox;
Vue.prototype.$ms_alert = MSMessageBox.alert;
Vue.prototype.$ms_confirm = MSMessageBox.confirm;
Vue.prototype.$ms_prompt = MSMessageBox.prompt;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  <%_ if(options.vuex){ _%>
  store,
  <%_ } _%>

  <%_ if(options.router){ _%>
  router,
  <%_ } _%>

  <%# if_eq build "runtime" _%>
  render: h => h(App)
  <%# /if_eq _%>

  <%# if_eq build "standalone" _%>
  <%# template: '<App/>', %>
  <%# components: { App } %>
  <%# /if_eq _%>
}).$mount('#app');
