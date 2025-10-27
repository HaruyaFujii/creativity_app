import { useLanguage } from '@/contexts/LanguageContext';
import { useTaskFlow } from '@/contexts/TaskFlowContext';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Timer from '../../components/Timer';

const RATScreen: React.FC = () => {
    const { language } = useLanguage();
    const { currentTaskSet, setRatAnswer, completeCurrentTask } = useTaskFlow();

    const [timeUp, setTimeUp] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>("");
    const [inputTextList, setInputTextList] = useState<string[]>([]);
    const [count, setCount] = useState(0);
    const [startTime, setStartTime] = useState<number>(0);
    const [timeTakenList, setTimeTakenList] = useState<number[]>([]);

    // TaskFlowContextからRATタスクと問題を取得
    const ratTask = currentTaskSet?.tasks.find(t => t.id === 'ratTask');
    const questions = ratTask?.questions; // RATは問題が複数

    useEffect(() => {
        setStartTime(Date.now());
    }, [count]);

    if (!ratTask || !questions || questions.length === 0) {
        return <Text>Task not found for RATScreen</Text>;
    }

    const recordTime = () => {
        const endTime = Date.now();
        const elapsedTime = Math.round((endTime - startTime) / 1000);
        return elapsedTime;
    }

    const handleTimeUp = () => {
        const timeTaken = recordTime();
        const newTimeTakenList = [...timeTakenList, timeTaken];
        setTimeTakenList(newTimeTakenList);

        // 時間切れでも入力中のテキストは保存リストに追加
        const newList = [...inputTextList, inputText || ""];
        setInputTextList(newList);
        setInputText("");

        if (count < questions.length - 1) {
            setCount(prev => prev + 1);
        } else {
            // 全ての問題が時間切れになったら完了
            handleDone(newList, newTimeTakenList);
        }
    }

    const handleSaveInputChange = () => {
        const timeTaken = recordTime();
        const newTimeTakenList = [...timeTakenList, timeTaken];
        setTimeTakenList(newTimeTakenList);

        const newList = [...inputTextList, inputText];
        setInputTextList(newList);
        setInputText("");

        if (count < questions.length - 1) {
            setCount(prev => prev + 1);
        } else {
            // 全ての問題に回答したら完了
            handleDone(newList, newTimeTakenList);
        }
    }

    // 引数で最新の回答リストと時間リストを受け取るように変更
    const handleDone = (finalAnswers: string[], finalTimeTaken: number[]) => {
        const answerData = {
            question: questions.map(q => language === 'ja' ? q.text_ja : q.text_en),
            answer: finalAnswers,
            timeTaken: finalTimeTaken,
        };
        setRatAnswer(answerData);
        completeCurrentTask();
    };

    // 現在の問題
    const currentQuestion = questions[count];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        {language === 'ja'
                            ? currentQuestion?.text_ja
                            : currentQuestion?.text_en
                        }
                    </Text>
                </View>
                <View>
                    <Timer
                        key={count} // keyをcountにしてタイマーをリセット
                        task={ratTask}
                        onTimeUpdate={handleTimeUp}
                    />
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
                        onPress={handleSaveInputChange}
                        disabled={inputText.trim() === ""}
                    >
                        <Text>
                            {language === 'ja' ? "解答" : "Answer"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
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
