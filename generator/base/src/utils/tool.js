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
};

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
};

/**
 * @function message 统一message入口，可全局调用
 * @param msg 简单方便的调用
 */
export const message = (type, message, duration) => {
  Message.closeAll();
  if(typeof type === 'object') Message(type);
  else {
    Message({
      type,
      message,
      duration
    });
  }
};

export const msg  = {
  suc: (sucMessage, duration = 1500)=>message('success',sucMessage, duration),
  err: (errMessage, duration = 1500)=>message('error',errMessage, duration),
  warn: (warnMessage, duration = 1500)=>message('warning',warnMessage, duration)
};

export const phoneCodeAndNumValidator = (code, num) => {
  let regObj = {
    '86': /^(1\d{10})$/,
    '853': /^6\d{7}$/,
    '852': /^(5|6|9)\d{7}$/,
    '886': /^09\d{8}$/
  };

  let isError = false;

  if (regObj[code] && !regObj[code].test(num)) isError = true;

  return isError;
};

// 满足超过一行显示省略号，并展示tooltips
export const checkTextWidth = (targetWidth, textContent, fontSize) => {
  let dom = document.createElement('span');
  dom.setAttribute('style', `display: inline-block; white-space: nowrap; font-size: ${fontSize}px`);
  dom.innerHTML = textContent;
  document.body.appendChild(dom);
  let realWidth = dom.getBoundingClientRect().width;
  document.body.removeChild(dom);
  return realWidth > targetWidth;
};

export const deepClone = function (obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (obj == null || typeof obj !== 'object') return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};