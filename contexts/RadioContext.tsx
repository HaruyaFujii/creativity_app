import React, { createContext, useState, ReactNode, useContext } from 'react';

interface RadioContextProps {
    sleepAnswer: string | null;
    setSleepAnswer: (answer: string | null) => void;
}

interface RadioProviderProps {
    children: ReactNode;
}

const RadioContext = createContext<RadioContextProps | undefined>(undefined);

export const RadioProvider: React.FC<RadioProviderProps> = ({ children }) => {
    const [sleepAnswer, setSleepAnswer] = useState<string | null>(null);

    return (
        <RadioContext.Provider value={{ sleepAnswer, setSleepAnswer }}>
            {children}
        </RadioContext.Provider>
    );
};

export const useRadioContext = () => {
    const context = useContext(RadioContext);
    if (!context) {
        throw new Error('useRadioContext must be used within a RadioProvider');
    }
    return context;
};
