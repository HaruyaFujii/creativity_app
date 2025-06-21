import { CheckProvider } from '@/contexts/CheckContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Stack } from 'expo-router';
import { RadioProvider } from '@/contexts/RadioContext';

export default function RootLayout() {
    return (
        <CheckProvider>
            <RadioProvider>
                <LanguageProvider>
                    <Stack>
                        <Stack.Screen name="index" options={{ headerShown: false }} />
                        <Stack.Screen name="screens/LanguageScreen" options={{ headerShown: false }} />
                        <Stack.Screen name="screens/RegisterScreen" options={{ headerShown: false }} />
                        <Stack.Screen name="screens/LoginScreen" options={{ headerShown: false }} />
                        <Stack.Screen name="screens/SelectScreen" options={{ headerShown: false }} />
                        <Stack.Screen name="screens/QuestionScreen" options={{ headerShown: false }} />
                        <Stack.Screen name="screens/CheckScreen" options={{ headerShown: false }} />
                        <Stack.Screen name="screens/RATScreen" options={{ headerShown: false }} />
                        <Stack.Screen name="screens/AUTScreen" options={{ headerShown: false }} />
                        <Stack.Screen name="screens/InsightScreen" options={{ headerShown: false }} />
                    </Stack>
                </LanguageProvider>
            </RadioProvider>
        </CheckProvider>
    );
}
