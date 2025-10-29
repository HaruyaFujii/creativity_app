import { useLanguage } from '@/contexts/LanguageContext';
import { useCheckContext } from '@/contexts/CheckContext';
import { useRadioContext } from '@/contexts/RadioContext';
import { useTaskFlow } from '@/contexts/TaskFlowContext';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SendScreen: React.FC = () => {
    const { language } = useLanguage();
    const { isCheckedBool } = useCheckContext();
    const { sleepAnswer } = useRadioContext();
    const { answers, currentTaskSet } = useTaskFlow();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataSent, setDataSent] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                // ユーザーがログインしていない場合はログイン画面にリダイレクト
                router.push('/screens/LoginScreen');
            }
        });
        return unsubscribe;
    }, [router]);

    const handleSend = async () => {
        setIsLoading(true);
        if (!currentUser?.email) {
            Alert.alert(language === 'ja' ? 'エラー' : 'Error', language === 'ja' ? 'ユーザー情報が見つかりません。' : 'User information not found.');
            return;
        }

        const today = new Date();
        const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD

        try {
            const currentUserEmail = currentUser.email;

            // 1. Sleep Data
            const sleepData = {
                isCheckedBool,
                sleepAnswer,
                date: Date.now(),
            };
            const sleepDocRef = doc(db, "users", currentUserEmail, "sleepDatas", dateString);
            await setDoc(sleepDocRef, {}, { merge: true }); // ドキュメントがなければ作成
            await updateDoc(sleepDocRef, {
                logs: arrayUnion(sleepData)
            });

            // 2. Answer Data
            const answerData = {
                ...answers,
                date: Date.now(),
            };
            const answerDocRef = doc(db, "users", currentUserEmail, "AnswerDatas", dateString);
            await setDoc(answerDocRef, {}, { merge: true }); // ドキュメントがなければ作成
            await updateDoc(answerDocRef, {
                results: arrayUnion(answerData)
            });

            // 3. Task Set Count
            if (currentTaskSet) {
                const countRef = doc(db, "users", currentUserEmail);
                await setDoc(countRef, { count: currentTaskSet.count }, { merge: true });
            }
        } catch (error) {
            console.error("Error sending data to Firebase: ", error);
            Alert.alert(language === 'ja' ? 'エラー' : 'Error', language === 'ja' ? 'データの送信中にエラーが発生しました。' : 'An error occurred while sending your data.');
        } finally {
            Alert.alert(language === 'ja' ? '成功' : 'Success', language === 'ja' ? '解答が正常に送信されました。' : 'Your answers have been submitted successfully.');
            setIsLoading(false);
            setDataSent(true);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {dataSent ? (
                <View>
                    <Text style={styles.title}>{language === 'ja' ? '解答が送信されました。\nアプリを終了してください。' : 'The data was sent. \nPlease exit the app.'}</Text>
                </View>
            ) : (
                <View>
                    <Text style={styles.title}>{language === 'ja' ? 'お疲れ様でした！' : 'Well done!'}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleSend()}
                        disabled={isLoading}
                    >
                        <Text style={styles.buttonText}>{language === 'ja' ? '解答を送信' : 'Send Answers'}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#87CEFA',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SendScreen;
