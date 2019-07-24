const toString = Object.prototype.toString;
/**
 * 判断val是否为type类型的值
 * @param val
 * @param type 可能的值为Function, Object, Array, Number, String, RegExp, Null, Undefined, Boolean, Symbol, Date等
 * @returns {boolean}
 */
export const isType = (val, type) => {
  if (!type) {
    return false;
  }
  if (type === 'Number' && Number.isNaN(val)) {
    return false;
  }
  return (toString.call(val).replace(/.*\s(.*)]$/, '$1').toLowerCase() === type.toLowerCase());
};

/**
* 获取val的类型
* @param val
* @returns {string}
*/
export const getType = (val) => (Number.isNaN(val)
  ? 'NaN'
  : toString.call(val).replace(/.*\s(.*)]$/, '$1'));

export const $type = {
  getType,
  isType
};
