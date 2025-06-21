import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Language } from "@/types/types"

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

interface LanguageProviderProps {
    children: ReactNode;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('ja');
    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
    return context;
};
