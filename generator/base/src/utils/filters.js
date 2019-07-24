import { isType } from './type';
let format = (value) => {
  return value >= 10 ? value : '0' + value;
};
// 全局的过滤器
const globalFilters = {
  setDefaultText: (val, text = '暂无') => {
    if (val || val !== '') {
      return val;
    } else {
      return text;
    }
  },
  formatMoney: (num, flag) => { // num 数值传过来单位为分
    if (!num && num !== 0) {
      return '-';
    }
    let curNum = Number(num) / 100;
    curNum = curNum.toFixed(2);
    if (flag) {
      curNum = curNum.toFixed(0);
    };
    let source = String(curNum).split('.'); // 按小数点分成2部分
    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,'); // 只将整数部分进行都好分割
    return source.join('.') + '元'; // 再将小数部分合并进来
  },
  dateFilter: (time, type) => {
    if (!time) {
      return '-';
    };
    let date = new Date(time * 1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    let result;
    switch (type) {
      case 0: // 01-05
        result = `${format(month)}-${format(day)}`;
        break;
      case 1: // 11:12
        result = `${format(hours)}-${format(minutes)}`;
        break;
      case 2: // 2015-01-05
        result = `${year}-${format(month)}-${format(day)}`;
        break;
      case 3: // 2015-01-05 11:12
        result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}`;
        break;
      case 4: // 2015-01-05 11:12:06
        result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}:${format(second)}`;
        break;
      case 5: // h小时m分钟
        result = `${format(hours)}小时${format(minutes)}分钟`;
        break;
      case 6: // 2017年08月29日
        result = `${year}年${format(month)}月${format(day)}日`;
        break;
      default:
        result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}`;
        break;
    };
    return result;
  }
};

const install = Vue => {
  if (!isType(globalFilters, 'Object')) {
    return;
  }

  const keys = Object.keys(globalFilters);

  if (!isType(keys, 'Array') || !keys.length) {
    return;
  }

  keys.forEach(key => Vue.filter(key, globalFilters[key]));
};

export const filters = {
  install
};
