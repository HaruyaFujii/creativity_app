import { tasks } from '../constants/tasks';
import { fetchUsedQuestionIds } from './fetchUsedQuestionIds';

export const getUnusedQuestion = async (taskId: string) => {
  const usedIds = await fetchUsedQuestionIds();
  console.log("Used question IDs:", usedIds);
  const task = tasks.find(t => t.id === taskId);
  if (!task) return null;

  const unusedQuestion = task.questions.filter(q => !usedIds.includes(q.id));

  return unusedQuestion[0]; // 最初の未使用の問題を返す
};
