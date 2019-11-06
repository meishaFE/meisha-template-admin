export default [
  {
    path: '/module_A_1',
    component: () => import('@/views/module-A'),
    name: 'module-A',
    meta: {
      activeSrc: '/module_A_1'
    },
    children: []
  }
];
