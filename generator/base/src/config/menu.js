export const MENU_CONFIG = [
  {
    title: 'DEMO',
    icon: 'message',
    index: '/demo/test'
  },
  {
    title: '导航一',
    index: '1',
    icon: 'message',
    children: [
      {
        title: '分组一',
        children: [
          {
            title: '选项1',
            index: '1-1'
          },
          {
            title: '选项2',
            index: '1-2'
          }
        ]
      },
      {
        title: '分组二',
        children: [
          {
            title: '选项3',
            index: '1-3'
          }
        ]
      }
    ]
  },
  {
    title: '导航二',
    index: '2',
    icon: 'message'
  },
  {
    title: '导航三',
    index: '3',
    icon: 'setting'
  }
];
