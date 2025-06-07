import axiosInstance, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export async function createQuiz(quizData: {
  question: string;
  video: string;
  options: string[];
}) {
  const URL = endpoints.quiz.create;
  await axiosInstance.post(URL, quizData);
}

export async function getQuizzes() {
  const URL = endpoints.quiz.list;
  const res = await axiosInstance.get(URL);
  return res.data;
}

export async function getQuiz(id: string) {
    const URL = endpoints.quiz.details(id);
    const res = await axiosInstance.get(URL);
    return res.data;
}

export async function updateQuiz(
  id: string,
  quizData: {
    question: string;
    video: string;
    options: string[];
  }
) {
  const URL = endpoints.quiz.update(id);
  await axiosInstance.put(URL, quizData);
}

export async function deleteQuiz(id: string) {
  const URL = endpoints.quiz.delete(id);
  await axiosInstance.delete(URL);
} 