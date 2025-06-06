import { Helmet } from 'react-helmet-async';

import HomeVList from 'src/sections/home/list';

// ----------------------------------------------------------------------

export default function HomeListPage() {
  return (
    <>
      <Helmet>
        <title> Home: List</title>
      </Helmet>

      <HomeVList />
    </>
  );
}
