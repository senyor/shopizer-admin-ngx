import { MenuItem } from './menu-item';

const IsAccessToOrder = () => {
  return (JSON.parse(localStorage.getItem('roles'))).canAccessToOrder;
};

const IsSuperadmin = () => {
  return (JSON.parse(localStorage.getItem('roles'))).isSuperadmin;
};

const IsAdmin = () => {
  return (JSON.parse(localStorage.getItem('roles'))).isAdmin;
};

const IsAdminRetail = () => {
  return (JSON.parse(localStorage.getItem('roles'))).isAdminRetail;
};

const IsAdminStore = () => {
  return (JSON.parse(localStorage.getItem('roles'))).isAdminStore;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'sideNav.home',
    key: 'sideNav.home',
    icon: 'fas fa-home',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'sideNav.user',
    key: 'sideNav.user',
    icon: 'fas fa-user-circle',
    children: [
      {
        title: 'sideNav.myProfile',
        key: 'sideNav.myProfile',
        link: '/pages/user-management/profile',
        hidden: false
      },
      {
        title: 'sideNav.changePassword',
        key: 'sideNav.changePassword',
        link: '/pages/user-management/change-password',
        hidden: false
      },
      {
        title: 'sideNav.createUser',
        key: 'sideNav.createUser',
        link: '/pages/user-management/create-user',
        hidden: false
      },
      {
        title: 'sideNav.userList',
        key: 'sideNav.userList',
        link: '/pages/user-management/users',
        hidden: false
      },
    ],
  },
  {
    title: 'sideNav.store',
    key: 'sideNav.store',
    icon: 'fas fa-building',
    link: '',
    hidden: false,
    children: [
      {
        title: 'sideNav.retailer',
        key: 'sideNav.retailer',
        link: '/pages/store-management/retailer',
        hidden: false,
        guards: [IsSuperadmin, IsAdmin, IsAdminRetail]
      },
      {
        title: 'sideNav.retailerList',
        key: 'sideNav.retailerList',
        link: '/pages/store-management/retailer-list',
        hidden: false,
        guards: [IsSuperadmin, IsAdmin]
      },
      {
        title: 'sideNav.createRetailer',
        key: 'sideNav.createRetailer',
        link: '/pages/store-management/create-retailer',
        hidden: false,
        guards: [IsSuperadmin, IsAdmin]
      },
      {
        title: 'sideNav.storeDetails',
        key: 'sideNav.storeDetails',
        link: '/pages/store-management/store-details',
        hidden: false,
        guards: [IsSuperadmin, IsAdmin, IsAdminRetail, IsAdminStore]
      },
      {
        title: 'sideNav.createStore',
        key: 'sideNav.createStore',
        link: '/pages/store-management/create-store',
        hidden: false,
        guards: [IsSuperadmin, IsAdmin, IsAdminRetail]
      },
      {
        title: 'sideNav.storesList',
        key: 'sideNav.storesList',
        link: '/pages/store-management/stores-list',
        hidden: false,
        guards: [IsSuperadmin, IsAdmin]
      },
    ],
  },
  {
    title: 'sideNav.catalogue',
    key: 'sideNav.catalogue',
    icon: 'fas fa-tags',
    hidden: false,
    children: [
      {
        title: 'sideNav.categories',
        key: 'sideNav.categories',
        hidden: false,
        children: [
          {
            title: 'sideNav.createCategory',
            key: 'sideNav.createCategory',
            link: '/pages/catalogue/categories/create-category',
            hidden: false
          },
          {
            title: 'sideNav.categoriesList',
            key: 'sideNav.categoriesList',
            link: '/pages/catalogue/categories/categories-list',
            hidden: false
          },
          {
            title: 'sideNav.categoriesHierarchy',
            key: 'sideNav.categoriesHierarchy',
            link: '/pages/catalogue/categories/categories-hierarchy',
            hidden: false
          },
        ],
      },
      {
        title: 'sideNav.products',
        key: 'sideNav.products',
        hidden: false,
        children: [
          {
            title: 'sideNav.createProduct',
            key: 'sideNav.createProduct',
            link: '/pages/catalogue/products/create-product',
            hidden: false
          },
          {
            title: 'sideNav.productsList',
            key: 'sideNav.productsList',
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
    key: 'sideNav.orders',
    icon: 'fas fa-shopping-cart',
    link: '/pages/orders',
    pathMatch: 'prefix',
    hidden: false,
    guards: [IsAccessToOrder]
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
