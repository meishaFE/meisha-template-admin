/**
 * 项目正式环境域名，必填
 * 比如：camps.meishakeji.com
 * @type {String}
 */
const HOST = '';

/**
 * 后端开发接口本地域名，选填
 * 用于本地开发联调，比如：192.168.1.xx:8000
 * 为空则会采用测试环境地址，详见下面 getBaseUrl
 * @type {String}
 */
const DEVELOP_LOCAL_HOST = '';

export const ENV = {
  DEV: /^127.0.0.1|^localhost|^192.168/.test(window.location.host),
  TEST: /^test-/.test(window.location.host),
  PRE: /^pre-/.test(window.location.host)
};

/**
 * 根据当前环境，生成项目 api 的地址：BASE_URL
 */
const getBaseUrl = () => {
  let baseUrl = '';

  if (ENV.DEV) {
    baseUrl = `//${DEVELOP_LOCAL_HOST || 'test-'}${HOST}`;
  } else if (ENV.TEST) {
    baseUrl = `//test-${HOST}`;
  } else if (ENV.PRE) {
    baseUrl = HOST ? `//pre-${HOST}` : '';
  } else {
    baseUrl = `//${HOST}`;
  }
  return baseUrl;
};

// API base URL
export const BASE_URL = getBaseUrl();

// API 设置，请使用大写+下划线的的写法，例如：NAMES_LIKE_THIS
export const API = {
  LOGIN: '/login'
};
