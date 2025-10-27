import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from '@/contexts/LanguageContext';
import { useTaskFlow } from '@/contexts/TaskFlowContext';

const SelectScreen: React.FC = () => {
    const { language } = useLanguage();
    const { startTaskFlow } = useTaskFlow();

    const handleStart = () => {
        startTaskFlow();
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                {language === 'ja' ? "準備はよろしいですか？" : "Are you ready?"}
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={handleStart}
            >
                <Text style={styles.text}>
                    {language === 'ja' ? "今日のタスクを開始" : "Start Today's Tasks"}
                </Text>
            </TouchableOpacity>
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
        marginBottom: 40,
    },
    button: {
        width: 230,
        height: 60,
        backgroundColor: "#87CEFA",
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        textAlign: "center",
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    }
});
