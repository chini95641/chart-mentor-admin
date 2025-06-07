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
const QuizListPage = lazy(() => import('src/pages/dashboard/quizes/list'));
const QuizCreatePage = lazy(() => import('src/pages/dashboard/quizes/create'));
const QuizEditPage = lazy(() => import('src/pages/dashboard/quizes/edit'));
const PageUsers = lazy(() => import('src/pages/dashboard/users'));
const PageAdminViews = lazy(() => import('src/pages/dashboard/admin_views'));
const PageNews = lazy(() => import('src/pages/dashboard/news'));
const StockListPage = lazy(() => import('src/pages/dashboard/stock/list'));
const StockCreatePage = lazy(() => import('src/pages/dashboard/stock/create'));
const StockEditPage = lazy(() => import('src/pages/dashboard/stock/edit'));
const PageLearn = lazy(() => import('src/pages/dashboard/learn'));
const PageCommodity = lazy(() => import('src/pages/dashboard/commodity'));
const QuoteCreatePage = lazy(() => import('src/pages/dashboard/quote/create'));
const QuoteListPage = lazy(() => import('src/pages/dashboard/quote/list'));
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
      {
        path: 'quizes',
        children: [
          { element: <Navigate to="/dashboard/quizes/create" replace />, index: true },
          { path: 'create', element: <QuizCreatePage /> },
          { path: 'list', element: <QuizListPage /> },
          { path: ':id/edit', element: <QuizEditPage /> },
        ],
      },
      { path: 'usax', element: <PageUsers /> },
      { path: 'admin_videos', element: <PageAdminViews /> },
      { path: 'news', element: <PageNews /> },
      {
        path: 'stocks',
        children: [
          { element: <Navigate to="/dashboard/stocks/list" replace />, index: true },
          { path: 'list', element: <StockListPage /> },
          { path: 'create', element: <StockCreatePage /> },
          { path: ':id/edit', element: <StockEditPage /> },
        ],
      },
      { path: 'learn', element: <PageLearn /> },
      { path: 'commodity', element: <PageCommodity /> },
      {
        path: 'quotes',
        children: [
          { element: <Navigate to="/dashboard/quotes/list" replace />, index: true },
          { path: 'list', element: <QuoteListPage /> },
          { path: 'create', element: <QuoteCreatePage /> },
        ],
      },
      { path: 'role', element: <PageRole /> },
      { path: 'index_insights', element: <PageRIndexInsights /> },
    ],
  },
];
