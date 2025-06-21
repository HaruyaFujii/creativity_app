import { useLanguage } from '@/contexts/LanguageContext';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tasks } from '../../types/types';

interface TimerProps {
    task: Tasks;
    onTimeUpdate: () => void;
}

const Timer: React.FC<TimerProps> = ({ task, onTimeUpdate }) => {
    const { language } = useLanguage();
    const [timeLeft, setTimeLeft] = useState<number>(task.timeLimit);
    const [timeUp, setTimeUp] = useState<boolean>(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            setTimeUp(true);
            onTimeUpdate();
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime - 1))
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={[
                styles.jatitle,
                language === 'en' && styles.entitle
            ]}>
                {language === 'ja' ? `残り時間: ${timeLeft}秒` : `Time Left: ${timeLeft} seconds`}
            </Text>
            {timeUp && (
                <Text style={[
                    styles.jatitle,
                    language === 'en' && styles.entitle
                ]}>
                    {language === 'ja' ? "時間切れです！" : "Time's up!"}
                </Text>

            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
    },
    jatitle: {
        fontSize: 18,
        marginBottom: 30,
        left: 40,
        top: -250
    },
    entitle: {
        fontSize: 18,
        marginBottom: 30,
        left: -1,
        top: -250
    },
})


export default Timer;