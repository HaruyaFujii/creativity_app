import { useLanguage } from "@/contexts/LanguageContext";
import { auth } from "@/lib/firebase";
import { Link, useRouter } from "expo-router";
import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen: React.FC = () => {
	const { language } = useLanguage();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
			if (user && user.emailVerified) {
				router.push("/screens/QuestionScreen");
			}
		});
		return () => unsubscribe();
	}, [router])

	const handleLogin = async () => {
		if (!email || !password) {
			Alert.alert(
				language === 'ja'
					? "メールアドレスとパスワードを入力してください"
					: "Please enter email and password"
			);
			return;
		}

		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			if (user.emailVerified) {
				router.push("/screens/QuestionScreen");
			} else {
				Alert.alert(
					language === 'ja'
						? "メールの認証がされていません"
						: "Email is not verified"
				);
			}
		} catch (error: any) {
			console.error("Login error:", error);
			let errorMessage = language === 'ja'
				? "ログインエラーが発生しました"
				: "Login error occurred";

			if (error.code === 'auth/network-request-failed') {
				errorMessage = language === 'ja'
					? "ネットワーク接続を確認してください"
					: "Please check your network connection";
			} else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
				errorMessage = language === 'ja'
					? "メールアドレスまたはパスワードが間違っています"
					: "Incorrect email or password";
			} else if (error.code === 'auth/invalid-email') {
				errorMessage = language === 'ja'
					? "無効なメールアドレスです"
					: "Invalid email address";
			}

			Alert.alert(
				language === 'ja' ? "エラー" : "Error",
				errorMessage
			);
		}
	};


	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>
				{language === "ja" ? "ログインしてください" : "Login"}
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
			{/*ログインボタン*/}
			<TouchableOpacity style={styles.loginButton} onPress={() => { handleLogin() }}>
				<Text>
					{language === "ja" ? "ログイン" : "Login"}
				</Text>
			</TouchableOpacity>
			{/*新しくアカウントを登録場合*/}
			<Text style={styles.question}>{language === "ja" ? "アカウントをお持ちでないですか？" : "Don't have an account?"}</Text>
			{/*アカウント作成ボタン*/}
			<Link href="/screens/RegisterScreen" asChild>
				<TouchableOpacity style={styles.registerButton} onPress={() => { }}>
					<Text>
						{language === "ja" ? "アカウントを作成" : "Register an account"}
					</Text>
				</TouchableOpacity>
			</Link>
		</SafeAreaView>
	)
}

export default LoginScreen;

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
	question: {
		marginTop: 30,
		fontSize: 10,
	},
	loginButton: {
		backgroundColor: "#87CEFA",
		padding: 10,
		borderRadius: 5,
		marginTop: 20,
		width: 150,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
	},
	registerButton: {
		backgroundColor: "#87CEFA",
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
		width: 150,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
	}
});