// RATタスク用

import { tasks } from '../constants/tasks';
import { fetchUsedQuestionIds } from './fetchUsedQuestionIds';

export const getUnusedQuestions = async (taskId: string) => {
  const usedIds = await fetchUsedQuestionIds();
  console.log("Used question IDs:", usedIds);
  const task = tasks.find(t => t.id === taskId); 
  if (!task) return null;

  const unusedQuestions = task.questions.filter(q => !usedIds.includes(q.id)); // 使ったidに選ばれたタスクのidに含まれてなければ取り出す

  return unusedQuestions.slice(0, 5); // 最初の5個の問題を返す
};
