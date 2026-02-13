'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Play } from 'lucide-react'
import { useI18n } from '@/context/LanguageContext'

interface GameCardProps {
    title: string
    url: string
    icon: React.ReactNode
    description: string
    color: string
    className?: string
}

export function GameCard({ title, url, icon, description, color, className }: GameCardProps) {
    const { t } = useI18n()

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`relative group overflow-hidden rounded-3xl glass-morphism p-6 flex flex-col justify-between h-full cursor-pointer hover:border-white/20 transition-colors ${className}`}
            onClick={() => window.open(url, '_blank')}
        >
            {/* Glow Effect */}
            <div
                className="absolute -inset-1 opacity-0 group-hover:opacity-20 transition-opacity blur-2xl z-0"
                style={{ background: color }}
            />

            <div className="relative z-10">
                <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: `linear-gradient(135deg, ${color}33, ${color}66)`, border: `1px solid ${color}44` }}
                >
                    <div style={{ color: color }}>{icon}</div>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                    {title}
                </h3>
                <p className="text-white/50 text-sm line-clamp-2">
                    {description}
                </p>
            </div>

            <div className="relative z-10 mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/40 group-hover:text-white/80 transition-colors">
                    <Play className="w-3 h-3" />
                    {t('play')}
                </div>
                <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
            </div>
        </motion.div>
    )
}
