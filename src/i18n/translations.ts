// Centralized translation keys for the application
export const translationKeys = {
  // Navigation
  home: 'home',
  deals: 'deals',
  about: 'about',
  contact: 'contact',
  categories: 'categories',
  
  // Auth
  signIn: 'signIn',
  signUp: 'signUp',
  logout: 'logout',
  emailAddress: 'emailAddress',
  password: 'password',
  forgotPassword: 'forgotPassword',
  register: 'register',
  loginAction: 'loginAction',
  fullName: 'fullName',
  rememberMe: 'rememberMe',
  
  // Admin
  adminDashboard: 'adminDashboard',
  manageContent: 'manageContent',
  viewSite: 'viewSite',
  posts: 'posts',
  categoriesAdmin: 'categoriesAdmin',
  createPost: 'createPost',
  editPost: 'editPost',
  
  // Settings
  settings: 'settings',
  appearance: 'appearance',
  languageSetting: 'languageSetting',
  notifications: 'notifications',
  
  // Actions
  search: 'search',
  save: 'save',
  cancel: 'cancel',
  deleteAction: 'deleteAction',
  editAction: 'editAction',
  loading: 'loading',
} as const;

export type TranslationKey = typeof translationKeys[keyof typeof translationKeys];
