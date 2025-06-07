import { Helmet } from 'react-helmet-async';

import { QuoteListView } from 'src/sections/quotes';

// ----------------------------------------------------------------------

export default function QuoteListPage() {
  return (
    <>
      <Helmet>
        <title>Quotes: List</title>
      </Helmet>

      <QuoteListView />
    </>
  );
} 