import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Fetches the user's completed task count from Firestore.
 * @param email The user's email address.
 * @returns The user's count, or 0 if not found.
 */
export const fetchUserCount = async (email: string): Promise<number> => {
    if (!email) return 0;

    try {
        const userDocRef = doc(db, 'users', email);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            // 'count' フィールドが存在し、数値であればその値を返す
            if (typeof userData.count === 'number') {
                return userData.count;
            }
        }
        // ドキュメントが存在しない、または'count'フィールドがない場合は0を返す
        return 0;
    } catch (error) {
        console.error("Error fetching user count: ", error);
        // エラーが発生した場合も0を返す
        return 0;
    }
};
