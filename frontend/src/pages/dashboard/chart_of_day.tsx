import { Helmet } from 'react-helmet-async';

import ChartOfDayiew from 'src/sections/chart_of_day/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Chart Of Day
        </title>
      </Helmet>

      <ChartOfDayiew />
    </>
  );
}
