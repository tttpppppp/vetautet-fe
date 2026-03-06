import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ChevronRight, Train } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HORSE_SVG_PATH = "M13 18c0 0 .5 1 2 1s2-1 2-1v3c0 0-2 1-4 0s-2-3-2-3M7 18c0 0 .5 1 2 1s2-1 2-1v3c0 0-2 1-4 0s-2-3-2-3m14-9s-2 3-5 3c-3 0-5-3-5-3l-2 2s-2 2-5 1c-3-1-3-4-3-4s2-1 4-1 3 2 3 2l3-3s2-2 5-2 5 2 5 2M16 6s1-2 3-2 3 2 3 2l-1 3";

const HeroSlider = () => {
    const { t } = useTranslation();

    const slides = [
        {
            image: 'https://images.unsplash.com/photo-1590490333550-617882208035?auto=format&fit=crop&q=80&w=2000',
            title: t('hero.title_1'),
            subtitle: t('hero.subtitle_1'),
            highlight: t('hero.highlight_1')
        },
        {
            image: 'https://images.unsplash.com/photo-1562232537-88d447f5a502?auto=format&fit=crop&q=80&w=2000',
            title: t('hero.title_2'),
            subtitle: t('hero.subtitle_2'),
            highlight: t('hero.highlight_2')
        },
        {
            image: 'https://images.unsplash.com/photo-1542171221-874288034bf0?auto=format&fit=crop&q=80&w=2000',
            title: t('hero.title_3'),
            subtitle: t('hero.subtitle_3'),
            highlight: t('hero.highlight_3')
        }
    ];

    return (
        <section className="relative h-[80vh] md:h-[95vh] w-full overflow-hidden bg-gray-900">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-tet-red/20 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-tet-yellow/10 rounded-full blur-[100px] -z-10" />

            {/* Flower Gradients Definition */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <radialGradient id="maiGradient">
                        <stop offset="0%" stopColor="#FFFDE7" />
                        <stop offset="40%" stopColor="#FFF176" />
                        <stop offset="100%" stopColor="#FBC02D" />
                    </radialGradient>
                    <radialGradient id="daoGradient">
                        <stop offset="0%" stopColor="#FCE4EC" />
                        <stop offset="40%" stopColor="#F48FB1" />
                        <stop offset="100%" stopColor="#E91E63" />
                    </radialGradient>
                </defs>
            </svg>

            {/* Continuous Falling Petals & Horses */}
            <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                {[...Array(16)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -50, opacity: 0, rotate: 0 }}
                        animate={{
                            y: [0, 1000],
                            x: [0, Math.sin(i) * 200 * (i % 2 === 0 ? 1 : -1)],
                            opacity: [0, 1, 0.8, 0],
                            rotate: [0, 720 * (i % 2 === 0 ? 1 : -1)],
                            scale: [0.5, 1.2, 0.7]
                        }}
                        transition={{
                            duration: 12 + (i % 6) * 5,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "linear"
                        }}
                        className="absolute"
                        style={{ left: `${(i * 7) % 100}%`, top: "-10%" }}
                    >
                        {/* Realistic Blossom (Mai or Dao) */}
                        <svg width={i % 3 === 0 ? "32" : "22"} height={i % 3 === 0 ? "32" : "22"} viewBox="0 0 24 24" className="drop-shadow-md">
                            <g transform="translate(12,12)">
                                {/* 5 Petals with realistic heart-shape */}
                                {[0, 72, 144, 216, 288].map((angle) => (
                                    <path
                                        key={angle}
                                        d="M0,0 C-3,-6 -6,-10 0,-11 C6,-10 3,-6 0,0"
                                        fill={i % 2 === 0 ? "url(#maiGradient)" : "url(#daoGradient)"}
                                        transform={`rotate(${angle})`}
                                        className="opacity-95"
                                    />
                                ))}
                                {/* Center of the flower */}
                                <circle r="1.8" fill={i % 2 === 0 ? "#E65100" : "#880E4F"} />
                                <circle r="0.6" fill="#FFF" className="animate-pulse" />
                            </g>
                        </svg>
                    </motion.div>
                ))}
            </div>

            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    renderBullet: (index, className) => {
                        return `<span class="${className} !bg-tet-yellow !w-2 !h-2 md:!w-3 md:!h-3"></span>`;
                    }
                }}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="h-full w-full">
                        {({ isActive }) => (
                            <div className="relative h-full w-full">
                                {/* Background Image with Multi-layer Overlay */}
                                <div
                                    className={cn(
                                        "absolute inset-0 bg-cover bg-center transition-transform duration-[12000ms] ease-out",
                                        isActive ? "scale-110" : "scale-100"
                                    )}
                                    style={{ backgroundImage: `url(${slide.image})` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent md:via-black/40 z-10" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent h-1/3 z-10" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                                </div>

                                {/* Content Container */}
                                <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-center relative z-20">
                                    <div className="max-w-3xl pt-20 md:pt-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                            transition={{ duration: 0.8, delay: 0.3 }}
                                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 px-3 py-1 md:px-4 md:py-1.5 rounded-full mb-4 md:mb-6"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-tet-yellow shadow-[0_0_8px_#FFC107]" />
                                            <span className="text-white font-bold uppercase tracking-widest text-[9px] md:text-[10px]">{t('hero.system_tag')}</span>
                                        </motion.div>

                                        <motion.h1
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-4 md:mb-6 leading-[1.2] md:leading-[1.1] tracking-tight drop-shadow-lg"
                                        >
                                            {slide.title.split(slide.highlight).map((part, i, arr) => (
                                                <React.Fragment key={i}>
                                                    {part}
                                                    {i < arr.length - 1 && (
                                                        <span className="text-tet-yellow">
                                                            {slide.highlight}
                                                        </span>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </motion.h1>

                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                            transition={{ duration: 1, delay: 0.7 }}
                                            className="text-sm md:text-xl text-white/80 mb-8 md:mb-10 leading-relaxed max-w-xl font-medium"
                                        >
                                            {slide.subtitle}
                                        </motion.p>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                            transition={{ duration: 0.8, delay: 0.9 }}
                                            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-5"
                                        >
                                            <button className="bg-tet-red hover:bg-tet-red-dark text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-lg flex items-center justify-center gap-3 shadow-xl shadow-tet-red/20 transition-all transform hover:scale-105 active:scale-95 group">
                                                {t('hero.cta_book')} <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg flex items-center justify-center gap-3 transition-all">
                                                <Train size={18} /> {t('hero.cta_schedule')}
                                            </button>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>


            {/* Branch & Horse Decoration */}
            <div className="absolute top-0 right-0 z-30 pointer-events-none opacity-40 mix-blend-screen scale-75 md:scale-100 origin-top-right">
                <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M400 0C320 40 220 120 180 320" stroke="#FFC107" strokeWidth="1.5" strokeDasharray="10 10" />
                    {[
                        { cx: 380, cy: 30, r: 12, f: "#D32F2F" },
                        { cx: 340, cy: 75, r: 8, f: "#FFC107" },
                        { cx: 290, cy: 140, r: 14, f: "#D32F2F" },
                        { cx: 240, cy: 220, r: 6, f: "#FFC107" }
                    ].map((dot, i) => (
                        <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.f} className="blur-[1px]" />
                    ))}
                </svg>
            </div>

            {/* Year of Horse 2026 Badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, delay: 1 }}
                className="absolute top-24 right-6 md:top-32 md:right-12 z-40 group pointer-events-auto"
            >
                <div className="relative w-24 h-24 md:w-32 md:h-32">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-tet-yellow/30 rounded-full blur-2xl animate-pulse" />

                    {/* Rotating Border */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-tet-yellow/50 rounded-full"
                    />

                    {/* Main Image */}
                    <img
                        src="/horse_2026.png"
                        alt="Bính Ngọ 2026"
                        className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,193,7,0.5)] transform transition-transform group-hover:scale-110"
                    />

                    {/* Badge Text */}
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-tet-red to-tet-red-dark text-white px-2 py-1 rounded-lg text-[8px] md:text-[10px] font-black uppercase tracking-tighter shadow-lg border border-white/20 transform rotate-12">
                        {t('hero.year_badge')}
                    </div>
                </div>
            </motion.div>

            {/* Bottom Scrim */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-transparent to-transparent z-25 pointer-events-none" />
        </section>
    );
};

export default HeroSlider;
