export const MENU_CONFIG = [
  {
    title: '导航一',
    // 将会自动生成类`icon-message`，需要在iconfont.scss设置字体unicode配合使用，若不设置则有默认图标
    icon: 'iconfont icon-liebiao',
    index: '/module_A_1'
  },
  {
    title: '导航二',
    icon: 'iconfont icon-liebiao',
    index: '/module_B',
    children: [
      {
        title: '选项1',
        index: '/module_B_1'
      }, {
        title: '选项2',
        index: '/module_B_2'
      }, {
        title: '选项3',
        index: '/module_B_3'
      }
    ]
  },
  {
    title: '导航二',
    icon: 'iconfont icon-liebiao',
    index: '/module_C_1'
  }
];
