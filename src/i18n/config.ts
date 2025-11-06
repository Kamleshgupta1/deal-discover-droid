import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      deals: 'Deals',
      about: 'About',
      contact: 'Contact',
      categories: 'Categories',
      
      // Auth
      signIn: 'Sign In',
      signUp: 'Sign Up',
      logout: 'Logout',
      emailAddress: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      register: 'Register',
      loginAction: 'Login',
      fullName: 'Full Name',
      
      // Admin
      adminDashboard: 'Admin Dashboard',
      manageContent: 'Manage your content',
      viewSite: 'View Site',
      posts: 'Posts',
      categoriesAdmin: 'Categories',
      createPost: 'Create Post',
      editPost: 'Edit Post',
      
      // Settings
      settings: 'Settings',
      appearance: 'Appearance',
      languageSetting: 'Language',
      notifications: 'Notifications',
      
      // Common
      search: 'Search',
      save: 'Save',
      cancel: 'Cancel',
      deleteAction: 'Delete',
      editAction: 'Edit',
      loading: 'Loading...',
    }
  },
  es: {
    translation: {
      // Navigation
      home: 'Inicio',
      deals: 'Ofertas',
      about: 'Acerca de',
      contact: 'Contacto',
      categories: 'Categorías',
      
      // Auth
      signIn: 'Iniciar Sesión',
      signUp: 'Registrarse',
      logout: 'Cerrar Sesión',
      emailAddress: 'Correo Electrónico',
      password: 'Contraseña',
      forgotPassword: '¿Olvidaste tu contraseña?',
      register: 'Registrarse',
      loginAction: 'Iniciar Sesión',
      fullName: 'Nombre Completo',
      
      // Admin
      adminDashboard: 'Panel de Administración',
      manageContent: 'Administrar contenido',
      viewSite: 'Ver Sitio',
      posts: 'Publicaciones',
      categoriesAdmin: 'Categorías',
      createPost: 'Crear Publicación',
      editPost: 'Editar Publicación',
      
      // Settings
      settings: 'Configuración',
      appearance: 'Apariencia',
      languageSetting: 'Idioma',
      notifications: 'Notificaciones',
      
      // Common
      search: 'Buscar',
      save: 'Guardar',
      cancel: 'Cancelar',
      deleteAction: 'Eliminar',
      editAction: 'Editar',
      loading: 'Cargando...',
    }
  },
  fr: {
    translation: {
      // Navigation
      home: 'Accueil',
      deals: 'Offres',
      about: 'À propos',
      contact: 'Contact',
      categories: 'Catégories',
      
      // Auth
      signIn: 'Se connecter',
      signUp: "S'inscrire",
      logout: 'Déconnexion',
      emailAddress: 'E-mail',
      password: 'Mot de passe',
      forgotPassword: 'Mot de passe oublié?',
      register: "S'inscrire",
      loginAction: 'Connexion',
      fullName: 'Nom Complet',
      
      // Admin
      adminDashboard: "Tableau de bord d'administration",
      manageContent: 'Gérer votre contenu',
      viewSite: 'Voir le site',
      posts: 'Publications',
      categoriesAdmin: 'Catégories',
      createPost: 'Créer une publication',
      editPost: 'Modifier la publication',
      
      // Settings
      settings: 'Paramètres',
      appearance: 'Apparence',
      languageSetting: 'Langue',
      notifications: 'Notifications',
      
      // Common
      search: 'Rechercher',
      save: 'Enregistrer',
      cancel: 'Annuler',
      deleteAction: 'Supprimer',
      editAction: 'Modifier',
      loading: 'Chargement...',
    }
  },
  de: {
    translation: {
      // Navigation
      home: 'Startseite',
      deals: 'Angebote',
      about: 'Über uns',
      contact: 'Kontakt',
      categories: 'Kategorien',
      
      // Auth
      signIn: 'Anmelden',
      signUp: 'Registrieren',
      logout: 'Abmelden',
      emailAddress: 'E-Mail',
      password: 'Passwort',
      forgotPassword: 'Passwort vergessen?',
      register: 'Registrieren',
      loginAction: 'Anmelden',
      fullName: 'Vollständiger Name',
      
      // Admin
      adminDashboard: 'Admin-Dashboard',
      manageContent: 'Verwalten Sie Ihre Inhalte',
      viewSite: 'Website ansehen',
      posts: 'Beiträge',
      categoriesAdmin: 'Kategorien',
      createPost: 'Beitrag erstellen',
      editPost: 'Beitrag bearbeiten',
      
      // Settings
      settings: 'Einstellungen',
      appearance: 'Erscheinungsbild',
      languageSetting: 'Sprache',
      notifications: 'Benachrichtigungen',
      
      // Common
      search: 'Suchen',
      save: 'Speichern',
      cancel: 'Abbrechen',
      deleteAction: 'Löschen',
      editAction: 'Bearbeiten',
      loading: 'Lädt...',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
