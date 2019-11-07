export default [
  {
    path: '/module_B_1',
    component: () => import('@/views/module-B'),
    name: 'module-B',
    meta: {
      activeSrc: '/module_B_1'
    },
    children: []
  }
];
