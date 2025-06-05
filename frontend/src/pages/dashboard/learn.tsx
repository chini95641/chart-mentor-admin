import { Helmet } from 'react-helmet-async';

import LearnView from 'src/sections/learn/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Learn</title>
      </Helmet>

      <LearnView />
    </>
  );
}
