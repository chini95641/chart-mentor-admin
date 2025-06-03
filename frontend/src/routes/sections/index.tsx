import { Navigate, useRoutes } from 'react-router-dom';

import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { dashboardRoutes } from './dashboard';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH HOME PAGE

    // Auth routes
    ...authRoutes,

    // Main routes
    ...mainRoutes,

    ...dashboardRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
