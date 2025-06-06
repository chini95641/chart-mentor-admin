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
    home: {
      root: ROOTS.DASHBOARD,
      list: `${ROOTS.DASHBOARD}/list`,
    },
    root: ROOTS.DASHBOARD,
    chart_of_day: {
      root: `${ROOTS.DASHBOARD}/chart_of_day`,
      list: `${ROOTS.DASHBOARD}/chart_of_day/list`,
    },
    videos: `${ROOTS.DASHBOARD}/videos`,
    usax: `${ROOTS.DASHBOARD}/usax`,
    quizes: `${ROOTS.DASHBOARD}/quizes`,
    admin_videos: `${ROOTS.DASHBOARD}/admin_videos`,
    news: `${ROOTS.DASHBOARD}/news`,
    stocks: `${ROOTS.DASHBOARD}/stocks`,
    learn: `${ROOTS.DASHBOARD}/learn`,
    commodity: `${ROOTS.DASHBOARD}/commodity`,
    quotes: `${ROOTS.DASHBOARD}/quotes`,
    role: `${ROOTS.DASHBOARD}/role`,
    index_insights: `${ROOTS.DASHBOARD}/index_insights`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
  },
};
