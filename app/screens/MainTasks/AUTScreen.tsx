import { useLanguage } from '@/contexts/LanguageContext';
import { useTaskFlow } from '@/contexts/TaskFlowContext';
import { AutAnswer } from '@/types/types';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import Timer from '../../components/Timer';
import pic from '@/app/assets/wclip-01.png'

const AUTScreen: React.FC = () => {
    const { language } = useLanguage();
    const { currentTaskSet, setAutAnswer, completeCurrentTask } = useTaskFlow();

    const [inputText, setInputText] = useState<string>("");
    const [inputTextList, setInputTextList] = useState<string[]>([]);
    const [timeUp, setTimeUp] = useState<boolean>(false);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [startTime, setStartTime] = useState<number>(0);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [finalAnswer, setFinalAnswer] = useState<AutAnswer | null>(null);

    // TaskFlowContextからAUTタスクと問題を取得
    const autTask = currentTaskSet?.tasks.find(t => t.id === 'autTask');
    const question = autTask?.questions[0]; // AUTは問題が1つと想定

    useEffect(() => {
        setStartTime(Date.now());
    }, []);

    if (!autTask || !question) {
        return <Text>Task not found for AUTScreen</Text>;
    }

    const handleSaveInputChange = () => {
        setInputTextList(prevList => [...prevList, inputText]);
        setInputText(""); // 入力フィールドをリセット
    }

    const handleTimeUp = () => {
        setTimeUp(true);
    }

    const handleSelect = (answer: string) => {
        if (selectedAnswers.includes(answer)) {
            setSelectedAnswers(selectedAnswers.filter(a => a !== answer));
        } else if (selectedAnswers.length < 2) {
            setSelectedAnswers([...selectedAnswers, answer]);
        }
    };

    const prepareAndShowConfirmation = () => {
        const endTime = Date.now();
        const timeTaken = Math.round((endTime - startTime) / 1000);
        const answerData: AutAnswer = {
            question: language === 'ja' ? question.text_ja : question.text_en,
            allAnswers: inputTextList,
            top2: selectedAnswers,
            timeTaken: timeTaken,
        };
        setFinalAnswer(answerData);
        setIsFinished(true);
    };

    const handleDone = () => {
        if (finalAnswer) {
            setAutAnswer(finalAnswer);
            completeCurrentTask();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {isFinished ? (
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {language === 'ja' ? "回答を保存しました。\n次へ進んでください。" : "Answer saved. Please proceed."}
                    </Text>
                    <TouchableOpacity
                        style={styles.answerButton}
                        onPress={handleDone}
                    >
                        <Text>
                            {language === 'ja' ? "完了" : "Done"}
                        </Text>
                    </TouchableOpacity>
                </View>
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
                        onPress={prepareAndShowConfirmation}
                    >
                        <Text>
                            {language === 'ja' ? "完了" : "Done"}
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            ) : (
                <SafeAreaView style={styles.container}>
                    {question.id === 'a1' &&
                        <View>
                            <Image source={pic} style={styles.image} />
                        </View>
                    }
                    <View>
                        <Text style={styles.title}>
                            {language === 'ja' ? question.text_ja : question.text_en}
                        </Text>
                    </View>
                    <View>
                        <Timer task={autTask} onTimeUpdate={handleTimeUp} />
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