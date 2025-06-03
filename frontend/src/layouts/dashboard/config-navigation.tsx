import { useMemo } from 'react';

import { useTranslate } from 'src/locales';

// import Label from "src/components/label";
// import Iconify from "src/components/iconify";
/* import SvgColor from 'src/components/svg-color';
 */
// ----------------------------------------------------------------------

/* const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
); */
/* 
const ICONS = {
  home: icon('ic_home'),
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
  gravestone: icon('ic_gravestone'),
  graveyard: icon('ic_graveyard'),
}; */

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      // fELLESRAAD
      {
        subheader: t('Home'),
        roles: ['COST', 'ADMIN'],
        items: [
          /* {
            title: t('Home'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
            roles: ['COST', 'ADMIN'],
          }, */
        ],
      },
      {
        subheader: t('Scope'),
        roles: ['COST', 'ADMIN'],
        color: '#ee575e',
        items: [
          // Create
          /* {
            title: t('Sucursal'),
            path: paths.dashboard.root,
            icon: ICONS.user,
            roles: ['COST', 'ADMIN'],
            color: '#ee575e',
          }, */
        ],
      },
      {
        subheader: t('Methodology'),
        roles: ['COST', 'ADMIN'],
        color: '#1D5DEC',
        items: [
          // Supplies
          /*  {
            title: t('Anadir nuevo insumos'),
            path: paths.dashboard.root,
            icon: ICONS.user,
            roles: ['COST', 'ADMIN'],
            color: '#1D5DEC',
          }, */
        ],
      },
      {
        subheader: t('Quantity of Hours'),
        roles: ['COST', 'ADMIN'],
        color: '#1D5DEC',
        items: [],
      },
      {
        subheader: t('Distribution of Hours'),
        roles: ['COST', 'ADMIN'],
        color: '#1D5DEC',
        items: [],
      },
      {
        subheader: t('Labor Costs'),
        roles: ['COST', 'ADMIN'],
        color: '#1D5DEC',
        items: [],
      },
      {
        subheader: t('Distruciton of Labor'),
        roles: ['COST', 'ADMIN'],
        color: '#1D5DEC',
        items: [],
      },
      {
        subheader: t('Material'),
        roles: ['COST', 'ADMIN'],
        color: '#1D5DEC',
        items: [],
      },
      {
        subheader: t('Travel'),
        roles: ['COST', 'ADMIN'],
        color: '#1D5DEC',
        items: [],
      },
      {
        subheader: t('Admin'),
        roles: ['COST', 'ADMIN'],
        color: '#1D5DEC',
        items: [],
      },
    ],
    [t]
  );

  return data;
}
