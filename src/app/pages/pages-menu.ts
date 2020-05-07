import { MenuItem } from './menu-item';
import { environment } from '../../environments/environment';

/**
 * Security
 * superadmin
 * adminretail
 * admin
 * other admins
 */

const IsAccessToOrder = () => {
  return (JSON.parse(localStorage.getItem('roles'))).canAccessToOrder;
};

const IsSuperadmin = () => {
  return (JSON.parse(localStorage.getItem('roles'))).isSuperadmin;
};

const IsAdmin = () => {
  //return (JSON.parse(localStorage.getItem('roles'))).isAdmin;
  if(
    (JSON.parse(localStorage.getItem('roles'))).isSuperadmin ||
    (JSON.parse(localStorage.getItem('roles'))).isAdmin ||
    (JSON.parse(localStorage.getItem('roles'))).isAdminRetail
  ) {
    return true;
  } else  {
    return false;
  }
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

const isCategoryManagementVisible = () => {

  if('MARKETPLACE' === environment.mode) {
    if(IsSuperadmin()) {
      return true;
    }
  } else {//B2C
    if(IsAdminRetail()) {
      return true;
    }
 }

}

const IsAdminRetail = () => {
  if(
    (JSON.parse(localStorage.getItem('roles'))).isSuperadmin ||
    (JSON.parse(localStorage.getItem('roles'))).isAdminRetail
  ) {
    return true;
  } else  {
    return false;
  }
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
        hidden: false,
        guards: [IsAdmin]
      },
      {
        title: 'COMPONENTS.USER_LIST',
        key: 'COMPONENTS.USER_LIST',
        link: '/pages/user-management/users',
        hidden: false,
        guards: [IsAdmin]
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
        title: 'COMPONENTS.STORE',
        key: 'COMPONENTS.STORE',
        link: '/pages/store-management/store',
        hidden: false,
        guards: [IsSuperadmin, IsAdmin, IsAdminRetail, IsAdminStore]
      },
      {
        title: 'COMPONENTS.STORES_LIST',
        key: 'COMPONENTS.STORES_LIST',
        link: '/pages/store-management/stores-list',
        hidden: false,
        guards: [IsAdmin]
      },
      {
        title: 'COMPONENTS.CREATE_STORE',
        key: 'COMPONENTS.CREATE_STORE',
        link: '/pages/store-management/create-store',
        hidden: false,
        guards: [IsSuperadmin, IsAdminRetail]
      }
    ],
  },
  {
    title: 'COMPONENTS.CATALOGUE',
    key: 'COMPONENTS.CATALOGUE',
    icon: 'fas fa-tags',
    hidden: false,
    guards: [IsAdminRetail],
    children: [
      {
        title: 'COMPONENTS.CATEGORIES',
        key: 'COMPONENTS.CATEGORIES',
        hidden: false,
        guards: [isCategoryManagementVisible],
        children: [
          {
            title: 'COMPONENTS.CATEGORIES_LIST',
            key: 'COMPONENTS.CATEGORIES_LIST',
            link: '/pages/catalogue/categories/categories-list',
            guards: [isCategoryManagementVisible],
            hidden: false,
          },
          {
            title: 'COMPONENTS.CREATE_CATEGORY',
            key: 'COMPONENTS.CREATE_CATEGORY',
            link: '/pages/catalogue/categories/create-category',
            hidden: false,
            guards: [isCategoryManagementVisible],
          },
          {
            title: 'COMPONENTS.CATEGORIES_HIERARCHY',
            key: 'COMPONENTS.CATEGORIES_HIERARCHY',
            link: '/pages/catalogue/categories/categories-hierarchy',
            hidden: false,
            guards: [isCategoryManagementVisible],
          },
        ],
      },
      {
        title: 'COMPONENTS.PRODUCTS',
        key: 'COMPONENTS.PRODUCTS',
        hidden: false,
        guards: [IsSuperadmin, IsAdmin, IsAdminRetail, IsAdminCatalogue],
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
          {
             title: 'COMPONENTS.MANAGE_INVENTORY',
             key: 'COMPONENTS.MANAGE_INVENTORY',
             link: '/pages/catalogue/products/manage-inventory',
             hidden: false
           },
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
      {
        title: 'COMPONENTS.OPTIONS',
        key: 'COMPONENTS.OPTIONS',
        hidden: false,
        children: [
          {
            title: 'COMPONENTS.OPTIONS_LIST',
            key: 'COMPONENTS.OPTIONS_LIST',
            link: '/pages/catalogue/options/options-list',
            hidden: false
          },
          // {
          //   title: 'COMPONENTS.CREATE_OPTION',
          //   key: 'COMPONENTS.CREATE_OPTION',
          //   link: '/pages/catalogue/options/create-option',
          //   hidden: false
          // },
          {
            title: 'COMPONENTS.OPTIONS_VALUES_LIST',
            key: 'COMPONENTS.OPTIONS_VALUES_LIST',
            link: '/pages/catalogue/options/options-values-list',
            hidden: false
          },
          // {
          //   title: 'COMPONENTS.CREATE_OPTION_VALUE',
          //   key: 'COMPONENTS.CREATE_OPTION_VALUE',
          //   link: '/pages/catalogue/options/create-option-value',
          //   hidden: false
          // },
        ],
      },
    ],
  },
  {
    title: 'COMPONENTS.CONTENT',
    key: 'COMPONENTS.CONTENT',
    icon: 'fas fa-edit',
    children: [
      {
        title: 'COMPONENTS.CONTENT_PAGES',
        key: 'COMPONENTS.CONTENT_PAGES',
        link: '/pages/content/pages/list',
      },
      {
        title: 'COMPONENTS.CONTENT_BOXES',
        key: 'COMPONENTS.CONTENT_BOXES',
        link: '/pages/content/boxes/list',
      },
      {
        title: 'COMPONENTS.CONTENT_IMAGES',
        key: 'COMPONENTS.CONTENT_IMAGES',
        link: '/pages/content/images/list',
      },
      {
        title: 'COMPONENTS.CONTENT_FILES',
        key: 'COMPONENTS.CONTENT_FILES',
        link: '/pages/content/files/list',
      },
      // {
      //   title: 'Promotion',
      //   key: 'sideNav.managecontent',
      //   link: '/pages/content/promotion',
      //   // link: '/pages/forms/datepicker',
      // },
    ],
  },
  {
    title: 'Shipping',
    key: 'sideNav.shipping',
    icon: 'fas fa-truck',
    children: [
      {
        title: 'Configuration',
        key: 'sideNav.configuration',
        link: '/pages/shipping/config',
      },
      {
        title: 'Methods',
        key: 'sideNav.methods',
        link: '/pages/content/promotion',
      },
      {
        title: 'Origin',
        key: 'sideNav.origin',
        link: '/pages/shipping/config',
      },
      // {
      //   title: 'Options',
      //   key: 'sideNav.options',
      //   link: '/pages/shipping/config',
      // },
      // {
      //   title: 'Packaging',
      //   key: 'sideNav.packaging',
      //   link: '/pages/shipping/config',
      // }
    ]
  },
  // {
  //   title: 'Payment',
  //   // icon: 'fas fa-shopping-cart',
  //   link: '',
  // },
  {
    title: 'Customers',
    key: 'sideNav.customers',
    icon: 'fas fa-users',
    children: [
      {
        title: 'Customer List',
        key: 'sideNav.customerList',
        link: '/pages/customer/list',
      },
      {
        title: 'Options',
        key: 'sideNav.options',
        link: '/pages/customer/option/list',
      },
      {
        title: 'Options Value',
        key: 'sideNav.optionValue',
        link: '/pages/customer/value/list',
      },
      {
        title: 'Manage Options',
        key: 'sideNav.manageoptions',
        link: '/pages/customer/manage/list',
      }
    ]
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
