import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { StockCreateView } from 'src/sections/stocks';

// ----------------------------------------------------------------------

export default function StockCreatePage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> {t('stocks.createTitle')}</title>
      </Helmet>

      <StockCreateView />
    </>
  );
} 