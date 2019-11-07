export default [
  {
    path: '/module_A_1',
    component: () => import('@/views/demo/comp-demo'),
    name: 'module-A',
    meta: {
      activeSrc: '/module_A_1'
    },
    children: []
  }
];
