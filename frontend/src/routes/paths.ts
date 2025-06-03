// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
  TEMP: '/temp',
};

// ----------------------------------------------------------------------

export const paths = {
  home: '/',
  page403: '/403',
  page404: '/404',
  page500: '/500',
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
  },
  temp: {
    home: `${ROOTS.TEMP}/home`,
    assign: `${ROOTS.TEMP}/assign`,
    scope: `${ROOTS.TEMP}/scope`,
    methodology: `${ROOTS.TEMP}/methodology`,
    quntity_of_hours: `${ROOTS.TEMP}/quntity_of_hours`,
    distribution_of_hours: `${ROOTS.TEMP}/distribution_of_hours`,
    labor_costs: `${ROOTS.TEMP}/labor_costs`,
    distribution_of_labor: `${ROOTS.TEMP}/distribution_of_labor`,
    material: `${ROOTS.TEMP}/material`,
    travel: `${ROOTS.TEMP}/travel`,
  },
};
