// 常用正则表达式
export const regPhone = /^(1\d{1,10})$/;
export const regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
export const regNum = /^(\d{1,2}(\.\d{0,1})?|100)$/;
export const $reg = {
  regPhone,
  regEmail,
  regNum
};
