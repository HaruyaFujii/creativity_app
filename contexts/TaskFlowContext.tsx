import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useRouter } from 'expo-router';
import { getNextTaskSet } from '@/app/screens/MainTasks/taskManager';
import { Tasks } from '@/types/types';
import { auth } from '@/lib/firebase';
import { fetchUserCount } from '@/app/lib/fetchUserCount';

// --- 回答データの型定義 ---
// (将来的には types/types.ts に移すのが望ましいです)
export interface RatAnswer {
  question: string[];
  answer: string[];
  timeTaken: number[];
}
export interface AutAnswer {
  question: string;
  allAnswers: string[];
  top2: string[];
  timeTaken: number;
}
export interface InsightAnswer {
  question: string;
  answer: string;
  timeTaken: number;
}
export interface AllAnswers {
  rat?: RatAnswer;
  aut?: AutAnswer;
  insight?: InsightAnswer;
}

// --- Contextが提供する値の型定義 ---
interface TaskFlowContextType {
  currentTaskSet: Tasks | null;
  currentTaskIndex: number;
  isFlowActive: boolean;
  answers: AllAnswers;
  startTaskFlow: () => void;
  completeCurrentTask: () => void;
  setRatAnswer: (answer: RatAnswer) => void;
  setAutAnswer: (answer: AutAnswer) => void;
  setInsightAnswer: (answer: InsightAnswer) => void;
}

const TaskFlowContext = createContext<TaskFlowContextType | undefined>(undefined);

export const TaskFlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [currentTaskSet, setCurrentTaskSet] = useState<Tasks | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);
  const [isFlowActive, setIsFlowActive] = useState<boolean>(false);
  const [answers, setAnswers] = useState<AllAnswers>({});

  const startTaskFlow = async () => {
    const user = auth.currentUser;
    if (user && user.email) {
        const lastCompletedCount = await fetchUserCount(user.email); // 新規ユーザーの場合は0が返る
        
        let completedCounts: number[] = [];
        if (lastCompletedCount > 0) {
            // lastCompletedCount が 2 なら、[1, 2] のように配列を生成
            completedCounts = Array.from({ length: lastCompletedCount }, (_, i) => i + 1);
        }

        const nextTaskSet = getNextTaskSet(completedCounts);

        if (nextTaskSet) {
          setCurrentTaskSet(nextTaskSet);
          setCurrentTaskIndex(0);
          setIsFlowActive(true);
          setAnswers({}); // フロー開始時に回答をリセット

          // rotate配列の最初のタスク画面に遷移
          const firstScreen = nextTaskSet.rotate[0];
          const path = `/screens/MainTasks/${firstScreen}`;
          router.push(path as any);
        } else {
          // もし実行するタスクがなければSendScreenへ
          router.push('/screens/SendScreen' as any);
        }
    } else {
        // ログインしていない場合はログイン画面へ
        router.push('/screens/LoginScreen' as any);
    }
  };

  const completeCurrentTask = () => {
    if (!currentTaskSet) return;

    const nextIndex = currentTaskIndex + 1;

    // rotate配列の長さをチェックして、まだ次のタスクがあるか判断
    if (nextIndex < currentTaskSet.rotate.length) {
      // 次のタスクへ
      setCurrentTaskIndex(nextIndex);
      const nextScreen = currentTaskSet.rotate[nextIndex];
      const path = `/screens/MainTasks/${nextScreen}`;
      router.push(path as any);
    } else {
      // 全タスク完了、SendScreenへ遷移して最終確認・送信
      setIsFlowActive(false);
      router.push('/screens/SendScreen' as any);
    }
  };
  
  // --- 各タスク画面から回答を保存するための関数 ---
  const setRatAnswer = (answer: RatAnswer) => setAnswers(prev => ({ ...prev, rat: answer }));
  const setAutAnswer = (answer: AutAnswer) => setAnswers(prev => ({ ...prev, aut: answer }));
  const setInsightAnswer = (answer: InsightAnswer) => setAnswers(prev => ({ ...prev, insight: answer }));

  const value = {
    currentTaskSet,
    currentTaskIndex,
    isFlowActive,
    answers,
    startTaskFlow,
    completeCurrentTask,
    setRatAnswer,
    setAutAnswer,
    setInsightAnswer,
  };

  return (
    <TaskFlowContext.Provider value={value}>
      {children}
    </TaskFlowContext.Provider>
  );
};

// カスタムフック
export const useTaskFlow = () => {
  const context = useContext(TaskFlowContext);
  if (context === undefined) {
    throw new Error('useTaskFlow must be used within a TaskFlowProvider');
  }
  return context;
};
