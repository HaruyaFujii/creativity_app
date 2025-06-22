import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext';
import { tasks } from '../constants/tasks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUnusedQuestions } from '../lib/getUnusedQuestions';
import { Question } from '@/types/types';
import { useCheckContext } from '@/contexts/CheckContext';
import { useRadioContext } from '@/contexts/RadioContext';
import Timer from '../components/Timer';
import { auth, db } from '@/lib/firebase';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import AUTScreen from './AUTScreen';

const RATScreen: React.FC = () => {
    const { language } = useLanguage();
    const { isCheckedBool } = useCheckContext();
    const { sleepAnswer } = useRadioContext();
    const [timeUp, setTimeUp] = useState<boolean>(false);
    const [unusedQuestion, setUnusedQuestion] = useState<Question[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataSent, setDataSent] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>("");
    const [inputTextList, setInputTextList] = useState<string[]>([]);
    const [count, setCount] = useState(0);


    const ratTask = tasks.find(task => task.id === 'ratTask')
    if (!ratTask) {
        Alert.alert("Task not found");
    }

    useEffect(() => {
        const fetchUnused = async () => {
            if (ratTask) {
                const uq = await getUnusedQuestions(ratTask.id);
                setUnusedQuestion(uq!);
            }
        };
        fetchUnused();
    }, [ratTask]);

    const handleTimeUp = () => {
        setTimeUp(true);
    }

    const handleSaveInputChange = () => {
        setCount((prev) => prev + 1)
        setInputTextList(prevList => [...prevList, inputText]);
        setInputText(""); // 入力フィールドをリセット
        console.log("Input saved:", inputText);
        console.log("Input list:", inputTextList);
    }

    const handleAnswerSubmit = async () => {
        setIsLoading(true);
        const currentUserEmail = auth.currentUser?.email || "unknown";

        if (!currentUserEmail || !ratTask || !unusedQuestion) {
            Alert.alert("Error", "タスクまたはユーザが存在しません！");
            return;
        }

        // オブジェクトとして解答をそれぞれ保存
        const answers = unusedQuestion.map((q, i) => ({
            question: q.text_ja || q.text_en,
            answer: inputTextList[i] ?? "",
        }));

        const answerData = {
            checkBox: {
                compliance: isCheckedBool ? "Rule followed" : "Rule broken",
            },
            sleepquestion: {
                response: sleepAnswer,
            },
            rat: {
                answers,
                timestamp: Date.now()
            },
        }

        const dataRef = doc(db, "users", currentUserEmail);

        try {
            await setDoc(dataRef, {}, { merge: true }) // ドキュメント作成
            await updateDoc(dataRef, {
                ratResult: arrayUnion(answerData)
            })

            for (const q of unusedQuestion) {
                const usedQuestionRef = doc(db, "users", currentUserEmail, "usedQuestions", q.id);
                await setDoc(usedQuestionRef, { used: true }, { merge: true })
            }
        } catch (error) {
            console.error("保存エラー:", error);
        } finally {
            setIsLoading(false);
            setDataSent(true);
            setInputTextList([]); // 入力リストをリセット
        }
    }

    if (timeUp && !dataSent) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {language === 'ja' ? "時間切れです!\n解答を送信してください" : "Time's up!\nSend your answers"}
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleAnswerSubmit()}
                    disabled={isLoading}
                >
                    <Text>
                        {language === 'ja' ? "送信" : "Send"}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    if (dataSent) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {language === 'ja' ? "回答が送信されました！" : "Your answer has been submitted!"}
                </Text>
                <Text style={styles.title}>
                    {language === 'ja' ? "アプリを終了してください" : "Exit the app"}
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {count < 5 ? (
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>
                            {language === 'ja'
                                ? unusedQuestion?.[count]?.text_ja
                                : unusedQuestion?.[count]?.text_en
                            }
                        </Text>
                    </View>
                    <View>
                        {ratTask && (
                            <Timer task={ratTask} onTimeUpdate={handleTimeUp} />
                        )}
                    </View>
                    <View style={styles.inputArea}>
                        <TextInput
                            style={styles.input}
                            placeholder={language === 'ja' ? "単語を入力" : "input the word"}
                            onChangeText={setInputText}
                            value={inputText}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleSaveInputChange()}
                            disabled={timeUp || inputText.trim() === ""}
                        >
                            <Text>
                                {language === 'ja' ? "解答" : "Answer"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : dataSent ? (
                <View>
                    <Text style={styles.title}>
                        {language === 'ja' ? "回答が送信されました！" : "Your answer has been submitted!"}
                    </Text>
                    <Text style={styles.title}>
                        {language === 'ja' ? "アプリを終了してください" : "Exit the app"}
                    </Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {language === 'ja' ? "解答を送信してください" : "Send your answers"}
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleAnswerSubmit()}
                        disabled={isLoading}
                    >
                        <Text>
                            {language === 'ja' ? "送信" : "Send"}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    )
}

export default RATScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        textAlign: "center",
        marginBottom: 20,
    },
    inputArea: {
        paddingVertical: 30,
        padding: 10,
        borderWidth: 1,
        marginBottom: 50,
    },
    input: {
        fontSize: 22,
        textAlign: "center"
    },
    button: {
        backgroundColor: '#87CEFA',
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        borderRadius: 5,
        cursor: "pointer"
    }
})