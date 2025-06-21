import { useLanguage } from '@/contexts/LanguageContext';
import { useRadioContext } from '@/contexts/RadioContext';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";

const QuestionScreen: React.FC = () => {
    const { language } = useLanguage();
    const { setSleepAnswer } = useRadioContext();
    const [isChecked, setIsChecked] = useState<boolean>(false); // 選択したかどうか
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // 選択内容

    //選択肢
    const answers = language === 'ja'
        ? ["大幅に良くなっている", "やや良くなっている", "変わらない", "やや悪くなっている", "大幅に悪くなっている"]
        : ["much better", "better", "no change", "worse", "much worse"];
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                {language === 'ja' ? "昨日と比べて、今日の睡眠の質はどうでしたか？"
                    : "Compared to yesterday, how was your sleep quality today?"}
            </Text>
            {answers.map((answer) => (
                <RadioButton.Item
                    mode="android"
                    color="#1E90FF"
                    style={styles.radioButton}
                    key={answer}
                    label={answer}
                    labelStyle={{ fontSize: 14 }}
                    value={answer}
                    status={selectedAnswer === answer ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setSelectedAnswer(answer);
                        setIsChecked(true); // 選択したことを記録
                    }}
                />
            ))}
            {isChecked ? (
                <Link href="/screens/CheckScreen" asChild>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setSleepAnswer(selectedAnswer)}
                    >
                        <Text style={styles.text}>
                            {language === 'ja' ? "決定" : "Decide"}
                        </Text>
                    </TouchableOpacity>
                </Link>
            ) : (
                <TouchableOpacity style={[styles.button, { opacity: 0.5 }]} disabled={true}>
                    <Text style={styles.text}>
                        {language === 'ja' ? "決定" : "Decide"}
                    </Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    )
}

export default QuestionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 16,
        marginBottom: 25,
        textAlign: "center",
    },
    radioButton: {
        width: 250,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
        marginVertical: 5,
    },
    button: {
        backgroundColor: "#87CEFA",
        padding: 10,
        borderRadius: 5,
        marginTop: 25,
        width: 100,
    },
    text: {
        textAlign: "center",
    }
});