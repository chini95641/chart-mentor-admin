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
      root: `${ROOTS.DASHBOARD}/home`,
      list: `${ROOTS.DASHBOARD}/home/list`,
    },
    root: ROOTS.DASHBOARD,
    chart_of_day: {
      root: `${ROOTS.DASHBOARD}/chart_of_day`,
      list: `${ROOTS.DASHBOARD}/chart_of_day/list`,
    },
    videos: {
      root: `${ROOTS.DASHBOARD}/videos`,
      list: `${ROOTS.DASHBOARD}/videos/list`,
    },
    quizzes: {
      root: `${ROOTS.DASHBOARD}/quizes`,
      list: `${ROOTS.DASHBOARD}/quizes/list`,
      create: `${ROOTS.DASHBOARD}/quizes/create`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/quizes/${id}/edit`,
    },
    usax: `${ROOTS.DASHBOARD}/usax`,
    quizes: `${ROOTS.DASHBOARD}/quizes`,
    admin_videos: `${ROOTS.DASHBOARD}/admin_videos`,
    news: `${ROOTS.DASHBOARD}/news`,
    stocks: {
      root: `${ROOTS.DASHBOARD}/stocks`,
      create: `${ROOTS.DASHBOARD}/stocks/create`,
      list: `${ROOTS.DASHBOARD}/stocks/list`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/stocks/${id}/edit`,
    },
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
