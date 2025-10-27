export type Language = 'ja' | 'en'; // 言語設定 

export interface Question {
    id: string; // 問ごとのid
    text_ja: string; // 問題文
    text_en: string; // 問題文
    used: boolean; // 使用したことあるかどうか
}

export interface Task {
    id: string; // タスクごとのid
    name: string; // タスク名
    description: string; // タスクの説明
    questions: Question[]; // タスクに関連する問題
    timeLimit: number; // タスクの時間制限
}

export interface Tasks{
    count: number; // 何回目か
    rotate: string[];
    tasks: Task[];
}


export interface Answer {
    questionId: string; // 回答した問題のid
    answer: string; // 回答内容
    timestamp: number; // 回答した時間
}
