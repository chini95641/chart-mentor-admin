import { Helmet } from 'react-helmet-async';

import StocksView from 'src/sections/stocks/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Stocks</title>
      </Helmet>

      <StocksView />
    </>
  );
}
