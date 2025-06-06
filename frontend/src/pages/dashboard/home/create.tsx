import { Helmet } from 'react-helmet-async';

import HomeVCreate from 'src/sections/home/create';

// ----------------------------------------------------------------------

export default function HomeCreatePage() {
  return (
    <>
      <Helmet>
        <title> Home: Create</title>
      </Helmet>

      <HomeVCreate />
    </>
  );
}
