import { Helmet } from 'react-helmet-async';

import QuizListView from 'src/sections/quizes/view/list-view';

// ----------------------------------------------------------------------

export default function QuizListPage() {
  return (
    <>
      <Helmet>
        <title> Quizzes: List</title>
      </Helmet>

      <QuizListView />
    </>
  );
} 