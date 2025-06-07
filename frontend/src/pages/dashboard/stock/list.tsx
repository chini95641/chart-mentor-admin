import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { StockListView } from 'src/sections/stocks';

// ----------------------------------------------------------------------

export default function StockListPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title> {t('stocks.listTitle')}</title>
      </Helmet>

      <StockListView />
    </>
  );
} 