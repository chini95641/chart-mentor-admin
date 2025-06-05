import { Helmet } from 'react-helmet-async';

import QuizesView from 'src/sections/quizes/view';

// ----------------------------------------------------------------------

export default function PageQuizes() {
  return (
    <>
      <Helmet>
        <title> Quizes</title>
      </Helmet>

      <QuizesView />
    </>
  );
}
