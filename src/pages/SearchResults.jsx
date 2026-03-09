import * as React from 'react';
const { useState } = React;
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import TicketCard from '@/components/TicketCard';
import Footer from '@/components/Footer';
import { LayoutGrid, ListFilter, ChevronRight, ChevronLeft, Train, Clock, CreditCard, Star, Filter, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SearchResults = () => {
    const { t } = useTranslation();

    const dummyTickets = [
        {
            id: 1,
            trainName: 'SE1 Express',
            from: t('search.stations.hanoi'),
            to: t('search.stations.saigon'),
            departureTime: '19:30',
            arrivalTime: '05:30',
            duration: '34h 00m',
            seatType: t('tickets.seat_types.sleeper_4'),
            price: 1550000,
            remainingSeats: 24,
            popular: true
        },
        {
            id: 2,
            trainName: 'SE3 Express',
            from: t('search.stations.hanoi'),
            to: t('search.stations.saigon'),
            departureTime: '18:00',
            arrivalTime: '04:00',
            duration: '34h 00m',
            seatType: t('tickets.seat_types.soft_seat'),
            price: 980000,
            remainingSeats: 12,
            popular: false
        },
        {
            id: 3,
            trainName: 'SE2 Express',
            from: t('search.stations.saigon'),
            to: t('search.stations.hanoi'),
            departureTime: '21:00',
            arrivalTime: '07:30',
            duration: '34h 30m',
            seatType: t('tickets.seat_types.sleeper_6'),
            price: 1250000,
            remainingSeats: 45,
            popular: true
        },
        {
            id: 4,
            trainName: 'SE4 Express',
            from: t('search.stations.danang'),
            to: t('search.stations.saigon'),
            departureTime: '14:20',
            arrivalTime: '08:15',
            duration: '18h 00m',
            seatType: t('tickets.seat_types.sleeper_4'),
            price: 850000,
            remainingSeats: 8,
            popular: false
        },
        {
            id: 5,
            trainName: 'SE7 Express',
            from: t('search.stations.vinh'),
            to: t('search.stations.danang'),
            departureTime: '06:00',
            arrivalTime: '14:30',
            duration: '8h 30m',
            seatType: t('tickets.seat_types.soft_seat'),
            price: 450000,
            remainingSeats: 32,
            popular: false
        },
        {
            id: 6,
            trainName: 'TN1 Express',
            from: t('search.stations.hanoi'),
            to: t('search.stations.nhatrang'),
            departureTime: '10:00',
            arrivalTime: '09:00',
            duration: '23h 00m',
            seatType: t('tickets.seat_types.sleeper_6'),
            price: 1100000,
            remainingSeats: 18,
            popular: true
        }
    ];

    const fromGa = t('search.stations.hanoi');
    const toGa = t('search.stations.saigon');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [viewType, setViewType] = useState('list');
    const [selectedTrains, setSelectedTrains] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 3;
    const totalPages = Math.ceil(dummyTickets.length / ITEMS_PER_PAGE);
    const paginatedTickets = dummyTickets.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(currentPage * ITEMS_PER_PAGE, dummyTickets.length);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    };

    const toggleTrain = (type) => {
        setSelectedTrains(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    return (
        <main className="min-h-screen bg-white">
            <Helmet>
                <title>{t('search_results.seo_title', { from: fromGa, to: toGa })}</title>
                <meta name="description" content={t('search_results.seo_desc', { from: fromGa, to: toGa })} />
            </Helmet>
            <Header />

            <div className="pt-32 md:pt-40 pb-6 relative transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-xl md:text-3xl font-black text-gray-900 mb-2 tracking-tighter">{t('search_results.title')}</h1>
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-red-50 text-tet-red rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest border border-red-100">{t('explore.schedules.table.train')}</span>
                            <p className="text-gray-500 font-bold text-[10px] md:text-xs">{t('search_results.found', { count: dummyTickets.length })}</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="relative mb-6 md:mb-8 px-2 md:px-4">
                <SearchForm variant="light" />
            </div>

            <section className="pb-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                        {/* Sidebar Filters */}
                        <aside className={cn(
                            "lg:col-span-1 space-y-6 lg:block",
                            isFilterOpen ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto" : "hidden"
                        )}>
                            <div className="flex items-center justify-between lg:hidden mb-8">
                                <h3 className="text-xl font-black">{t('search_results.filters.title')}</h3>
                                <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-100 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/50">
                                <h4 className="flex items-center gap-2 text-[9px] font-black text-gray-900 uppercase tracking-widest mb-4">
                                    <Train size={12} className="text-tet-red" /> {t('search_results.filters.train_type')}
                                </h4>
                                <div className="space-y-3">
                                    {['se', 'tn', 'luxury'].map((typeKey) => {
                                        const type = t(`search_results.filters.train_types.${typeKey}`);
                                        return (
                                            <button
                                                key={typeKey}
                                                className="w-full flex items-center gap-2 cursor-pointer group text-left outline-none"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleTrain(type);
                                                }}
                                            >
                                                <div className={cn(
                                                    "w-4 h-4 rounded flex items-center justify-center transition-all shrink-0",
                                                    selectedTrains.includes(type)
                                                        ? "bg-tet-red border border-tet-red"
                                                        : "border border-gray-300 group-hover:border-tet-red/50 bg-white"
                                                )}>
                                                    {selectedTrains.includes(type) && <Check size={12} className="text-white" strokeWidth={3} />}
                                                </div>
                                                <span className={cn(
                                                    "text-xs font-bold transition-colors truncate",
                                                    selectedTrains.includes(type) ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900"
                                                )}>{type}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/50">
                                <h4 className="flex items-center gap-2 text-[9px] font-black text-gray-900 uppercase tracking-widest mb-4">
                                    <Clock size={12} className="text-tet-red" /> {t('search_results.filters.time')}
                                </h4>
                                <div className="grid grid-cols-2 gap-1.5">
                                    {['00:00 - 06:00', '06:00 - 12:00', '12:00 - 18:00', '18:00 - 00:00'].map((time) => (
                                        <button key={time} className="w-full text-center px-1.5 py-2 rounded-lg border border-gray-100 text-[8px] font-black uppercase tracking-tight text-gray-400 hover:text-tet-red hover:bg-red-50 hover:border-red-100 transition-all">
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/50">
                                <h4 className="flex items-center gap-2 text-[9px] font-black text-gray-900 uppercase tracking-widest mb-4">
                                    <CreditCard size={12} className="text-tet-red" /> {t('search_results.filters.price')}
                                </h4>
                                <div className="px-1">
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full relative mb-4">
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

                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <h4 className="flex items-center gap-2 text-[9px] font-black text-gray-900 uppercase tracking-widest mb-4">
                                    <Star size={12} className="text-tet-red" /> {t('search_results.filters.amenities')}
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {['wifi', 'food', 'ac', 'charging'].map((amenityKey) => (
                                        <button key={amenityKey} className="px-3 py-1.5 bg-gray-50 rounded-md text-[10px] font-bold text-gray-500 hover:bg-gray-900 hover:text-white transition-all">
                                            {t(`search_results.filters.amenity_list.${amenityKey}`)}
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
                                    <p className="text-xs font-black text-gray-900 uppercase tracking-widest">
                                        {t('search_results.view.showing', { start: startItem, end: endItem, total: dummyTickets.length })}
                                    </p>
                                    <button
                                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-[10px] font-black"
                                    >
                                        <Filter size={12} /> {t('search_results.filters.title')}
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
                                        <ListFilter size={14} /> {t('search_results.view.list')}
                                    </button>
                                    <button
                                        onClick={() => setViewType('grid')}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all",
                                            viewType === 'grid' ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
                                        )}
                                    >
                                        <LayoutGrid size={14} /> {t('search_results.view.grid')}
                                    </button>
                                </div>
                            </div>

                            <div className={cn(
                                "grid gap-6 transition-all duration-300",
                                viewType === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                            )}>
                                {paginatedTickets.map((ticket) => (
                                    <TicketCard key={ticket.id} ticket={ticket} viewType={viewType} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-8 flex flex-col items-center gap-3">
                                    <div className="flex items-center gap-1.5">
                                        {/* Prev Button */}
                                        <button
                                            onClick={() => goToPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={cn(
                                                "w-8 h-8 rounded-lg flex items-center justify-center transition-all font-bold text-xs border",
                                                currentPage === 1
                                                    ? "border-gray-100 text-gray-200 cursor-not-allowed bg-gray-50/50"
                                                    : "border-gray-200 text-gray-500 hover:border-tet-red hover:text-tet-red hover:bg-red-50 active:scale-95 bg-white"
                                            )}
                                        >
                                            <ChevronLeft size={14} />
                                        </button>

                                        {/* Page Numbers */}
                                        {getPageNumbers().map((page, index) => (
                                            page === '...' ? (
                                                <span key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-gray-300 font-bold text-xs">
                                                    ···
                                                </span>
                                            ) : (
                                                <button
                                                    key={page}
                                                    onClick={() => goToPage(page)}
                                                    className={cn(
                                                        "w-8 h-8 rounded-lg flex items-center justify-center transition-all font-bold text-xs border",
                                                        currentPage === page
                                                            ? "bg-tet-red border-tet-red text-white shadow-md shadow-tet-red/20"
                                                            : "bg-white border-gray-200 text-gray-500 hover:border-tet-red hover:text-tet-red hover:bg-red-50 active:scale-95"
                                                    )}
                                                >
                                                    {page}
                                                </button>
                                            )
                                        ))}

                                        {/* Next Button */}
                                        <button
                                            onClick={() => goToPage(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={cn(
                                                "w-8 h-8 rounded-lg flex items-center justify-center transition-all font-bold text-xs border",
                                                currentPage === totalPages
                                                    ? "border-gray-100 text-gray-200 cursor-not-allowed bg-gray-50/50"
                                                    : "border-gray-200 text-gray-500 hover:border-tet-red hover:text-tet-red hover:bg-red-50 active:scale-95 bg-white"
                                            )}
                                        >
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>

                                    {/* Page Info */}
                                    <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em]">
                                        {t('search_results.pagination.page_info', { current: currentPage, total: totalPages, start: startItem, end: endItem, count: dummyTickets.length })}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default SearchResults;
