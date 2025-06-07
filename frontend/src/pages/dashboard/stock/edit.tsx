import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { StockEditView } from 'src/sections/stocks';

// ----------------------------------------------------------------------

export default function StockEditPage() {
  const { t } = useTranslation();
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title>{t('stocks.editTitle')}</title>
      </Helmet>

      {id && <StockEditView id={id} />}
    </>
  );
} 