import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import translationsData from "../data/translations.json";

export type Language = "id" | "en";
export type LocalizedText = string | Partial<Record<Language, string>>;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    localize: (value?: LocalizedText | null) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const translations = translationsData as Record<Language, Record<string, string>>;

const isLanguage = (value: string | null): value is Language => value === "id" || value === "en";

const isLocalizedText = (value: LocalizedText | null | undefined): value is Partial<Record<Language, string>> => {
    return typeof value === "object" && value !== null && ("id" in value || "en" in value);
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>(() => {
        if (typeof window === "undefined") {
            return "id";
        }

        const saved = localStorage.getItem("language");
        return isLanguage(saved) ? saved : "id";
    });

    useEffect(() => {
        localStorage.setItem("language", language);
        document.documentElement.lang = language;
    }, [language]);

    const t = (key: string) => {
        return translations[language]?.[key] || key;
    };

    const localize = (value?: LocalizedText | null) => {
        if (!value) {
            return "";
        }

        if (typeof value === "string") {
            return value;
        }

        if (isLocalizedText(value)) {
            return value[language] || value.id || value.en || "";
        }

        return "";
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, localize }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
