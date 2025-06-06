import { Helmet } from 'react-helmet-async';

import ChartOfDayCreateView from 'src/sections/chart_of_day/view/create-view';

// ----------------------------------------------------------------------

export default function ChartOfDayCreatePage() {
  return (
    <>
      <Helmet>
        <title> Chart of the Day: Create</title>
      </Helmet>

      <ChartOfDayCreateView />
    </>
  );
} 