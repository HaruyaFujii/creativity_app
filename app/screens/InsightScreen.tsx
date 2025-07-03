import { useCheckContext } from "@/contexts/CheckContext";
import { useLanguage } from '@/contexts/LanguageContext';
import { useRadioContext } from "@/contexts/RadioContext";
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'expo-router';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import { Question } from "@/types/types";
import Timer from '../components/Timer';
import { tasks } from '../constants/tasks';
import { getUnusedQuestion } from '../lib/getUnusedQuestion';

const InsightScreen: React.FC = () => {
    const [inputText, setInputText] = useState<string>("");
    const [timeUp, setTimeUp] = useState<boolean>(false);
    const [unusedQuestion, setUnusedQuestion] = useState<Question>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataSent, setDataSent] = useState<boolean>(false);
    const { isCheckedBool } = useCheckContext();
    const { sleepAnswer } = useRadioContext();
    const { language } = useLanguage();
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number>(Date.now());
    const [answerTime, setAnswerTime] = useState<number>();

    const insightTask = tasks.find(task => task.id === 'insightTask')
    if (!insightTask) {
        Alert.alert("Task not found");
    }

    useEffect(() => {
        const fetchUnused = async () => {
            if (insightTask) {
                const uq = await getUnusedQuestion(insightTask.id);
                setUnusedQuestion(uq!);
                setStartTime(Date.now());
            }
        };
        fetchUnused();
    }, [insightTask]);

    const handleTimeUp = () => {
        setTimeUp(true);
    }

    const handleSaveText = () => {
        const elapsed = Date.now() - startTime; 
        const elapsedSec = Math.round(elapsed / 1000);
        setAnswerTime(elapsedSec);
        setIsAnswered(true);
    }

    const handleAnswerSubmit = async () => {
        setIsLoading(true);
        const currentUserEmail = auth.currentUser?.email || "unknown";

        if (!currentUserEmail || !insightTask || !unusedQuestion) {
            Alert.alert("Error", "タスクまたはユーザが存在しません！");
            return;
        }

        const questionId = unusedQuestion.id;

        const answerData = {
            checkBox: {
                compliance: isCheckedBool ? "Rule followed" : "Rule broken",
            },
            sleepquestion: {
                response: sleepAnswer,
            },
            insightTask: {
                question: unusedQuestion.text_ja || unusedQuestion.text_en,
                Answers: inputText,
                time: answerTime,
                timestamp: Date.now()
            },
        }

        const dataRef = doc(db, "users", currentUserEmail);
        const usedQuestionRef = doc(db, "users", currentUserEmail, "usedQuestions", questionId);


        try {
            await setDoc(dataRef, {}, { merge: true }) // ドキュメント作成
            await updateDoc(dataRef, {
                insightResult: arrayUnion(answerData)
            })

            await setDoc(usedQuestionRef, { used: true }, { merge: true })

        } catch (error) {
            console.error("保存エラー:", error);
        } finally {
            setIsLoading(false);
            setDataSent(true);
            setInputText("");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {dataSent ? (
                <View>
                    <Text style={styles.title}>
                        {language === 'ja' ? "回答が送信されました！" : "Your answer has been submitted!"}
                    </Text>
                    <Text style={styles.title}>
                        {language === 'ja' ? "アプリを終了してください" : "Exit the app"}
                    </Text>
                </View>
            ) : timeUp ? (
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {language === 'ja' ? "時間切れです!\nデータを送信してください" : "Time's up!\nPlease send your answer."}
                    </Text>
                    <TouchableOpacity
                        style={styles.answerButton}
                        onPress={handleAnswerSubmit}
                        disabled={isLoading}
                    >
                        <Text>
                            {language === 'ja' ? "送信" : "Send"}
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : isAnswered ? (
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {language === 'ja' ? "データを送信してください" : "Please send your answer."}
                    </Text>
                    <TouchableOpacity
                        style={styles.answerButton}
                        onPress={handleAnswerSubmit}
                        disabled={isLoading}
                    >
                        <Text>
                            {language === 'ja' ? "送信" : "Send"}
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>
                            {insightTask && (
                                language === 'ja'
                                    ? unusedQuestion?.text_ja
                                    : unusedQuestion?.text_en
                            )}
                        </Text>
                    </View>
                    <View>
                        {insightTask && (
                            <Timer task={insightTask} onTimeUpdate={handleTimeUp} />
                        )}
                    </View>
                    <View style={styles.inputArea}>
                        <TextInput
                            style={styles.input}
                            placeholder={language === 'ja' ? "解答を入力してください" : "Please enter your answer"}
                            onChangeText={setInputText}
                            value={inputText}
                            disabled={timeUp}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.answerButton}
                            onPress={() => handleSaveText()}
                            disabled={timeUp || inputText.trim() === ""}
                        >
                            <Text>
                                {language === 'ja' ? "解答" : "Answer"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
    )
};

export default InsightScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 30,
    },
    inputArea: {
        width: '100%',
        height: 150,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    input: {
    },
    answerButton: {
        backgroundColor: '#87CEFA',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        borderRadius: 5,
        marginTop: 50,
    },
    buttonContainer: {
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: 20,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginVertical: 5,
    },
    buttonSelected: {
        backgroundColor: '#87CEFA',
        opacity: 0.9,
    },
    innerCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "blue",
        position: "absolute",
        left: 8,
    },
});