import { CheckProvider } from '@/contexts/CheckContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Stack } from 'expo-router';
import { RadioProvider } from '@/contexts/RadioContext';
import { TaskFlowProvider } from '@/contexts/TaskFlowContext';

export default function RootLayout() {
    return (
        <TaskFlowProvider>
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
                            <Stack.Screen name="screens/MainTasks/RATScreen" options={{ headerShown: false, gestureEnabled: false }} />
                            <Stack.Screen name="screens/MainTasks/AUTScreen" options={{ headerShown: false, gestureEnabled: false }} />
                            <Stack.Screen name="screens/MainTasks/InsightScreen" options={{ headerShown: false, gestureEnabled: false }} />
                            <Stack.Screen name="screens/SendScreen" options={{ headerShown: false, gestureEnabled: false }} />
                        </Stack>
                    </LanguageProvider>
                </RadioProvider>
            </CheckProvider>
        </TaskFlowProvider>
    );
}
