import { Helmet } from 'react-helmet-async';

import QuizCreateView from 'src/sections/quizes/view/create-view';

// ----------------------------------------------------------------------

export default function QuizCreatePage() {
  return (
    <>
      <Helmet>
        <title> Quizzes: Create</title>
      </Helmet>

      <QuizCreateView />
    </>
  );
} 