import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

export const fetchUsedQuestionIds = async (): Promise<string[]> => {
  const currentUserEmail = auth.currentUser?.email || "unknown";
  console.log("Current user email:", currentUserEmail);
  if (!currentUserEmail) return [];

  const snapshot = await getDocs(collection(db, 'users', currentUserEmail, 'usedQuestions'));
    if (snapshot.empty) {
        return [];
    }
  const usedIds = snapshot.docs.map(doc => doc.id);
  return usedIds;
};