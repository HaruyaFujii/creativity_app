import { useLanguage } from '@/contexts/LanguageContext';
import { useTaskFlow } from '@/contexts/TaskFlowContext';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import Timer from '../../components/Timer';

const InsightScreen: React.FC = () => {
    const { language } = useLanguage();
    const { currentTaskSet, setInsightAnswer, completeCurrentTask } = useTaskFlow();

    const [inputText, setInputText] = useState<string>("");
    const [timeUp, setTimeUp] = useState<boolean>(false);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number>(0);

    // TaskFlowContextからInsightタスクと問題を取得
    const insightTask = currentTaskSet?.tasks.find(t => t.id === 'insightTask');
    const question = insightTask?.questions[0]; // Insightは問題が1つと想定

    useEffect(() => {
        setStartTime(Date.now());
    }, []);

    if (!insightTask || !question) {
        return <Text>Task not found for InsightScreen</Text>;
    }

    const handleTimeUp = () => {
        setTimeUp(true);
    }

    const handleSaveText = () => {
        setIsAnswered(true);
    }

    const handleDone = () => {
        const endTime = Date.now();
        const timeTaken = Math.round((endTime - startTime) / 1000);
        const answerData = {
            question: language === 'ja' ? question.text_ja : question.text_en,
            answer: inputText,
            timeTaken: timeTaken,
        };
        setInsightAnswer(answerData);
        completeCurrentTask();
    };

    return (
        <SafeAreaView style={styles.container}>
            {timeUp ? (
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {language === 'ja' ? "時間切れです！\n次へ進んでください。" : "Time's up!\nPlease proceed."}
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
            ) : isAnswered ? (
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {language === 'ja' ? "回答を保存しました。次へ進んでください。" : "Answer saved. Please proceed."}
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
            ) : (
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>
                            {language === 'ja' ? question.text_ja : question.text_en}
                        </Text>
                    </View>
                    <View>
                        <Timer task={insightTask} onTimeUpdate={handleTimeUp} />
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
});
