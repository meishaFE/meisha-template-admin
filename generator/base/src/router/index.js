import Vue from 'vue';
import Router from 'vue-router';

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
        {
          path: '/demo',
          component: () => import('@/views/demo/home'),
          children: [{
            path: '/demo/test',
            name: 'Test',
            meta: {
              activeSrc: '/demo/test',
              keepAlive: true
            },
            component: () => import('@/views/demo/test')
          }]
        }
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
