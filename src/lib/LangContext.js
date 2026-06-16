'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import { t as translate, LANGUAGES } from './i18n';

const LangContext = createContext({ lang: 'es', setLang: () => {}, t: (k) => k });

export function LangProvider({ children }) {
  const [lang, setLang] = useState('es');
  const t = useCallback((key) => translate(key, lang), [lang]);
  return (
    <LangContext.Provider value={{ lang, setLang, t, LANGUAGES }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
