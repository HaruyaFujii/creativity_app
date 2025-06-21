import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'expo-router';

const SelectScreen: React.FC = () => {
    const { language } = useLanguage();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                {language === 'ja' ? "タスクを選んでください" : "Please select a task"}
            </Text>
            <Link href="/screens/AUTScreen" asChild>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.text}>
                        {language === 'ja' ? "代替用途テスト (AUT)" : "Alternative Uses Test (AUT) "}
                    </Text>
                </TouchableOpacity>
            </Link>
            <Link href="/screens/RATScreen" asChild>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.text}>
                        {language === 'ja' ? "遠隔連想テスト (RAT)" : "Remote Associates Test (RAT) "}
                    </Text>
                </TouchableOpacity>
            </Link>
            <Link href="/screens/InsightScreen" asChild>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.text}>
                        {language === 'ja' ? "洞察問題解決テスト" : "Insight Problem Solving Test"}
                    </Text>
                </TouchableOpacity>
            </Link>
        </SafeAreaView>
    )
}

export default SelectScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 25,
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        width: 230,
        height: 50,
        backgroundColor: "#87CEFA",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        textAlign: "center",
    }
});