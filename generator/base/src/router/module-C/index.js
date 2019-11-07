export default [
  {
    path: '/module_C_1',
    component: () => import('@/views/module-C'),
    name: 'module-C',
    meta: {
      activeSrc: '/module_C_1'
    },
    children: []
  }
];
