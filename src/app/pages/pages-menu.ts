import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'fas fa-home',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'User',
    icon: 'fas fa-user-circle',
    link: '/pages/home',
    children: [
      {
        title: 'My profile',
        link: '', // goes into angular routerLink
      },
      {
        title: 'Change Password',
        link: '', // goes into angular routerLink
      },
      {
        title: 'Create user',
        link: '', // goes directly into href attribute
      },
      {
        title: 'Users list',
        link: '',
      },
    ],
  },
  {
    title: 'Store',
    // icon: 'fas fa-shopping-cart',
    link: '',
  },
  {
    title: 'Catalogue',
    // icon: 'fas fa-shopping-cart',
    link: '',
  },
  {
    title: 'Manage content',
    // icon: 'fas fa-shopping-cart',
    link: '',
  },
  {
    title: 'Shipping',
    // icon: 'fas fa-shopping-cart',
    link: '',
  },
  {
    title: 'Payment',
    // icon: 'fas fa-shopping-cart',
    link: '',
  },
  {
    title: 'Customers',
    // icon: 'fas fa-shopping-cart',
    link: '',
  },
  {
    title: 'Orders',
    icon: 'fas fa-shopping-cart',
    link: '/pages/orders',
    pathMatch: 'prefix'
  },

  {
    title: 'Manage taxes',
    // icon: 'fas fa-shopping-cart',
    link: '',
  },
  {
    title: 'Cache management',
    // icon: 'fas fa-shopping-cart',
    link: '',
  },
  {
    title: 'Security',
    // icon: 'fas fa-shopping-cart',
    link: '',
  },
  {
    title: 'Configurations',
    // icon: 'fas fa-shopping-cart',
    link: '',
  },
];
