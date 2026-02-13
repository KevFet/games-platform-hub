'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { motion } from 'framer-motion'
import { useI18n } from '@/context/LanguageContext'
import { Mail, Loader2, Sparkles } from 'lucide-react'

export function Auth() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const { t } = useI18n()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            })

            if (error) throw error
            setMessage('Check your email for the login link!')
        } catch (error: any) {
            setMessage(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden mesh-gradient">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full glass-morphism p-8 rounded-3xl relative z-10"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12 }}
                        className="w-20 h-20 bg-gradient-to-tr from-neon-blue to-neon-purple rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-neon-blue/20"
                    >
                        <Sparkles className="w-10 h-10 text-white" />
                    </motion.div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        {t('login_title')}
                    </h1>
                    <p className="text-white/60">{t('login_subtitle')}</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/40 ml-1">{t('email')}</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="nom@exemple.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-neon-blue/50 transition-all text-white placeholder:text-white/20"
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-blue hover:scale-[1.02] active:scale-[0.98] py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <span>{t('login_button')}</span>
                                <Sparkles className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                {message && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 text-center text-sm text-neon-blue font-medium"
                    >
                        {message}
                    </motion.p>
                )}
            </motion.div>
        </div>
    )
}
