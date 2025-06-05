import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/home'));
const PageChartOfDay = lazy(() => import('src/pages/dashboard/chart_of_day'));
const PageVideos = lazy(() => import('src/pages/dashboard/videos'));
const PageUsers = lazy(() => import('src/pages/dashboard/users'));
const PageQuizes = lazy(() => import('src/pages/dashboard/quizes'));
const PageAdminViews = lazy(() => import('src/pages/dashboard/admin_views'));
const PageNews = lazy(() => import('src/pages/dashboard/news'));
const PageStocks = lazy(() => import('src/pages/dashboard/stocks'));
const PageLearn = lazy(() => import('src/pages/dashboard/learn'));
const PageCommunity = lazy(() => import('src/pages/dashboard/community'));
const PageQuotes = lazy(() => import('src/pages/dashboard/quotes'));
const PageRole = lazy(() => import('src/pages/dashboard/role'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'chart_of_day', element: <PageChartOfDay /> },
      { path: 'videos', element: <PageVideos /> },
      { path: 'usax', element: <PageUsers /> },
      { path: 'quizes', element: <PageQuizes /> },
      { path: 'admin_videos', element: <PageAdminViews /> },
      { path: 'news', element: <PageNews /> },
      { path: 'stocks', element: <PageStocks /> },
      { path: 'learn', element: <PageLearn /> },
      { path: 'community', element: <PageCommunity /> },
      { path: 'quotes', element: <PageQuotes /> },
      { path: 'role', element: <PageRole /> },
      // {
      //   path: 'group',
      //   children: [
      //     { element: <PageFour />, index: true },
      //     { path: 'five', element: <PageFive /> },
      //     { path: 'six', element: <PageSix /> },
      //   ],
      // },
    ],
  },
];
