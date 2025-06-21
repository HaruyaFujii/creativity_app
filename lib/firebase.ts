import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// @ts-ignore - Firebase v11 type issue
import { getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDoCldKPnIc9jaNB0TS1POKD_7trMnQUtw",
    authDomain: "creativityapp-b16f5.firebaseapp.com",
    projectId: "creativityapp-b16f5",
    databaseURL: "https://creativityapp-b16f5-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "creativityapp-b16f5.firebasestorage.app",
    messagingSenderId: "223536333800",
    appId: "1:223536333800:web:5c9acc30754a8d1c035a5d",
    measurementId: "G-RV3S3XXWG9"
};

// Initialize Firebase only if it hasn't been initialized
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

// Initialize Auth with platform-specific persistence
export const auth = Platform.OS === 'web' 
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });

// Initialize Firestore
export const db = getFirestore(app);

