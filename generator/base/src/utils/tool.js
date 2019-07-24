import { Message } from 'element-ui';

/**
 * 获取url参数
 */
export const getUrlParam = (name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

/**
* 封装百度统计API
*/
export const addBaiduLog = (category, action, opt_label, opt_value) => {
  if(_hmt)
    _hmt.push(['_trackEvent', category, action, opt_label, opt_value]);
}

/**
 * 统一账户系统地址获取
 * @returns {string}
 */
export const getSystemAddress = () => {
  let accountUrl = '';
  let origin = window.location.origin;
  if (/192.168|localhost|test/.test(origin)) {
    accountUrl = 'https://test-admin.meishakeji.com/';
  } else if (/pre/.test(origin)) {
    accountUrl = 'https://pre-admin.meishakeji.com/';
  } else {
    accountUrl = 'https://admin.meishakeji.com/';
  };
  return accountUrl;
};

/**
 * 用来处理通常错误，若无特殊要求则可调用。
 */
export const handleCommonError = (err,duration) => {
  let flag = false;
  if (err && err.msg) flag = true;
  let msg = flag ? err.msg : '网络错误';
  Message.closeAll();
  Message({
    type: 'error',
    message: msg,
    duration: duration || 3000
  })
  if(!flag) console.error(err);
}