import * as React from 'react';
const { useState } = React;
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import TicketCard from '@/components/TicketCard';
import Footer from '@/components/Footer';
import { LayoutGrid, ListFilter, ChevronRight, Train, Clock, CreditCard, Star, Filter, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const dummyTickets = [
    {
        id: 1,
        trainName: 'SE1 Express',
        from: 'Hà Nội',
        to: 'Sài Gòn',
        departureTime: '19:30',
        arrivalTime: '05:30',
        duration: '34h 00m',
        seatType: 'Giường nằm khoang 4',
        price: 1550000,
        remainingSeats: 24,
        popular: true
    },
    {
        id: 2,
        trainName: 'SE3 Express',
        from: 'Hà Nội',
        to: 'Sài Gòn',
        departureTime: '18:00',
        arrivalTime: '04:00',
        duration: '34h 00m',
        seatType: 'Ghế ngồi mềm ĐH',
        price: 980000,
        remainingSeats: 12,
        popular: false
    },
    {
        id: 3,
        trainName: 'SE2 Express',
        from: 'Sài Gòn',
        to: 'Hà Nội',
        departureTime: '21:00',
        arrivalTime: '07:30',
        duration: '34h 30m',
        seatType: 'Giường nằm khoang 6',
        price: 1250000,
        remainingSeats: 45,
        popular: true
    },
    {
        id: 4,
        trainName: 'SE4 Express',
        from: 'Đà Nẵng',
        to: 'Sài Gòn',
        departureTime: '14:20',
        arrivalTime: '08:15',
        duration: '18h 00m',
        seatType: 'Giường nằm khoang 4',
        price: 850000,
        remainingSeats: 8,
        popular: false
    },
    {
        id: 5,
        trainName: 'SE7 Express',
        from: 'Vinh',
        to: 'Đà Nẵng',
        departureTime: '06:00',
        arrivalTime: '14:30',
        duration: '8h 30m',
        seatType: 'Ghế ngồi mềm ĐH',
        price: 450000,
        remainingSeats: 32,
        popular: false
    },
    {
        id: 6,
        trainName: 'TN1 Express',
        from: 'Hà Nội',
        to: 'Nha Trang',
        departureTime: '10:00',
        arrivalTime: '09:00',
        duration: '23h 00m',
        seatType: 'Giường nằm khoang 6',
        price: 1100000,
        remainingSeats: 18,
        popular: true
    }
];

const SearchResults = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [viewType, setViewType] = useState('list');
    const [selectedTrains, setSelectedTrains] = useState([]);

    const toggleTrain = (type) => {
        setSelectedTrains(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    return (
        <main className="min-h-screen bg-white">
            <Header />

            <div className="pt-32 pb-24 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-950/40 to-black" />

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tighter">Kết quả tìm kiếm</h1>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-tet-red/20 text-tet-red rounded-full text-[10px] font-black uppercase tracking-widest border border-tet-red/30">Hành trình Tết 2026</span>
                            <p className="text-gray-400 font-bold text-sm">Tìm thấy {dummyTickets.length} chuyến tàu phù hợp</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="relative mt-6 mb-16 px-4">
                <SearchForm />
            </div>

            <section className="pb-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                        {/* Sidebar Filters */}
                        <aside className={cn(
                            "lg:col-span-1 space-y-6 lg:block",
                            isFilterOpen ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto" : "hidden"
                        )}>
                            <div className="flex items-center justify-between lg:hidden mb-8">
                                <h3 className="text-xl font-black">Bộ lọc</h3>
                                <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-100 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="bg-white rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/50">
                                <h4 className="flex items-center gap-2 text-xs font-black text-gray-900 uppercase tracking-widest mb-6">
                                    <Train size={14} className="text-tet-red" /> Loại tàu
                                </h4>
                                <div className="space-y-4">
                                    {['Tàu SE (Express)', 'Tàu TN (Thống Nhất)', 'Tàu 5 Sao'].map((type) => (
                                        <label key={type} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleTrain(type)}>
                                            <div className={cn(
                                                "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                                                selectedTrains.includes(type)
                                                    ? "bg-tet-red border-tet-red"
                                                    : "border-gray-200 group-hover:border-tet-red/50"
                                            )}>
                                                {selectedTrains.includes(type) && <Check size={12} className="text-white" />}
                                            </div>
                                            <span className={cn(
                                                "text-sm font-bold transition-colors",
                                                selectedTrains.includes(type) ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900"
                                            )}>{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/50">
                                <h4 className="flex items-center gap-2 text-xs font-black text-gray-900 uppercase tracking-widest mb-6">
                                    <Clock size={14} className="text-tet-red" /> Thời gian đi
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {['00:00 - 06:00', '06:00 - 12:00', '12:00 - 18:00', '18:00 - 00:00'].map((time) => (
                                        <button key={time} className="w-full text-center px-2 py-3 rounded-xl border border-gray-100 text-[9px] font-black uppercase tracking-tight text-gray-400 hover:text-tet-red hover:bg-red-50 hover:border-red-100 transition-all">
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/50">
                                <h4 className="flex items-center gap-2 text-xs font-black text-gray-900 uppercase tracking-widest mb-6">
                                    <CreditCard size={14} className="text-tet-red" /> Khoảng giá
                                </h4>
                                <div className="px-2">
                                    <div className="h-2 w-full bg-gray-100 rounded-full relative mb-5">
                                        <div className="absolute left-[15%] right-[25%] h-full bg-gradient-to-r from-tet-red to-red-600 rounded-full"></div>
                                        <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-[3px] border-tet-red rounded-full shadow-lg cursor-pointer"></div>
                                        <div className="absolute right-[25%] top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-[3px] border-tet-red rounded-full shadow-lg cursor-pointer"></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-[10px] font-black text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">350.000đ</div>
                                        <div className="text-[10px] font-black text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">1.800.000đ+</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h4 className="flex items-center gap-2 text-xs font-black text-gray-900 uppercase tracking-widest mb-6">
                                    <Star size={14} className="text-tet-red" /> Tiện ích
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Wifi', 'Ăn uống', 'Điều hòa', 'Sạc pin'].map((s) => (
                                        <button key={s} className="px-4 py-2 bg-gray-50 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-900 hover:text-white transition-all">
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Main Content: Ticket Grid */}
                        <div className="lg:col-span-3">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 px-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-tet-red rounded-full" />
                                    <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Hiển thị {dummyTickets.length} kết quả</p>
                                    <button
                                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-[10px] font-black"
                                    >
                                        <Filter size={12} /> Bộ lọc
                                    </button>
                                </div>
                                <div className="bg-gray-50/80 backdrop-blur-sm p-1 rounded-xl border border-gray-100 flex items-center gap-1">
                                    <button
                                        onClick={() => setViewType('list')}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all",
                                            viewType === 'list' ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
                                        )}
                                    >
                                        <ListFilter size={14} /> Xem ngang
                                    </button>
                                    <button
                                        onClick={() => setViewType('grid')}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all",
                                            viewType === 'grid' ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
                                        )}
                                    >
                                        <LayoutGrid size={14} /> Xem dọc
                                    </button>
                                </div>
                            </div>

                            <div className={cn(
                                "grid gap-6 transition-all duration-300",
                                viewType === 'grid' ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                            )}>
                                {dummyTickets.map((ticket) => (
                                    <TicketCard key={ticket.id} ticket={ticket} viewType={viewType} />
                                ))}
                            </div>

                            <div className="mt-12 text-center">
                                <button className="px-8 py-4 bg-white border border-gray-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-tet-red transition-all">
                                    Xem thêm kết quả
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default SearchResults;
