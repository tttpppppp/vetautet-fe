import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar as CalendarIcon, Users, Search, ArrowRightLeft, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const CustomSelect = ({ value, onChange, options, placeholder, icon: Icon, label }) => {
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
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
                {Icon && <Icon size={11} className="text-tet-red" />} {label}
            </label>
            <div className="relative group">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "w-full bg-white border border-gray-200 rounded-lg py-2 px-3 outline-none transition-all flex items-center justify-between group-hover:border-tet-red/30",
                        isOpen && "border-tet-red ring-2 ring-tet-red/10 shadow-md"
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

const SearchForm = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [passengers, setPassengers] = useState(1);

    const fromOptions = ["Sài Gòn", "Hà Nội", "Đà Nẵng", "Nha Trang", "Huế"];
    const toOptions = ["Hà Nội", "Sài Gòn", "Đà Nẵng", "Vinh", "Hải Phòng"];

    const navigate = useNavigate();

    const swapStations = () => {
        setFrom(to);
        setTo(from);
    };

    const handleSearch = () => {
        // Here you would normally pass from, to, date, passengers as query params
        navigate('/search');
    };

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-30">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white/95 backdrop-blur-2xl border border-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] rounded-2xl p-4 md:p-5"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end">

                    {/* From Station */}
                    <CustomSelect
                        label="Ga đi"
                        icon={MapPin}
                        placeholder="Chọn ga đi"
                        value={from}
                        onChange={setFrom}
                        options={fromOptions}
                    />

                    {/* Swap Button (Desktop) */}
                    <div className="hidden lg:flex lg:col-span-1 justify-center pb-1">
                        <button
                            onClick={swapStations}
                            className="w-8 h-8 bg-red-50 hover:bg-tet-red text-tet-red hover:text-white rounded-full transition-all transform hover:rotate-180 duration-500 shadow-sm border border-red-100 flex items-center justify-center group"
                        >
                            <ArrowRightLeft size={13} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    {/* To Station */}
                    <CustomSelect
                        label="Ga đến"
                        icon={MapPin}
                        placeholder="Chọn ga đến"
                        value={to}
                        onChange={setTo}
                        options={toOptions}
                    />

                    {/* Date Picker */}
                    <div className="lg:col-span-2 space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
                            <CalendarIcon size={11} className="text-tet-red" /> Ngày đi
                        </label>
                        <div className="relative group">
                            <input
                                type="date"
                                className="w-full bg-white border border-gray-200 focus:border-tet-red focus:ring-2 focus:ring-tet-red/10 rounded-lg py-2 px-3 outline-none font-bold text-sm text-gray-900 transition-all cursor-pointer group-hover:border-tet-red/30 [&::-webkit-calendar-picker-indicator]:opacity-0"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <CalendarIcon size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-tet-red transition-colors pointer-events-none" />
                        </div>
                    </div>

                    {/* Passengers */}
                    <div className="lg:col-span-1 space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
                            <Users size={11} className="text-tet-red" /> HK
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="4"
                            value={passengers}
                            onChange={(e) => setPassengers(e.target.value)}
                            className="w-full bg-white border border-gray-200 focus:border-tet-red focus:ring-2 focus:ring-tet-red/10 rounded-lg py-2 px-2 pr-1 outline-none font-black text-sm text-center text-gray-900 transition-all hover:border-tet-red/30"
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <button
                            onClick={handleSearch}
                            className="w-full bg-tet-yellow hover:bg-[#FFB300] text-red-900 font-black py-2 rounded-lg flex items-center justify-center gap-2 shadow-[0_8px_24px_-4px_rgba(255,193,7,0.3)] transition-all transform hover:scale-[1.02] active:scale-[0.98] text-xs uppercase tracking-tight"
                        >
                            <Search size={14} className="stroke-[3]" /> Tìm kiếm
                        </button>
                    </div>
                </div>

                {/* Quick Filters / Popular Routes */}
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-50 pt-3">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">Gợi ý:</span>
                    {['Sài Gòn → Hà Nội', 'Sài Gòn → Đà Nẵng', 'Hà Nội → Vinh'].map((route) => (
                        <button
                            key={route}
                            onClick={() => {
                                const parts = route.split(' → ');
                                setFrom(parts[0]);
                                setTo(parts[parts.length - 1]);
                            }}
                            className="text-[9px] font-bold px-3 py-1.5 bg-gray-50 text-gray-600 hover:bg-tet-red/5 hover:text-tet-red rounded-md transition-all border border-transparent hover:border-tet-red/20"
                        >
                            {route}
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default SearchForm;

