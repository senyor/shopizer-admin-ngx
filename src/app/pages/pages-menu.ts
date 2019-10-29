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

const IsAdminCatalogue = () => {
  return (JSON.parse(localStorage.getItem('roles'))).isAdminCatalogue;
};

const IsAdminStore = () => {
  return (JSON.parse(localStorage.getItem('roles'))).isAdminStore;
};

const IsAdminOrder = () => {
  return (JSON.parse(localStorage.getItem('roles'))).isAdminOrder;
};

const IsAdminContent = () => {
  return (JSON.parse(localStorage.getItem('roles'))).isAdminContent;
};

const IsCustomer = () => {
  return (JSON.parse(localStorage.getItem('roles'))).isCustomer;
};

const IsAdminRetail = () => {
  return (JSON.parse(localStorage.getItem('roles'))).isAdminRetail;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'COMPONENTS.HOME',
    key: 'COMPONENTS.HOME',
    icon: 'fas fa-home',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'COMPONENTS.USER',
    key: 'COMPONENTS.USER',
    icon: 'fas fa-user-circle',
    children: [
      {
        title: 'COMPONENTS.MY_PROFILE',
        key: 'COMPONENTS.MY_PROFILE',
        link: '/pages/user-management/profile',
        hidden: false
      },
      {
        title: 'COMPONENTS.CHANGE_PASSWORD',
        key: 'COMPONENTS.CHANGE_PASSWORD',
        link: '/pages/user-management/change-password',
        hidden: false
      },
      {
        title: 'COMPONENTS.CREATE_USER',
        key: 'COMPONENTS.CREATE_USER',
        link: '/pages/user-management/create-user',
        hidden: false
      },
      {
        title: 'COMPONENTS.USER_LIST',
        key: 'COMPONENTS.USER_LIST',
        link: '/pages/user-management/users',
        hidden: false
      },
    ],
  },
  {
    title: 'COMPONENTS.STORE',
    key: 'COMPONENTS.STORE',
    icon: 'fas fa-building',
    link: '',
    hidden: false,
    guards: [IsSuperadmin, IsAdmin, IsAdminRetail, IsAdminStore],
    children: [
      {
        title: 'COMPONENTS.RETAILER',
        key: 'COMPONENTS.RETAILER',
        link: '/pages/store-management/retailer',
        hidden: false,
        guards: [IsSuperadmin, IsAdmin, IsAdminRetail]
      },
      {
        title: 'COMPONENTS.RETAILER_LIST',
        key: 'COMPONENTS.RETAILER_LIST',
        link: '/pages/store-management/retailer-list',
        hidden: false,
        guards: [IsSuperadmin, IsAdmin]
      },
      {
        title: 'COMPONENTS.CREATE_RETAILER',
        key: 'COMPONENTS.CREATE_RETAILER',
        link: '/pages/store-management/create-retailer',
        hidden: false,
        guards: [IsSuperadmin, IsAdmin]
      },
      {
        title: 'COMPONENTS.STORE_DETAILS',
        key: 'COMPONENTS.STORE_DETAILS',
        link: '/pages/store-management/store-details',
        hidden: false,
        guards: [IsSuperadmin, IsAdmin, IsAdminRetail, IsAdminStore]
      },
      {
        title: 'COMPONENTS.CREATE_STORE',
        key: 'COMPONENTS.CREATE_STORE',
        link: '/pages/store-management/create-store',
        hidden: false,
        guards: [IsSuperadmin, IsAdmin, IsAdminRetail]
      },
      {
        title: 'COMPONENTS.STORES_LIST',
        key: 'COMPONENTS.STORES_LIST',
        link: '/pages/store-management/stores-list',
        hidden: false,
        guards: [IsSuperadmin, IsAdmin]
      },
    ],
  },
  {
    title: 'COMPONENTS.CATALOGUE',
    key: 'COMPONENTS.CATALOGUE',
    icon: 'fas fa-tags',
    hidden: false,
    guards: [IsSuperadmin, IsAdminRetail, IsAdminStore, IsAdminCatalogue],
    children: [
      {
        title: 'COMPONENTS.CATEGORIES',
        key: 'COMPONENTS.CATEGORIES',
        hidden: false,
        children: [
          {
            title: 'COMPONENTS.CREATE_CATEGORY',
            key: 'COMPONENTS.CREATE_CATEGORY',
            link: '/pages/catalogue/categories/create-category',
            hidden: false
          },
          {
            title: 'COMPONENTS.CATEGORIES_LIST',
            key: 'COMPONENTS.CATEGORIES_LIST',
            link: '/pages/catalogue/categories/categories-list',
            hidden: false
          },
          {
            title: 'COMPONENTS.CATEGORIES_HIERARCHY',
            key: 'COMPONENTS.CATEGORIES_HIERARCHY',
            link: '/pages/catalogue/categories/categories-hierarchy',
            hidden: false
          },
        ],
      },
      {
        title: 'COMPONENTS.PRODUCTS',
        key: 'COMPONENTS.PRODUCTS',
        hidden: false,
        children: [
          {
            title: 'COMPONENTS.CREATE_PRODUCT',
            key: 'COMPONENTS.CREATE_PRODUCT',
            link: '/pages/catalogue/products/create-product',
            hidden: false
          },
          {
            title: 'COMPONENTS.PRODUCTS_LIST',
            key: 'COMPONENTS.PRODUCTS_LIST',
            link: '/pages/catalogue/products/products-list',
            hidden: false
          },
          // {
          //   title: 'COMPONENTS.MANAGE_INVENTORY',
          //   key: 'COMPONENTS.MANAGE_INVENTORY',
          //   link: '/pages/catalogue/products/manage-inventory',
          //   hidden: false
          // },
        ],
      },
      {
        title: 'COMPONENTS.BRANDS',
        key: 'COMPONENTS.BRANDS',
        hidden: false,
        children: [
          {
            title: 'COMPONENTS.CREATE_BRAND',
            key: 'COMPONENTS.CREATE_BRAND',
            link: '/pages/catalogue/brands/create-brand',
            hidden: false
          },
          {
            title: 'COMPONENTS.BRANDS_LIST',
            key: 'COMPONENTS.BRANDS_LIST',
            link: '/pages/catalogue/brands/brands-list',
            hidden: false
          },
        ],
      },
      {
        title: 'COMPONENTS.CATALOGUES',
        key: 'COMPONENTS.CATALOGUES',
        hidden: false,
        children: [
          {
            title: 'COMPONENTS.CREATE_CATALOGUE',
            key: 'COMPONENTS.CREATE_CATALOGUE',
            link: '/pages/catalogue/catalogues/create-catalogue',
            hidden: false
          },
          {
            title: 'COMPONENTS.CATALOGUES_LIST',
            key: 'COMPONENTS.CATALOGUES_LIST',
            link: '/pages/catalogue/catalogues/catalogues-list',
            hidden: false
          },
        ],
      },
      {
        title: 'COMPONENTS.PRODUCTS_GROUPS',
        key: 'COMPONENTS.PRODUCTS_GROUPS',
        hidden: false,
        children: [
          {
            title: 'COMPONENTS.CREATE_PRODUCTS_GROUPS',
            key: 'COMPONENTS.CREATE_PRODUCTS_GROUPS',
            link: '/pages/catalogue/products-groups/create-products-group',
            hidden: false
          },
          {
            title: 'COMPONENTS.LIST_PRODUCTS_GROUPS',
            key: 'COMPONENTS.LIST_PRODUCTS_GROUPS',
            link: '/pages/catalogue/products-groups/products-groups-list',
            hidden: false
          },
          {
            title: 'COMPONENTS.PRODUCTS_GROUPS_LIST',
            key: 'COMPONENTS.PRODUCTS_GROUPS_LIST',
            link: '/pages/catalogue/products-groups/groups-list',
            hidden: false
          },
        ],
      },
    ],
  },
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
    title: 'COMPONENTS.ORDERS',
    key: 'COMPONENTS.ORDERS',
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
