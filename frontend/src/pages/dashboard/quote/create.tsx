import { Helmet } from 'react-helmet-async';

import { QuoteCreateView } from 'src/sections/quotes';

// ----------------------------------------------------------------------

export default function QuoteCreatePage() {
  return (
    <>
      <Helmet>
        <title>Quotes: Create</title>
      </Helmet>

      <QuoteCreateView />
    </>
  );
}
