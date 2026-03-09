import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Train, User, ChevronRight, Languages, Check, Bell, Plane, Hotel, TrainFront, Bus, Car, Ticket, MoreHorizontal, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const isLightHeader = isScrolled || location.pathname !== '/';
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

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsLangOpen(false);
    };

    const topNavLinks = [
        { name: t('header.promotions'), href: '#', icon: <div className="w-5 h-5 flex items-center justify-center bg-tet-yellow rounded-full text-[10px] text-red-700 font-bold">%</div> },
        { name: t('header.explore'), href: '/explore' },
        { name: t('header.contact'), href: '#' },
        { name: t('header.my_bookings'), href: '#' },
    ];

    const bottomNavLinks = [
        { name: t('header.train_se_tn'), icon: <Train size={18} />, href: '#' },
        { name: t('header.train_tet'), icon: <TrainFront size={18} className="text-tet-red" />, href: '#' },
        { name: t('header.schedule'), icon: <Bus size={18} />, href: '#' },
        { name: t('header.promotions'), icon: <Ticket size={18} />, href: '#' },
        { name: t('header.support'), icon: <MoreHorizontal size={18} />, href: '#' },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
                isLightHeader ? "bg-white shadow-md text-gray-800" : "bg-gradient-to-b from-black/50 to-transparent text-white"
            )}
        >
            <div className="max-w-7xl mx-auto">
                {/* Top Bar */}
                <div className="flex items-center justify-between px-4 md:px-6 py-2 md:py-3 border-b border-white/10">
                    <div className="flex items-center gap-8">
                        {/* Logo Section */}
                        <Link to="/" className="flex items-center gap-1.5 md:gap-2 group shrink-0">
                            <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-tet-red to-red-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
                                <Train className="text-white" size={16} />
                            </div>
                            <div className="flex flex-col">
                                <span className={cn(
                                    "text-base md:text-lg font-black tracking-tighter leading-none transition-colors",
                                    isLightHeader ? "text-gray-900" : "text-white"
                                )}>
                                    VÉ <span className="text-tet-red group-hover:text-tet-yellow transition-colors">TÀU</span>
                                </span>
                                <span className={cn(
                                    "text-[6px] md:text-[7px] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] transition-opacity mt-0.5",
                                    isLightHeader ? "text-gray-400" : "text-white/60"
                                )}>{t('header.online_booking')}</span>
                            </div>
                        </Link>

                        {/* Top Nav (Desktop) */}
                        <nav className="hidden xl:flex items-center gap-6">
                            <div className="relative" ref={langRef}>
                                <button
                                    onClick={() => setIsLangOpen(!isLangOpen)}
                                    className={cn(
                                        "flex items-center gap-2 px-2 py-0.5 rounded border text-[11px] font-bold transition-colors cursor-pointer",
                                        isLightHeader ? "bg-gray-100 border-gray-200 hover:bg-gray-200" : "bg-white/10 border-white/20 hover:bg-white/20"
                                    )}
                                >
                                    <img
                                        src={currentLang === 'VI' ? "https://flagcdn.com/w40/vn.png" : "https://flagcdn.com/w40/us.png"}
                                        alt={currentLang}
                                        className="w-4 h-3 object-cover rounded-xs"
                                    />
                                    <span>VND | {currentLang}</span>
                                </button>

                                <AnimatePresence>
                                    {isLangOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl shadow-black/10 border border-gray-100 py-2 hidden xl:block z-50 overflow-hidden"
                                        >
                                            <button
                                                onClick={() => changeLanguage('vi')}
                                                className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between group transition-colors cursor-pointer"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <img src="https://flagcdn.com/w40/vn.png" alt="VN" className="w-6 h-4 object-cover rounded shadow-sm" />
                                                    <span className="text-sm font-bold text-gray-800 group-hover:text-tet-red transition-colors">Tiếng Việt</span>
                                                </div>
                                                {currentLang === 'VI' && <Check size={16} className="text-tet-red" />}
                                            </button>
                                            <button
                                                onClick={() => changeLanguage('en')}
                                                className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between group transition-colors cursor-pointer"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <img src="https://flagcdn.com/w40/us.png" alt="EN" className="w-6 h-4 object-cover rounded shadow-sm" />
                                                    <span className="text-sm font-bold text-gray-800 group-hover:text-tet-red transition-colors">English</span>
                                                </div>
                                                {currentLang === 'EN' && <Check size={16} className="text-tet-red" />}
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            {topNavLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-[13px] font-bold hover:text-tet-red transition-colors flex items-center gap-2"
                                >
                                    {link.icon}
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-3">
                            <Link
                                to="/login"
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-[14px] transition-all",
                                    isLightHeader
                                        ? "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50"
                                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-sm"
                                )}
                            >
                                <User size={16} />
                                <span>{t('header.login')}</span>
                            </Link>
                            <Link
                                to="/register"
                                className="bg-tet-red hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold text-[14px] shadow-lg shadow-tet-red/20 transition-all"
                            >
                                {t('header.register')}
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="xl:hidden p-2 rounded-lg"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Bottom Bar (Desktop Categories) */}
                <div className="hidden xl:flex items-center gap-8 px-6 py-2 overflow-x-auto scrollbar-hide">
                    {bottomNavLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={cn(
                                "flex items-center gap-2 text-[13px] font-bold py-2 border-b-2 border-transparent hover:border-tet-red hover:text-tet-red transition-all whitespace-nowrap opacity-90 hover:opacity-100",
                                isLightHeader ? "text-gray-600" : "text-white"
                            )}
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed inset-0 bg-white z-[110] p-6 text-gray-800"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <Link to="/" className="flex items-center gap-1.5 group" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="w-8 h-8 bg-gradient-to-br from-tet-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Train className="text-white" size={16} />
                                </div>
                                <span className="text-lg font-black tracking-tighter text-gray-900">
                                    VÉ <span className="text-tet-red">TÀU</span>
                                </span>
                            </Link>
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="bg-gray-50 p-4 rounded-xl flex flex-col items-center gap-2 border border-gray-100 hover:bg-gray-100 transition-colors"
                                >
                                    <User size={24} className="text-tet-red" />
                                    <span className="font-bold text-sm">{t('header.login')}</span>
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="bg-tet-red text-white p-4 rounded-xl flex flex-col items-center gap-2 shadow-lg shadow-tet-red/20 hover:bg-red-700 transition-colors"
                                >
                                    <LogIn size={24} />
                                    <span className="font-bold text-sm">{t('header.register')}</span>
                                </Link>
                            </div>
                            <div className="h-px bg-gray-100 my-2" />
                            {bottomNavLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="flex items-center gap-4 p-3 font-bold hover:text-tet-red hover:bg-red-50 rounded-xl transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
