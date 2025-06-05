import { Helmet } from 'react-helmet-async';

import NewsView from 'src/sections/news/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> News</title>
      </Helmet>

      <NewsView />
    </>
  );
}
