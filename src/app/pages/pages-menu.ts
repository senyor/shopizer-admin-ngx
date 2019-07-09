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
    children: [
      {
        title: 'sideNav.myProfile',
        link: '/pages/user-management/profile',
      },
      {
        title: 'sideNav.changePassword',
        link: '/pages/user-management/change-password',
      },
      {
        title: 'sideNav.createUser',
        link: '/pages/user-management/create-user',
      },
      {
        title: 'sideNav.userList',
        link: '/pages/user-management/users',
      },
    ],
  },
  {
    title: 'sideNav.store',
    icon: 'fas fa-building',
    link: '',
    children: [
      {
        title: 'sideNav.storeDetails',
        link: '/pages/store-management/store-details',
      },
      {
        title: 'sideNav.createStore',
        link: '/pages/store-management/create-store',
      },
      {
        title: 'sideNav.storesList',
        link: '/pages/store-management/stores-list',
      },
    ],
  },
  {
    title: 'sideNav.catalogue',
    icon: 'fas fa-tags',
    children: [
      {
        title: 'sideNav.categories',
        children: [
          {
            title: 'sideNav.createCategory',
            link: '/pages/catalogue/categories/create-category',
          },
          {
            title: 'sideNav.categoriesList',
            link: '/pages/catalogue/categories/categories-list',
          },
          {
            title: 'sideNav.categoriesHierarchy',
            link: '/pages/catalogue/categories/categories-hierarchy',
          },
        ],
      },
      {
        title: 'sideNav.products',
        children: [
          {
            title: 'sideNav.createProduct',
            link: '/pages/catalogue/products/create-product',
          },
          {
            title: 'sideNav.productsList',
            link: '/pages/catalogue/products/products-list',
          },
        ],
      },
      // {
      //   title: 'Options',
      //   // link: '/pages/store-management/stores-list',
      // },
      // {
      //   title: 'Products group',
      //   // link: '/pages/store-management/stores-list',
      // },
      // {
      //   title: 'List of manufactures',
      //   // link: '/pages/store-management/stores-list',
      // },
    ],
  },
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
