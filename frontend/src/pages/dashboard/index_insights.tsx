import { Helmet } from 'react-helmet-async';

import IndexInsightsView from 'src/sections/index_insights/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Index Insights</title>
      </Helmet>

      <IndexInsightsView />
    </>
  );
}
