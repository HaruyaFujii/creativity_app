import { useCheckContext } from "@/contexts/CheckContext";
import { useLanguage } from '@/contexts/LanguageContext';
import { useRadioContext } from "@/contexts/RadioContext";
import { auth, db } from '@/lib/firebase';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import { Question } from "@/types/types";
import Timer from '../components/Timer';
import { tasks } from '../constants/tasks';
import { getUnusedQuestion } from '../lib/getUnusedQuestion';
import pic from '../assets/wclip-01.png'

const AUTScreen: React.FC = () => {
    const [inputText, setInputText] = useState<string>("");
    const [inputTextList, setInputTextList] = useState<string[]>([]);
    const [timeUp, setTimeUp] = useState<boolean>(false);
    const [unusedQuestion, setUnusedQuestion] = useState<Question>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataSent, setDataSent] = useState<boolean>(false);
    const { isCheckedBool } = useCheckContext();
    const { sleepAnswer } = useRadioContext();
    const { language } = useLanguage();
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

    const autTask = tasks.find(task => task.id === 'autTask')
    if (!autTask) {
        Alert.alert("Task not found");
    }

    useEffect(() => {
        const fetchUnused = async () => {
            if (autTask) {
                const uq = await getUnusedQuestion(autTask.id);
                setUnusedQuestion(uq!);
            }
        };
        fetchUnused();
    }, [autTask]);

    const handleSaveInputChange = () => {
        setInputTextList(prevList => [...prevList, inputText]);
        setInputText(""); // 入力フィールドをリセット
        console.log("Input saved:", inputText);
        console.log("Input list:", inputTextList);
    }

    const handleTimeUp = () => {
        setTimeUp(true);
    }

    const handleSelect = (answer: string) => {
        if (selectedAnswers.includes(answer)) {
            // すでに選択済みなら解除
            setSelectedAnswers(selectedAnswers.filter(a => a !== answer));
        } else if (selectedAnswers.length < 2) {
            // 2つ未満なら追加
            setSelectedAnswers([...selectedAnswers, answer]);
        }
        // 2つ選択済みなら何もしない
    };

    const handleAnswerSubmit = async () => {
        setIsLoading(true);
        const currentUserEmail = auth.currentUser?.email || "unknown";

        if (!currentUserEmail || !autTask || !unusedQuestion) {
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
            aut: {
                question: unusedQuestion.text_ja || unusedQuestion.text_en,
                Answers: inputTextList,
                timestamp: Date.now()
            },
            Top2Answers: selectedAnswers
        }

        const dataRef = doc(db, "users", currentUserEmail);
        const usedQuestionRef = doc(db, "users", currentUserEmail, "usedQuestions", questionId);


        try {
            await setDoc(dataRef, {}, { merge: true }) // ドキュメント作成
            await updateDoc(dataRef, {
                autResult: arrayUnion(answerData)
            })

            await setDoc(usedQuestionRef, { used: true }, { merge: true })

            // router.push("/screens/Top2Screen");

        } catch (error) {
            console.error("保存エラー:", error);
        } finally {
            setIsLoading(false);
            setDataSent(true);
            setInputTextList([]); // 入力リストをリセット
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {dataSent ? (
                <SafeAreaView>
                    <Text style={styles.title}>
                        {language === 'ja' ? "回答が送信されました！" : "Your answer has been submitted!"}
                    </Text>
                    <Text style={styles.title}>
                        {language === 'ja' ? "アプリを終了してください" : "Exit the app"}
                    </Text>
                </SafeAreaView>
            ) : timeUp ? (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.title}>
                        {language === 'ja' ? "時間切れです!\nあなたの解答の中で最も良い2つの解答を選んでください。" : "Time's up!\nPlease select the two best answers from your responses."}
                    </Text>
                    <ScrollView contentContainerStyle={styles.buttonContainer}>
                        {inputTextList.map((answer, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.button,
                                    selectedAnswers.includes(answer) && styles.buttonSelected,
                                ]}
                                onPress={() => handleSelect(answer)}
                            >
                                {selectedAnswers.includes(answer) && <View style={styles.innerCircle} />}
                                <Text>{answer}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.answerButton}
                        onPress={handleAnswerSubmit}
                        disabled={isLoading}
                    >
                        <Text>
                            {language === 'ja' ? "送信" : "Send"}
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            ) : (
                <SafeAreaView style={styles.container}>
                    {unusedQuestion?.id === 'a1' &&
                        <View>
                            <Image source={pic} style={styles.image} />
                        </View>
                    }
                    <View>
                        <Text style={styles.title}>
                            {autTask && (
                                language === 'ja'
                                    ? unusedQuestion?.text_ja
                                    : unusedQuestion?.text_en
                            )}
                        </Text>
                    </View>
                    <View>
                        {autTask && (
                            <Timer task={autTask} onTimeUpdate={handleTimeUp} />
                        )}
                    </View>
                    <View style={styles.inputArea}>
                        <TextInput
                            style={styles.input}
                            placeholder={language === 'ja' ? "アイデアを入力してください" : "Please enter your ideas"}
                            onChangeText={setInputText}
                            value={inputText}
                            disabled={timeUp}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.answerButton}
                            onPress={() => handleSaveInputChange()}
                            disabled={timeUp || inputText.trim() === ""}
                        >
                            <Text>
                                {language === 'ja' ? "解答" : "Answer"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            )}
        </SafeAreaView>
    )
};

export default AUTScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 21,
        textAlign: "center",
        marginBottom: 40,
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
    image: {
        right: 100,
        width: 70,
        height: 70,
    },
});