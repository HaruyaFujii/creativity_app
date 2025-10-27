import { tasks } from '@/app/constants/tasks';
import { Tasks } from '@/types/types';

/**
 * 実行済みのcountの配列を受け取り、次に実行すべきタスクセットを返します。
 * @param completedCounts - ユーザーが既に完了したタスクセットのcountの配列 (例: [0, 2])
 * @returns 次に実行すべきタスクセットオブジェクト。すべて完了済みの場合はundefined。
 */
export const getNextTaskSet = (completedCounts: number[]): Tasks | undefined => {
  // tasks定数の中から、まだ実行されていない（completedCountsに含まれていない）ものを探します
  const remainingTaskSets = tasks.filter(taskSet => !completedCounts.includes(taskSet.count));

  // 未実行のタスクセットがなければ、undefinedを返します
  if (remainingTaskSets.length === 0) {
    return undefined;
  }

  // 未実行のタスクセットの中から、最もcountが小さいものを返します
  // (tasks.tsがcountでソートされていることを期待しますが、念のためソートします)
  return remainingTaskSets.sort((a, b) => a.count - b.count)[0];
};
