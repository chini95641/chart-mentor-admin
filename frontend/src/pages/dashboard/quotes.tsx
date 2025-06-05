import { Helmet } from 'react-helmet-async';

import QuotesView from 'src/sections/quotes/view';

// ----------------------------------------------------------------------

export default function PageQuotes() {
  return (
    <>
      <Helmet>
        <title> Quotes</title>
      </Helmet>

      <QuotesView />
    </>
  );
}
