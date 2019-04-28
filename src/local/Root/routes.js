export const languages = {
  english: 'English',
  español: 'Español',
};

export const i18nRoutes = {
  home: {
    match (location) {
      console.log(location);
      return /^\/[^/]+\/h\/?$/.test(location.pathname);
    }
  },
  about: {
    match (location) {
      return /^\/[^/]+\/a\/?$/.test(location.pathname);
    }
  },
  contact: {
    match (location) {
      return /^\/[^/]+\/c\/?$/.test(location.pathname);
    }
  },
  notFound: {
    match (location) {
      return /^\/[^/]+\/404\/?$/.test(location.pathname);
    }
  },
};
