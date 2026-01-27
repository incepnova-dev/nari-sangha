import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { languages, LanguageMeta } from "./languages";
import en from "../locales/en/translation.json";
import hi from "../locales/hi/translation.json";
import bn from "../locales/bn/translation.json";
import fr from "../locales/fr/translation.json";
import es from "../locales/es/translation.json";
import ar from "../locales/ar/translation.json";

export type Dict = Record<string, string>;

export const LANG_STORAGE_KEY = "app_language";

const preload: Record<string, Dict> = {
    en: en as Dict,
    hi: hi as Dict,
    bn: bn as Dict,
    fr: fr as Dict,
    es: es as Dict,
    ar: ar as Dict,
};
const fallbackDict: Dict = en as Dict;

const rtlSet = new Set(["ar", "he", "fa", "ur"]);

let currentDict: Dict = fallbackDict;

export const isRTL = (code: string): boolean => rtlSet.has(code.toLowerCase());

export const detectLanguage = (): string => {
    const persisted = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (persisted && languages.some((l) => l.code === persisted)) return persisted;
    const nav = navigator.language || navigator.languages?.[0];
    if (nav) {
        const short = nav.split("-")[0].toLowerCase();
        if (languages.some((l) => l.code === short)) return short;
    }
    return "en";
};

const applyDir = (code: string) => {
    document.dir = isRTL(code) ? "rtl" : "ltr";
};

const setCurrent = (code: string, dict: Dict) => {
    currentDict = dict;
    window.localStorage.setItem(LANG_STORAGE_KEY, code);
    applyDir(code);
};

export const t = (key: string, vars?: Record<string, string | number>): string => {
    const value = currentDict[key] ?? fallbackDict[key] ?? key;
    if (!vars) return value;
    return Object.keys(vars).reduce(
        (acc, k) => acc.replace(new RegExp(`{{\\s*${k}\\s*}}`, "g"), String(vars[k])),
        value
    );
};

const loadLanguageDict = async (code: string): Promise<Dict> => {
    const lower = code.toLowerCase();
    if (preload[lower]) return preload[lower];
    try {
        const mod = await import(`../locales/${lower}/translation.json`);
        return mod.default as Dict;
    } catch {
        return fallbackDict;
    }
};

interface I18nContextValue {
    language: string;
    setLanguage: (code: string) => Promise<void>;
    t: typeof t;
    languages: LanguageMeta[];
    isRTL: (code: string) => boolean;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLangState] = useState<string>("en");
    const [ready, setReady] = useState(false);

    const init = async () => {
        const code = detectLanguage();
        const dict = await loadLanguageDict(code);
        setCurrent(code, dict);
        setLangState(code);
        setReady(true);
    };

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setLanguage = async (code: string) => {
        const dict = await loadLanguageDict(code);
        setCurrent(code, dict);
        setLangState(code);
    };

    const value = useMemo(
        () => ({
            language,
            setLanguage,
            t,
            languages,
            isRTL,
        }),
        [language]
    );

    if (!ready) return null;

    return React.createElement(I18nContext.Provider, { value }, children);
};

export const useI18nContext = (): I18nContextValue => {
    const ctx = useContext(I18nContext);
    if (!ctx) {
        throw new Error("useI18n must be used within I18nProvider");
    }
    return ctx;
};

