import React, { createContext, useContext, useEffect, useState } from "react";
import { languageOptions, LanguageCode } from "../i18";

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "ns_language";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (stored && languageOptions.some((opt) => opt.code === stored)) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (code: LanguageCode) => {
    setLanguageState(code);
    window.localStorage.setItem(STORAGE_KEY, code);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguageContext must be used within LanguageProvider");
  }
  return ctx;
};

