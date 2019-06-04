import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'sideNav.home',
    icon: 'fas fa-home',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'sideNav.user',
    icon: 'fas fa-user-circle',
    link: '/pages/home',
    children: [
      {
        title: 'sideNav.myProfile',
        link: '',
      },
      {
        title: 'sideNav.changePassword',
        link: '',
      },
      {
        title: 'sideNav.createUser',
        link: '',
      },
      {
        title: 'sideNav.userList',
        link: '',
      },
    ],
  },
  // {
  //   title: 'Store',
  //   // icon: 'fas fa-shopping-cart',
  //   link: '',
  // },
  // {
  //   title: 'Catalogue',
  //   // icon: 'fas fa-shopping-cart',
  //   link: '',
  // },
  // {
  //   title: 'Manage content',
  //   // icon: 'fas fa-shopping-cart',
  //   link: '',
  // },
  // {
  //   title: 'Shipping',
  //   // icon: 'fas fa-shopping-cart',
  //   link: '',
  // },
  // {
  //   title: 'Payment',
  //   // icon: 'fas fa-shopping-cart',
  //   link: '',
  // },
  // {
  //   title: 'Customers',
  //   // icon: 'fas fa-shopping-cart',
  //   link: '',
  // },
  {
    title: 'sideNav.orders',
    icon: 'fas fa-shopping-cart',
    link: '/pages/orders',
    pathMatch: 'prefix'
  },
  // {
  //   title: 'Manage taxes',
  //   // icon: 'fas fa-shopping-cart',
  //   link: '',
  // },
  // {
  //   title: 'Cache management',
  //   // icon: 'fas fa-shopping-cart',
  //   link: '',
  // },
  // {
  //   title: 'Security',
  //   // icon: 'fas fa-shopping-cart',
  //   link: '',
  // },
  // {
  //   title: 'Configurations',
  //   // icon: 'fas fa-shopping-cart',
  //   link: '',
  // },
];
