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
        hidden: false
      },
      {
        title: 'sideNav.changePassword',
        link: '/pages/user-management/change-password',
        hidden: false
      },
      {
        title: 'sideNav.createUser',
        link: '/pages/user-management/create-user',
        hidden: false
      },
      {
        title: 'sideNav.userList',
        link: '/pages/user-management/users',
        hidden: false
      },
    ],
  },
  {
    title: 'sideNav.store',
    icon: 'fas fa-building',
    link: '',
    hidden: false,
    children: [
      {
        title: 'sideNav.retailer',
        link: '/pages/store-management/retailer',
        hidden: false
      },
      {
        title: 'sideNav.retailerList',
        link: '/pages/store-management/retailer-list',
        hidden: false
      },
      {
        title: 'sideNav.createRetailer',
        link: '/pages/store-management/create-retailer',
        hidden: false
      },
      {
        title: 'sideNav.storeDetails',
        link: '/pages/store-management/store-details',
        hidden: false
      },
      {
        title: 'sideNav.createStore',
        link: '/pages/store-management/create-store',
        hidden: false
      },
      {
        title: 'sideNav.storesList',
        link: '/pages/store-management/stores-list',
        hidden: false
      },
    ],
  },
  {
    title: 'sideNav.catalogue',
    icon: 'fas fa-tags',
    hidden: false,
    children: [
      {
        title: 'sideNav.categories',
        hidden: false,
        children: [
          {
            title: 'sideNav.createCategory',
            link: '/pages/catalogue/categories/create-category',
            hidden: false
          },
          {
            title: 'sideNav.categoriesList',
            link: '/pages/catalogue/categories/categories-list',
            hidden: false
          },
          {
            title: 'sideNav.categoriesHierarchy',
            link: '/pages/catalogue/categories/categories-hierarchy',
            hidden: false
          },
        ],
      },
      {
        title: 'sideNav.products',
        hidden: false,
        children: [
          {
            title: 'sideNav.createProduct',
            link: '/pages/catalogue/products/create-product',
            hidden: false
          },
          {
            title: 'sideNav.productsList',
            link: '/pages/catalogue/products/products-list',
            hidden: false
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
    pathMatch: 'prefix',
    hidden: false
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
