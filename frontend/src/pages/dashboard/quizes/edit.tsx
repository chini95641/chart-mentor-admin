import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import QuizEditView from 'src/sections/quizes/view/edit-view';

// ----------------------------------------------------------------------

export default function QuizEditPage() {
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title> Quizzes: Edit</title>
      </Helmet>

      <QuizEditView id={`${id}`} />
    </>
  );
} 