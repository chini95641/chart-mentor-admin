import { Helmet } from 'react-helmet-async';

import PageAdminViews from 'src/sections/admin_views/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin Views</title>
      </Helmet>

      <PageAdminViews />
    </>
  );
}
