import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Train, User, ChevronRight, Languages, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t, i18n } = useTranslation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const langRef = useRef(null);

    const currentLang = i18n.language.includes('en') ? 'EN' : 'VI';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        const handleClickOutside = (event) => {
            if (langRef.current && !langRef.current.contains(event.target)) {
                setIsLangOpen(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const navLinks = [
        { name: t('header.home'), href: '/' },
        { name: t('header.explore'), href: '/explore' },
        { name: t('header.promotions'), href: '#' },
        { name: t('header.contact'), href: '#' },
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsLangOpen(false);
    };

    return (
        <header
            className={cn(
                "fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 w-[95%] lg:w-[90%] max-w-7xl",
                isScrolled ? "top-4" : "top-6"
            )}
        >
            <div
                className={cn(
                    "flex items-center justify-between px-4 md:px-6 transition-all duration-500 rounded-full",
                    isScrolled
                        ? "bg-white/90 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] py-2"
                        : "bg-black/20 backdrop-blur-md border border-white/10 py-3"
                )}
            >
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-1.5 md:gap-2 group shrink-0">
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-tet-red to-red-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
                        <Train className="text-white" size={16} />
                    </div>
                    <div className="flex flex-col">
                        <span className={cn(
                            "text-base md:text-lg font-black tracking-tighter leading-none transition-colors",
                            isScrolled ? "text-gray-900" : "text-white"
                        )}>
                            VÉ <span className="text-tet-red group-hover:text-tet-yellow transition-colors">TÀU</span>
                        </span>
                        <span className={cn(
                            "text-[6px] md:text-[7px] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] transition-opacity mt-0.5",
                            isScrolled ? "text-gray-400" : "text-white/60"
                        )}>{t('header.online_booking')}</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={cn(
                                "text-[13px] font-bold transition-all relative py-1 group",
                                isScrolled ? "text-gray-600 hover:text-tet-red" : "text-white/90 hover:text-white"
                            )}
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tet-red transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="flex items-center gap-2 md:gap-4" ref={langRef}>
                        {/* Language Selector Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className={cn(
                                    "flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-full border transition-all text-[11px] md:text-[12px] font-black group",
                                    isScrolled
                                        ? "bg-gray-50 border-gray-100 text-gray-600 hover:bg-red-50 hover:text-tet-red"
                                        : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                                )}
                            >
                                <div className="w-4 h-4 rounded-full overflow-hidden border border-white/20">
                                    <img
                                        src={currentLang === 'VI' ? "https://flagcdn.com/w40/vn.png" : "https://flagcdn.com/w40/gb.png"}
                                        alt={currentLang}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="tracking-widest uppercase">{currentLang}</span>
                            </button>

                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full right-0 mt-3 w-40 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-2xl p-2 overflow-hidden z-[110]"
                                    >
                                        <button
                                            onClick={() => changeLanguage('vi')}
                                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-red-50 transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img src="https://flagcdn.com/w40/vn.png" alt="VN" className="w-5 h-3.5 object-cover rounded-sm shadow-sm" />
                                                <span className={cn("text-xs font-bold", currentLang === 'VI' ? "text-tet-red" : "text-gray-600")}>Tiếng Việt</span>
                                            </div>
                                            {currentLang === 'VI' && <Check size={14} className="text-tet-red" />}
                                        </button>
                                        <button
                                            onClick={() => changeLanguage('en')}
                                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-red-50 transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img src="https://flagcdn.com/w40/gb.png" alt="EN" className="w-5 h-3.5 object-cover rounded-sm shadow-sm" />
                                                <span className={cn("text-xs font-bold", currentLang === 'EN' ? "text-tet-red" : "text-gray-600")}>English</span>
                                            </div>
                                            {currentLang === 'EN' && <Check size={14} className="text-tet-red" />}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="w-px h-4 md:h-6 bg-gray-200/50 hidden md:block" />

                        <Link to="/profile" className="flex items-center gap-2 text-[12px] md:text-[13px] font-black text-gray-500 hover:text-tet-red transition-all group">
                            <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-red-50 group-hover:shadow-md transition-all">
                                <User size={14} className="group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="hidden sm:inline">Phạm Kỳ Anh</span>
                        </Link>
                        <button className="hidden sm:flex bg-gradient-to-r from-tet-red to-red-600 text-white pl-5 pr-3 py-1.5 md:pl-6 md:pr-4 md:py-2 rounded-full font-black text-[10px] md:text-xs uppercase tracking-wider items-center gap-2 md:gap-3 hover:translate-x-1 transition-all shadow-lg shadow-tet-red/20 active:scale-95 group">
                            {t('header.book_now')}
                            <div className="w-4 h-4 md:w-5 md:h-5 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-tet-red transition-all">
                                <ChevronRight size={10} />
                            </div>
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={cn(
                            "lg:hidden p-2 rounded-xl transition-colors",
                            isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
                        )}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed inset-x-0 top-[110%] bg-white/95 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-2xl p-6 lg:hidden origin-top"
                    >
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-lg font-black text-gray-800 p-4 rounded-2xl hover:bg-red-50 hover:text-tet-red transition-all flex items-center justify-between group"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                    <ChevronRight size={18} className="text-gray-300 group-hover:text-tet-red group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                            <div className="h-px bg-gray-100 my-4" />
                            <div className="space-y-3">
                                <Link
                                    to="/login"
                                    className="w-full bg-gray-50 text-gray-800 font-bold py-4 rounded-2xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2 border border-gray-100"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <User size={20} /> {t('header.login_register')}
                                </Link>
                                <button
                                    className="w-full bg-tet-red text-white font-black py-4 rounded-2xl hover:bg-tet-red-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-tet-red/20"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t('header.book_now')} <ChevronRight size={18} />
                                </button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
