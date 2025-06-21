import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';

const LanguageScreen: React.FC = () => {

    const { setLanguage } = useLanguage();

    const handleLanguageSelect = (lang: "ja" | "en") => {
        setLanguage(lang);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>使用言語を選択してください</Text>
            <Text>Select your language</Text>
            {/*日本語ボタン*/}
            <Link href="/screens/LoginScreen" asChild>
                <TouchableOpacity style={styles.selectButton} onPress={() => { handleLanguageSelect("ja") }}>
                    <Text>日本語</Text>
                </TouchableOpacity>
            </Link>
            {/*英語ボタン*/}
            <Link href="/screens/LoginScreen" asChild>
                <TouchableOpacity style={styles.selectButton} onPress={() => { handleLanguageSelect("en") }}>
                    <Text>English</Text>
                </TouchableOpacity>
            </Link>
        </SafeAreaView>
    )
}

export default LanguageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    selectButton: {
        backgroundColor: "#87CEFA",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: 100,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    }
});