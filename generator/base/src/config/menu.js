export const MENU_CONFIG = [
  {
    title: 'DEMO',
    icon: 'message', // 将会自动生成类`icon-message`，需要在iconfont.scss设置字体unicode配合使用，若不设置则有默认图标 
    index: '/demo/test'
  },
  {
    title: '导航一',
    index: '1',
    icon: 'setting',
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
    index: '2'
  },
  {
    title: '导航三',
    index: '3'
  }
];
