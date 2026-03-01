import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ChevronRight, Train } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
    {
        image: 'https://images.unsplash.com/photo-1590490333550-617882208035?auto=format&fit=crop&q=80&w=2000', // Vietnam train
        title: 'Đặt Vé Tàu Trực Tuyến',
        subtitle: 'Nhanh chóng, an toàn và ngập tràn ưu đãi cho mọi hành trình của bạn.',
        highlight: 'Sum họp'
    },
    {
        image: 'https://images.unsplash.com/photo-1562232537-88d447f5a502?auto=format&fit=crop&q=80&w=2000', // Vietnam scenery
        title: 'Kết Nối Mọi Miền Tổ Quốc',
        subtitle: 'Hệ thống đặt vé thông minh giúp bạn tìm được chuyến đi ưng ý nhất chỉ trong vài cú click.',
        highlight: 'Thông minh'
    },
    {
        image: 'https://images.unsplash.com/photo-1542171221-874288034bf0?auto=format&fit=crop&q=80&w=2000', // Train station
        title: 'Hành Trình Bình An',
        subtitle: 'Trải nghiệm dịch vụ tàu hỏa hiện đại, tiện nghi và chu đáo suốt cả chặng đường.',
        highlight: 'Bình an'
    }
];

const HeroSlider = () => {
    return (
        <section className="relative h-[95vh] w-full overflow-hidden bg-gray-900">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-tet-red/20 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-tet-yellow/10 rounded-full blur-[100px] -z-10" />

            {/* Continuous Falling Petals (Outside Swiper to prevent reset) */}
            <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -50, opacity: 0, rotate: 0 }}
                        animate={{
                            y: [0, 1000],
                            x: [0, Math.sin(i) * 200],
                            opacity: [0, 0.7, 0.4, 0],
                            rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
                            scale: [0.8, 1.2, 0.9]
                        }}
                        transition={{
                            duration: 12 + (i % 5) * 3,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "linear"
                        }}
                        className="absolute"
                        style={{ left: `${(i * 7) % 100}%`, top: "-10%" }}
                    >
                        {/* Petal Shape - alternating between Yellow (Mai) and Pink (Đào) */}
                        <div
                            className={cn(
                                "w-4 h-5 rounded-[40%_60%_70%_30%] blur-[0.3px] transform shadow-sm",
                                i % 2 === 0
                                    ? "bg-gradient-to-br from-[#FFD54F] to-[#FBC02D]" // Yellow Mai
                                    : "bg-gradient-to-br from-[#FF80AB] to-[#F48FB1]" // Pink Đào
                            )}
                            style={{
                                rotate: `${i * 45}deg`,
                                boxShadow: `0 0 10px ${i % 2 === 0 ? 'rgba(255,213,79,0.3)' : 'rgba(255,128,171,0.3)'}`
                            }}
                        />
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
                        return `<span class="${className} !bg-tet-yellow !w-3 !h-3"></span>`;
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
                                    {/* Main Gradient Scrim */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
                                    {/* Top Scrim for Header */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent h-1/3 z-10" />
                                    {/* Bottom Vignette */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                                </div>

                                {/* Content Container */}
                                <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-center relative z-20">
                                    <div className="max-w-3xl pt-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                            transition={{ duration: 0.8, delay: 0.3 }}
                                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-1.5 rounded-full mb-6"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-tet-yellow shadow-[0_0_8px_#FFC107]" />
                                            <span className="text-white font-bold uppercase tracking-widest text-[10px]">Hệ thống đặt vé tàu</span>
                                        </motion.div>

                                        <motion.h1
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight drop-shadow-lg"
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
                                            className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl font-medium"
                                        >
                                            {slide.subtitle}
                                        </motion.p>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                            transition={{ duration: 0.8, delay: 0.9 }}
                                            className="flex flex-wrap items-center gap-5"
                                        >
                                            <button className="bg-tet-red hover:bg-tet-red-dark text-white px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-3 shadow-xl shadow-tet-red/30 transition-all transform hover:scale-105 active:scale-95 group">
                                                Đặt vé ngay <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all">
                                                <Train size={22} /> Xem lịch trình
                                            </button>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Branch Decoration (Clean) */}
            <div className="absolute top-0 right-0 z-30 pointer-events-none opacity-40 mix-blend-screen">
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

            {/* Bottom Scrim to improve Search Card connection */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-transparent to-transparent z-25 pointer-events-none" />
        </section>
    );
};

export default HeroSlider;
