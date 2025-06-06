import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/home/create'));
const HomeListPage = lazy(() => import('src/pages/dashboard/home/list'));
const ChartOfDayListPage = lazy(() => import('src/pages/dashboard/chart_of_day/list'));
const ChartOfDayCreatePage = lazy(() => import('src/pages/dashboard/chart_of_day/create'));
const VideoCreatePage = lazy(() => import('src/pages/dashboard/videos/create'));
const VideoListPage = lazy(() => import('src/pages/dashboard/videos/list'));
const PageUsers = lazy(() => import('src/pages/dashboard/users'));
const PageQuizes = lazy(() => import('src/pages/dashboard/quizes'));
const PageAdminViews = lazy(() => import('src/pages/dashboard/admin_views'));
const PageNews = lazy(() => import('src/pages/dashboard/news'));
const PageStocks = lazy(() => import('src/pages/dashboard/stocks'));
const PageLearn = lazy(() => import('src/pages/dashboard/learn'));
const PageCommodity = lazy(() => import('src/pages/dashboard/commodity'));
const PageQuotes = lazy(() => import('src/pages/dashboard/quotes'));
const PageRole = lazy(() => import('src/pages/dashboard/role'));
const PageRIndexInsights = lazy(() => import('src/pages/dashboard/index_insights'));

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
      { element: <Navigate to="/dashboard/home" replace />, index: true },
      {
        path: 'home',
        children: [
          { element: <IndexPage />, index: true },
          { path: 'list', element: <HomeListPage /> },
        ],
      },
      {
        path: 'chart_of_day',
        children: [
          { element: <ChartOfDayCreatePage />, index: true },
          { path: 'list', element: <ChartOfDayListPage /> },
        ],
      },
      {
        path: 'videos',
        children: [
          { element: <VideoCreatePage />, index: true },
          { path: 'list', element: <VideoListPage /> },
        ],
      },
      { path: 'usax', element: <PageUsers /> },
      { path: 'quizes', element: <PageQuizes /> },
      { path: 'admin_videos', element: <PageAdminViews /> },
      { path: 'news', element: <PageNews /> },
      { path: 'stocks', element: <PageStocks /> },
      { path: 'learn', element: <PageLearn /> },
      { path: 'commodity', element: <PageCommodity /> },
      { path: 'quotes', element: <PageQuotes /> },
      { path: 'role', element: <PageRole /> },
      { path: 'index_insights', element: <PageRIndexInsights /> },
    ],
  },
];
