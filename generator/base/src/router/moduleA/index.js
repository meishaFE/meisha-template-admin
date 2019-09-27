export default [
  {
    path: '/module_A_1',
    component: () => import('@/views/module_A_1'),
    name: 'module1',
    meta: {
      activeSrc: '/module_A_1'
    },
    children: []
  }, {
    path: '/module_A_2',
    component: () => import('@/views/module_A_2'),
    name: 'module2',
    meta: {
      activeSrc: '/module_A_1'
    }
  }
];