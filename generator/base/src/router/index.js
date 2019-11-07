import Vue from 'vue';
import Router from 'vue-router';

import moduleA from './module-A';
import moduleB from './module-B';
import moduleC from './module-C';

const routerPush = Router.prototype.push;
Router.prototype.push = function (location) {
  return routerPush.call(this, location).catch(error => error);
};

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/home'),
      children: [
        {
          path: '',
          name: 'Welcome',
          component: () => import('@/views/welcome')
        },
        ...moduleA,
        ...moduleB,
        ...moduleC
      ]
    },
    {
      path: '/noLimit',
      name: 'noLimit',
      component: () => import('@/views/noLimit')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404')
    },
    { path: '/*', redirect: '/404' }
  ]
});
