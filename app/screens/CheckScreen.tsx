import { useCheckContext } from '@/contexts/CheckContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const CheckScreen: React.FC = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const { language } = useLanguage();
    const { setIsCheckedBool } = useCheckContext();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                {language === 'ja' ? "あなたは今日Ouraアプリで睡眠データを確認しないというルールを遵守しましたか？"
                    : "Please make sure that you haven't checked todays Oura data yet?"}
            </Text>
            <TouchableOpacity
                style={[styles.checkButton, { backgroundColor: isChecked ? "blue" : "white" }]}
                onPress={() => setIsChecked(!isChecked)}
            >
                {isChecked && <Text style={styles.checkText}>✓</Text>}
            </TouchableOpacity>
            <Link href="/screens/SelectScreen" asChild>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setIsCheckedBool(isChecked)}
                >
                    <Text style={styles.text}>
                        {language === 'ja' ? "決定" : "Decide"}
                    </Text>
                </TouchableOpacity>
            </Link>
        </SafeAreaView>
    )
}

export default CheckScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
    },
    checkButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#000",
    },
    checkText: {
        fontSize: 30,
        color: "white",
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
    },
})