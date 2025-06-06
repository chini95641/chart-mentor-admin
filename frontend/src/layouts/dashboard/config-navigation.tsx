import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: '',
        items: [
          { title: t('nav.home'), path: paths.dashboard.root, icon: ICONS.dashboard },
          {
            title: t('nav.chartOfTheDay'),
            path: paths.dashboard.chart_of_day,
            icon: ICONS.analytics,
          },
          { title: t('nav.videos'), path: paths.dashboard.videos, icon: ICONS.folder },
          { title: t('nav.users'), path: paths.dashboard.usax, icon: ICONS.user },
          { title: t('nav.quizzes'), path: paths.dashboard.quizes, icon: ICONS.ecommerce },
          { title: t('nav.adminViews'), path: paths.dashboard.admin_videos, icon: ICONS.booking },
          { title: t('nav.news'), path: paths.dashboard.news, icon: ICONS.blog },
          { title: t('nav.stocks'), path: paths.dashboard.stocks, icon: ICONS.banking },
          { title: t('nav.learn'), path: paths.dashboard.learn, icon: ICONS.menuItem },
          { title: t('nav.commodity'), path: paths.dashboard.commodity, icon: ICONS.chat },
          { title: t('nav.quotes'), path: paths.dashboard.quotes, icon: ICONS.job },
          { title: t('nav.roleManagement'), path: paths.dashboard.role, icon: ICONS.user },
          {
            title: t('nav.indexInsights'),
            path: paths.dashboard.index_insights,
            icon: ICONS.dashboard,
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
