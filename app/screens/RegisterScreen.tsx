import { useLanguage } from "@/contexts/LanguageContext";
import { auth } from "@/lib/firebase";
import { Link } from "expo-router";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen: React.FC = () => {
    const { language } = useLanguage();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email ,password);
            const user = userCredential.user;

            if (user) {
                sendEmailVerification(user)
                    .then(() => {
                        Alert.alert("Send an e-mail to verify your account");
                    })
                    .catch((error) => {
                        if (error instanceof Error) {
                            Alert.alert(error.message);
                        } else {
                            Alert.alert("An unknown error occurred.");
                        }
                    });
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            } else {
                Alert.alert("An unknown error occurred.");
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                {language === "ja" ? "アカウント登録を行ってください" : "Register an account"}
            </Text>
            <TextInput
                style={styles.emailInput}
                placeholder={language === "ja" ? "メールアドレスを入力" : "Enter email"}
                placeholderTextColor={"gray"}
                onChangeText={setEmail}
                value={email}
                autoCapitalize="none"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder={language === "ja" ? "パスワードを入力" : "Enter password"}
                    placeholderTextColor={"gray"}
                    onChangeText={setPassword}
                    value={password}
                    autoCapitalize="none"
                    secureTextEntry={!isPasswordVisible}
                    
                />
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                    <Text>
                        {isPasswordVisible
                            ? (language === "ja" ? "非表示" : "Hide")
                            : (language === "ja" ? "表示" : "Show")}
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => { handleRegister() }}>
                <Text>
                    {language === "ja" ? "アカウントを登録" : "Register an account"}
                </Text>
            </TouchableOpacity>
            <Text style={styles.question}>{language === "ja" ? "すでにアカウントをお持ちですか？" : "Already have an account?"}</Text>
            <Link href="/screens/LoginScreen" asChild>
                <TouchableOpacity style={styles.button} onPress={() => { }}>
                    <Text>
                        {language === "ja" ? "ログイン" : "Login"}
                    </Text>
                </TouchableOpacity>
            </Link>
        </SafeAreaView>
    )
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    emailInput: {
        borderColor: "black",
        borderRadius: 5,
        borderWidth: 1,
        width: 300,
        height: 50,
        padding: 10,
    },
    passwordContainer: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: 10,
        borderRadius: 5,
        width: 300,
        height: 50,
    },
    passwordInput: {
        position: "absolute",
        borderWidth: 1,
        borderRadius: 5,
        width: 300,
        height: 50,
        padding: 10,
    },
    toggleButton: {
        marginLeft: 10,
        backgroundColor: "#87CEFA",
        padding: 10,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#87CEFA",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: 150,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    },
    question: {
		marginTop: 30,
		fontSize: 10,
	},
});