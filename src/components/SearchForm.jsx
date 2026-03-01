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
        <div className="lg:col-span-3 space-y-2" ref={containerRef}>
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                {Icon && <Icon size={14} className="text-tet-red" />} {label}
            </label>
            <div className="relative group">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "w-full bg-white border-2 border-gray-100 rounded-xl py-3 px-4 outline-none transition-all flex items-center justify-between group-hover:border-tet-red/30",
                        isOpen && "border-tet-red ring-4 ring-tet-red/10 shadow-lg"
                    )}
                >
                    <span className={cn("font-bold text-base transition-colors", value ? "text-gray-900" : "text-gray-400")}>
                        {value || placeholder}
                    </span>
                    <ChevronDown size={18} className={cn("text-gray-400 transition-transform duration-300", isOpen && "rotate-180 text-tet-red")} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-xl"
                        >
                            <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
                                {options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            onChange(option);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "w-full text-left px-4 py-3.5 rounded-xl font-bold flex items-center justify-between transition-all group/opt",
                                            value === option
                                                ? "bg-red-50 text-tet-red"
                                                : "hover:bg-gray-50 text-gray-700"
                                        )}
                                    >
                                        <span>{option}</span>
                                        {value === option && <Check size={18} className="text-tet-red" />}
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
                className="bg-white/95 backdrop-blur-2xl border border-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] rounded-[2rem] p-6 md:p-8"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">

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
                    <div className="hidden lg:flex lg:col-span-1 justify-center pb-2.5">
                        <button
                            onClick={swapStations}
                            className="w-10 h-10 bg-red-50 hover:bg-tet-red text-tet-red hover:text-white rounded-full transition-all transform hover:rotate-180 duration-500 shadow-sm border border-red-100 flex items-center justify-center group"
                        >
                            <ArrowRightLeft size={16} className="group-hover:scale-110 transition-transform" />
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
                    <div className="lg:col-span-2 space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                            <CalendarIcon size={14} className="text-tet-red" /> Ngày đi
                        </label>
                        <div className="relative group">
                            <input
                                type="date"
                                className="w-full bg-white border-2 border-gray-100 focus:border-tet-red focus:ring-4 focus:ring-tet-red/10 rounded-xl py-3 px-4 outline-none font-bold text-base text-gray-900 transition-all cursor-pointer group-hover:border-tet-red/30 [&::-webkit-calendar-picker-indicator]:opacity-0"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <CalendarIcon size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-tet-red transition-colors pointer-events-none" />
                        </div>
                    </div>

                    {/* Passengers */}
                    <div className="lg:col-span-1 space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                            <Users size={14} className="text-tet-red" /> HK
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="4"
                            value={passengers}
                            onChange={(e) => setPassengers(e.target.value)}
                            className="w-full bg-white border-2 border-gray-100 focus:border-tet-red focus:ring-4 focus:ring-tet-red/10 rounded-xl py-3 px-3 pr-1 outline-none font-black text-lg text-center text-gray-900 transition-all hover:border-tet-red/30"
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <button
                            onClick={handleSearch}
                            className="w-full bg-tet-yellow hover:bg-[#FFB300] text-red-900 font-black py-3 rounded-xl flex items-center justify-center gap-2 shadow-[0_8px_24px_-4px_rgba(255,193,7,0.3)] transition-all transform hover:scale-[1.02] active:scale-[0.98] text-sm uppercase tracking-tight"
                        >
                            <Search size={16} className="stroke-[3]" /> Tìm kiếm
                        </button>
                    </div>
                </div>

                {/* Quick Filters / Popular Routes */}
                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-gray-50 pt-6">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Gợi ý tìm kiếm:</span>
                    {['Sài Gòn → Hà Nội', 'Sài Gòn → Đà Nẵng', 'Hà Nội → Vinh'].map((route) => (
                        <button
                            key={route}
                            onClick={() => {
                                const parts = route.split(' → ');
                                setFrom(parts[0]);
                                setTo(parts[parts.length - 1]);
                            }}
                            className="text-[10px] font-black px-4 py-2 bg-gray-50 text-gray-600 hover:bg-tet-red/5 hover:text-tet-red rounded-lg transition-all border border-transparent hover:border-tet-red/20 shadow-sm"
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

