'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, Language } from '@/lib/translations'

type LanguageContextType = {
    lang: Language
    setLang: (lang: Language) => void
    t: (key: keyof typeof translations['fr']) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Language>('fr')

    useEffect(() => {
        const saved = localStorage.getItem('lang') as Language
        if (saved && (saved === 'fr' || saved === 'en' || saved === 'es')) {
            setLangState(saved)
        }
    }, [])

    const setLang = (newLang: Language) => {
        setLangState(newLang)
        localStorage.setItem('lang', newLang)
    }

    const t = (key: keyof typeof translations['fr']) => {
        return translations[lang][key] || translations['en'][key] || key
    }

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useI18n() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useI18n must be used within a LanguageProvider')
    }
    return context
}
