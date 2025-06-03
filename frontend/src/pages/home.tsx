import { Helmet } from 'react-helmet-async';

import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Gravepass: The starting point for you</title>
      </Helmet>

      <HomeView />
    </>
  );
}
