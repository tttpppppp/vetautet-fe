import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar as CalendarIcon, Users, Search, ArrowRightLeft, ChevronDown, Check, Plane, Hotel, Bus, Car, Ticket, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const CustomSelect = ({ value, onChange, options, placeholder, icon: Icon, label, variant = 'dark' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt === value);

    return (
        <div className="lg:col-span-3 space-y-1" ref={containerRef}>
            <label className={cn("text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 px-1 drop-shadow-sm", variant === 'dark' ? "text-white/90" : "text-gray-500")}>
                {Icon && <Icon size={11} className={variant === 'dark' ? "text-tet-yellow" : "text-tet-red"} />} {label}
            </label>
            <div className="relative group">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "w-full rounded-lg py-2 px-3 outline-none transition-all flex items-center justify-between",
                        variant === 'dark'
                            ? "bg-white/90 backdrop-blur-sm border border-white/50 group-hover:border-white"
                            : "bg-white border border-gray-200 group-hover:border-gray-300 shadow-sm",
                        isOpen && (variant === 'dark' ? "border-white ring-2 ring-white/30 shadow-md bg-white" : "border-tet-red ring-2 ring-red-100 shadow-md bg-white")
                    )}
                >
                    <span className={cn("font-bold text-sm transition-colors", value ? "text-gray-900" : "text-gray-400")}>
                        {value || placeholder}
                    </span>
                    <ChevronDown size={14} className={cn("text-gray-400 transition-transform duration-300", isOpen && "rotate-180 text-tet-red")} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-xl"
                        >
                            <div className="max-h-[240px] overflow-y-auto p-1.5 scrollbar-hide">
                                {options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            onChange(option);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "w-full text-left px-3 py-2.5 rounded-lg font-bold text-sm flex items-center justify-between transition-all group/opt",
                                            value === option
                                                ? "bg-red-50 text-tet-red"
                                                : "hover:bg-gray-50 text-gray-700"
                                        )}
                                    >
                                        <span>{option}</span>
                                        {value === option && <Check size={14} className="text-tet-red" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const SearchForm = ({ variant = 'dark' }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('Khách sạn');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [passengers, setPassengers] = useState(1);

    const categories = [
        { name: 'Khách sạn', icon: <Hotel size={20} /> },
        { name: 'Vé máy bay', icon: <Plane size={20} /> },
        { name: 'Vé xe khách', icon: <Bus size={20} /> },
        { name: 'Đưa đón sân bay', icon: <Plane size={20} className="rotate-45" /> },
        { name: 'Cho thuê xe', icon: <Car size={20} /> },
        { name: 'Hoạt động & Vui chơi', icon: <Ticket size={20} /> },
        { name: 'Khác', icon: <MoreHorizontal size={20} /> },
    ];

    const fromOptions = [
        t('search.stations.saigon'),
        t('search.stations.hanoi'),
        t('search.stations.danang'),
        t('search.stations.nhatrang'),
        t('search.stations.hue')
    ];

    const toOptions = [
        t('search.stations.hanoi'),
        t('search.stations.saigon'),
        t('search.stations.danang'),
        t('search.stations.vinh'),
        t('search.stations.haiphong')
    ];

    const swapStations = () => {
        setFrom(to);
        setTo(from);
    };

    const handleSearch = () => {
        navigate('/search');
    };

    return (
        <div className="max-w-7xl mx-auto px-0 sm:px-4 relative z-30">


            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8"
            >
                {/* Secondary Filters - scrollable on mobile */}
                <div className="flex gap-1.5 sm:gap-2 md:gap-3 mb-3 sm:mb-4 md:mb-6 overflow-x-auto scrollbar-hide pb-1 justify-center sm:justify-start">
                    {[
                        { key: 'all', label: t('search.quick_filters.all') },
                        { key: 'se_tn', label: t('search.quick_filters.se_tn') },
                        { key: 'clc', label: t('search.quick_filters.clc') },
                        { key: 'suburban', label: t('search.quick_filters.suburban') }
                    ].map(filter => (
                        <button key={filter.key} className={cn(
                            "px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-bold border transition-all backdrop-blur-sm whitespace-nowrap shrink-0",
                            filter.key === 'all'
                                ? "bg-tet-red border-tet-red text-white shadow-md"
                                : variant === 'dark'
                                    ? "border-white/40 text-white/90 hover:bg-white/20 hover:border-white/60 bg-white/10"
                                    : "border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 bg-white shadow-sm"
                        )}>
                            {filter.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-3 md:gap-4 items-end">

                    {/* Location Group */}
                    <div className="sm:col-span-2 lg:col-span-7 relative flex flex-col sm:flex-row items-end gap-5 sm:gap-3 md:gap-4">
                        {/* From Station */}
                        <div className="w-full sm:flex-1 relative z-10">
                            <CustomSelect
                                label={t('search.from_label')}
                                icon={MapPin}
                                placeholder={t('search.from_placeholder')}
                                value={from}
                                onChange={setFrom}
                                options={fromOptions}
                                variant={variant}
                            />
                        </div>

                        {/* Swap Button */}
                        <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 sm:static sm:translate-x-0 sm:translate-y-0 z-20 flex items-center justify-center shrink-0 sm:pb-1">
                            <button
                                onClick={swapStations}
                                className={cn(
                                    "w-8 h-8 rounded-full transition-all transform hover:-rotate-180 duration-500 flex items-center justify-center group shadow-md border-2",
                                    variant === 'dark'
                                        ? "bg-white hover:bg-tet-red border-white/50 text-tet-red hover:text-white"
                                        : "bg-white hover:bg-tet-red border-gray-100 text-tet-red hover:text-white"
                                )}
                            >
                                <ArrowRightLeft size={14} className="group-hover:scale-110 transition-transform rotate-90 sm:rotate-0 stroke-[2.5]" />
                            </button>
                        </div>

                        {/* To Station */}
                        <div className="w-full sm:flex-1 relative z-10">
                            <CustomSelect
                                label={t('search.to_label')}
                                icon={MapPin}
                                placeholder={t('search.to_placeholder')}
                                value={to}
                                onChange={setTo}
                                options={toOptions}
                                variant={variant}
                            />
                        </div>
                    </div>

                    {/* Date Picker */}
                    <div className="sm:col-span-1 lg:col-span-2 space-y-1">
                        <label className={cn("text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 px-1 drop-shadow-sm", variant === 'dark' ? "text-white/90" : "text-gray-500")}>
                            <CalendarIcon size={11} className={variant === 'dark' ? "text-tet-yellow" : "text-tet-red"} /> {t('search.date_label')}
                        </label>
                        <div className="relative group">
                            <input
                                type="date"
                                className={cn(
                                    "w-full rounded-lg py-2 px-3 outline-none font-bold text-sm text-gray-900 transition-all cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0",
                                    variant === 'dark'
                                        ? "bg-white/90 backdrop-blur-sm border border-white/50 focus:border-white focus:ring-2 focus:ring-white/30 group-hover:border-white"
                                        : "bg-white border border-gray-200 focus:border-tet-red focus:ring-2 focus:ring-red-100 group-hover:border-gray-300 shadow-sm"
                                )}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <CalendarIcon size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-tet-red transition-colors pointer-events-none" />
                        </div>
                    </div>

                    {/* Passengers */}
                    <div className="sm:col-span-1 lg:col-span-1 space-y-1">
                        <label className={cn("text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 px-1 drop-shadow-sm", variant === 'dark' ? "text-white/90" : "text-gray-500")}>
                            <Users size={11} className={variant === 'dark' ? "text-tet-yellow" : "text-tet-red"} /> {t('search.passengers_label')}
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="4"
                            value={passengers}
                            onChange={(e) => setPassengers(e.target.value)}
                            className={cn(
                                "w-full rounded-lg py-2 px-2 outline-none font-black text-sm text-center text-gray-900 transition-all",
                                variant === 'dark'
                                    ? "bg-white/90 backdrop-blur-sm border border-white/50 focus:border-white focus:ring-2 focus:ring-white/30 hover:border-white"
                                    : "bg-white border border-gray-200 focus:border-tet-red focus:ring-2 focus:ring-red-100 hover:border-gray-300 shadow-sm"
                            )}
                        />
                    </div>

                    {/* Search Button */}
                    <div className="sm:col-span-2 lg:col-span-2 mt-1 sm:mt-0">
                        <button
                            onClick={handleSearch}
                            className="w-full h-10 lg:h-[38px] bg-tet-yellow hover:bg-[#FFB300] text-red-900 font-black rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-tet-yellow/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] text-sm uppercase tracking-tight"
                        >
                            <Search size={16} className="stroke-[3]" /> {t('search.cta')}
                        </button>
                    </div>
                </div>

                {/* Quick Filters / Popular Routes */}
                <div className={cn("mt-3 sm:mt-4 md:mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2 border-t pt-2.5 sm:pt-3", variant === 'dark' ? "border-white/20" : "border-gray-100")}>
                    <span className={cn("text-[9px] font-black uppercase tracking-wider block w-full md:w-auto mb-1 md:mb-0 drop-shadow-sm", variant === 'dark' ? "text-white/70" : "text-gray-500")}>{t('search.suggestions')}</span>
                    <div className="flex flex-wrap gap-2">
                        {[
                            `${t('search.stations.saigon')} → ${t('search.stations.hanoi')}`,
                            `${t('search.stations.saigon')} → ${t('search.stations.danang')}`,
                            `${t('search.stations.hanoi')} → ${t('search.stations.vinh')}`
                        ].map((route) => (
                            <button
                                key={route}
                                onClick={() => {
                                    const parts = route.split(' → ');
                                    setFrom(parts[0]);
                                    setTo(parts[parts.length - 1]);
                                }}
                                className={cn(
                                    "text-[9px] font-bold px-3 py-1.5 rounded-md transition-all border",
                                    variant === 'dark'
                                        ? "bg-white/20 backdrop-blur-sm text-white/90 hover:bg-white/30 hover:text-white border-white/20 hover:border-white/40"
                                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-gray-200"
                                )}
                            >
                                {route}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SearchForm;

