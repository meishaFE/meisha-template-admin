/* eslint-disable prefer-promise-reject-errors */
import FileSaver from 'file-saver';
import axios from 'axios';
import URLSearchParams from '@ungap/url-search-params';
import { BASE_URL } from '@/config/api';

const IS_NOT_SUPPORT_DOWNLOAD = /Version.*10.0.*safari/i.test(window.navigator.userAgent); // 是否不支持下载功能
const SPEC_REG = /octet-stream|vnd.openxmlformats-officedocument.spreadsheetml.sheet/i; // 判断请求头的 content-type
const isArray = val => Object.prototype.toString.call(val) === '[object Array]';
const isObject = val => Object.prototype.toString.call(val) === '[object Object]';
let $a;

function initHttp () {
  const _a = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    transformRequest: [
      data => {
        if (!data) return;
        const params = new URLSearchParams();
        params.append('data', JSON.stringify(data));
        return params;
      }
    ],
    withCredentials: true
  });

  _a.interceptors.response.use(res => {
    if (SPEC_REG.test(res.headers['content-type'])) {
      return res;
    }

    if (Object.prototype.toString.call(res.data) === '[object ArrayBuffer]') {
      const data = res.data;
      var decodedString = String.fromCharCode.apply(null, new Uint16Array(data));
      return Promise.reject(JSON.parse(decodedString));
    }

    if (!res || !res.data || (!isArray(res.data) && !isObject(res.data))) {
      // 处理响应为空的情况
      return Promise.reject(new Error('response is empty'));
    } else if (res.data.code === -1001) {
      // 处理未登录的情况
      <%_ if(!options.vuex){ _%>
      localStorage.removeItem('auth');
      <%_ } _%>
      return res.data;
    } else if (res.data.code !== 0) {
      // 处理后端返回的 code 不为 0 的情况
      return Promise.reject(res.data);
    } else {
      // 正常返回
      return res.data;
    }
  });

  _a.interceptors.request.use(config => {
    <%_ if(options.vuex){ _%>
    config.headers['Auth'] = store.state.auth || '';
    <%_ }else{ _%>
    config.headers['Auth'] = localStorage.getItem('auth') || '';
    <%_ } _%>
    return config;
  });

  return _a;
}

function getFileNameFromContentDisposition (disposition) {
  const regExp = /filename\*?=((['"])[\s\S]*?\2|[^;\n]*)/g;
  let fileName = '';
  let res;

  // 获取文件名
  while (res !== null) {
    res = regExp.exec(disposition);
    if (res && res[1]) {
      fileName = res[1].replace(/['"]|utf-8''/g, '');
    }
  }
  return decodeURIComponent(fileName);
}

/**
 * 下载 Excel 的方法
 * 把服务器返回的响应作为参数给过来就可以了。
 * @param {Object} options
 * @param {Object} options.response
 * @param {String} options.backupFileName 用于未能从 header 获取 filename 时的后备
 * @param {String} options.fileType
 */
function downloadExcel (options) {
  const { response, backupFileName = 'Default.xlsx', fileType = 'application/octet-stream' } = options;
  return new Promise((resolve, reject) => {
    if (!response) return reject({ code: -10000, msg: 'response argument is required' });
    if (IS_NOT_SUPPORT_DOWNLOAD) return reject({ code: -10000, msg: '此浏览器版本不支持下载，请升级版本后重试' });

    const { data, headers } = response;
    if (!data || !headers) return reject({ code: -10000, msg: 'response arguments is error' });

    try {
      const fileName = getFileNameFromContentDisposition(headers['content-disposition']) || backupFileName;
      const blob = new Blob([data], { type: fileType });
      FileSaver.saveAs(blob, fileName);
      return resolve();
    } catch (error) {
      return reject(error);
    }
  });
}

function download (api, data, config = {}) {
  const { backupFileName = 'Default.xlsx', fileType = 'application/octet-stream' } = config;
  !$a && ($a = initHttp());
  return $a
    .post(api, data, {
      responseType: 'arraybuffer'
    })
    .then(res => {
      return downloadExcel({
        response: res,
        backupFileName: backupFileName,
        fileType: fileType
      });
    });
}

export { getFileNameFromContentDisposition, downloadExcel, download };
