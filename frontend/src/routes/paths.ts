// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    chart_of_day: `${ROOTS.DASHBOARD}/chart_of_day`,
    videos: `${ROOTS.DASHBOARD}/videos`,
    usax: `${ROOTS.DASHBOARD}/usax`,
    quizes: `${ROOTS.DASHBOARD}/quizes`,
    admin_videos: `${ROOTS.DASHBOARD}/admin_videos`,
    news: `${ROOTS.DASHBOARD}/news`,
    stocks: `${ROOTS.DASHBOARD}/stocks`,
    learn: `${ROOTS.DASHBOARD}/learn`,
    community: `${ROOTS.DASHBOARD}/community`,
    quotes: `${ROOTS.DASHBOARD}/quotes`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
  },
};
