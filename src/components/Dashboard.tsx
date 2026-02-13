'use client'

import { motion } from 'framer-motion'
import { GameCard } from './ui/GameCard'
import {
    Users,
    Dices,
    RotateCcw,
    Calculator,
    MessageCircle,
    Timer,
    Skull,
    Smartphone,
    Gamepad2,
    LogOut,
    Globe
} from 'lucide-react'
import { useI18n } from '@/context/LanguageContext'
import { createClient } from '@/lib/supabase-browser'
import { Language } from '@/lib/translations'

const GAMES = [
    {
        key: 'tu_preferes',
        title: 'Tu Préfères',
        url: 'https://tu-preferes-2026.vercel.app',
        icon: <Users />,
        color: '#00f2fe',
        size: 'col-span-1 row-span-2'
    },
    {
        key: 'bad_choices',
        title: 'Bad Choices',
        url: 'https://bad-choices-2026.vercel.app',
        icon: <Skull />,
        color: '#ff00c1',
        size: 'col-span-1 row-span-1'
    },
    {
        key: 'mouton_mouton',
        title: 'Mouton Mouton',
        url: 'https://mouton-mouton-2026.vercel.app',
        icon: <Gamepad2 />,
        color: '#7000ff',
        size: 'col-span-1 row-span-1'
    },
    {
        key: '20_balles',
        title: '20 balles pour ça',
        url: 'https://20-balles-2026.vercel.app',
        icon: <Calculator />,
        color: '#FFD700',
        size: 'col-span-2 row-span-1'
    },
    {
        key: 'quen_dira_t_on',
        title: 'Qu’en dira-t-on',
        url: 'https://quen-dira-t-on-2026.vercel.app',
        icon: <MessageCircle />,
        color: '#00FA9A',
        size: 'col-span-1 row-span-1'
    },
    {
        key: 'one_round',
        title: 'One Round',
        url: 'https://one-round-2026.vercel.app',
        icon: <RotateCcw />,
        color: '#FF4500',
        size: 'col-span-1 row-span-2'
    },
    {
        key: 'times_up',
        title: "Time's Up",
        url: 'https://times-up-2026.vercel.app',
        icon: <Timer />,
        color: '#1E90FF',
        size: 'col-span-1 row-span-1'
    },
    {
        key: 'fiesta',
        title: 'Fiesta de los Muertos',
        url: 'https://fiesta-muertos-2026.vercel.app',
        icon: <Dices />,
        color: '#FF69B4',
        size: 'col-span-1 row-span-1'
    },
    {
        key: 'heads_up',
        title: 'Heads up',
        url: 'https://heads-up-game-kev.vercel.app',
        icon: <Smartphone />,
        color: '#ADFF2F',
        size: 'col-span-2 row-span-1'
    }
]

export function Dashboard({ user }: { user: any }) {
    const { t, lang, setLang } = useI18n()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        window.location.reload()
    }

    return (
        <div className="min-h-screen mesh-gradient relative pb-20 overflow-x-hidden">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

            {/* Header */}
            <nav className="relative z-20 flex justify-between items-center p-6 lg:p-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center glass border border-white/10">
                        <Gamepad2 className="text-neon-blue" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">CrIAtive Club</h1>
                        <p className="text-white/40 text-sm hidden sm:block">{t('welcome')} {user.email?.split('@')[0]}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                        {(['fr', 'en', 'es'] as Language[]).map((l) => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === l ? 'bg-white/10 text-white shadow-lg' : 'text-white/30 hover:text-white/60'
                                    }`}
                            >
                                {l.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-all border border-white/10"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </nav>

            {/* Main Grid */}
            <main className="relative z-20 max-w-7xl mx-auto px-6 mt-4">
                <div className="mb-10">
                    <h2 className="text-4xl lg:text-5xl font-black mb-2 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                        {t('subtitle')}
                    </h2>
                    <div className="h-1 w-20 bg-neon-blue rounded-full shadow-[0_0_15px_rgba(0,242,254,0.5)]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]">
                    {GAMES.map((game, index) => (
                        <GameCard
                            key={game.key}
                            title={game.title}
                            url={game.url}
                            icon={game.icon}
                            color={game.color}
                            description={t(`description_${game.key}` as any)}
                            className={game.size}
                        />
                    ))}
                </div>
            </main>

            {/* Footer Decoration */}
            <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
        </div>
    )
}
