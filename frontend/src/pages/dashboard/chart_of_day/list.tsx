import { Helmet } from 'react-helmet-async';

import ChartOfDayListView from 'src/sections/chart_of_day/view/list-view';

// ----------------------------------------------------------------------

export default function ChartOfDayListPage() {
  return (
    <>
      <Helmet>
        <title> Chart of the Day: List</title>
      </Helmet>

      <ChartOfDayListView />
    </>
  );
} 