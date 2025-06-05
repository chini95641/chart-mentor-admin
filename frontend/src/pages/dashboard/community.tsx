import { Helmet } from 'react-helmet-async';

import CommunityView from 'src/sections/community/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Community </title>
      </Helmet>

      <CommunityView />
    </>
  );
}
