import { Helmet } from 'react-helmet-async';

import CommodityView from 'src/sections/commodity/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Community </title>
      </Helmet>

      <CommodityView />
    </>
  );
}
