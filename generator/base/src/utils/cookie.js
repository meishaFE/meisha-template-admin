export const getCookie = (name) => {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  let arr = document.cookie.match(reg);
  if (arr) {
    return unescape(arr[2]);
  } else {
    return null;
  }
};

export const delCookie = (name,path = '/',domain = '.meishakeji.com') => {
  setCookie(name,'',-24,path,domain);
};

// export const setCookie = (name, value, hours, path, domain) => {
//   let cookie = [];
//   cookie.push(name + '=' + escape(value));
//   if (hours) {
//     let exp = new Date();
//     exp.setTime(exp.getTime() + hours * 60 * 60 * 1000);
//     cookie.push('expires=' + exp.toGMTString());
//   };
//   if (path) {
//     cookie.push('path=' + path);
//   };
//   if (domain) {
//     cookie.push('domain=' + domain);
//   };
//   document.cookie = cookie.join(';');
// };

export const setCookie = (name, value, hours, path, domain) => {
  let cookie = [];
  // set value
  cookie.push(name + '=' + escape(value));
  // set expires time
  if (hours) {
    let exp = new Date();
    exp.setTime(exp.getTime() + hours * 60 * 60 * 1000);
    cookie.push('expires=' + exp.toGMTString());
  };
  path = path || '/';
  // set path
  cookie.push('path=' + path);
  // set domain
  if (domain) {
    cookie.push('domain=' + domain);
  };
  document.cookie = cookie.join(';');
};

export const $cookie = {
  getCookie,
  setCookie,
  delCookie
};
