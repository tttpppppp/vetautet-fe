import * as React from 'react';
const { useState } = React;
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TicketCard from '@/components/TicketCard';
import { Train, MapPin, Search, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Schedules = () => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRoute, setSelectedRoute] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const ITEMS_PER_PAGE = 6;

    const allSchedules = [
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
        },
        {
            id: 7,
            trainName: 'TN3 Express',
            from: t('search.stations.saigon'),
            to: t('search.stations.nhatrang'),
            departureTime: '08:00',
            arrivalTime: '16:30',
            duration: '8h 30m',
            seatType: t('tickets.seat_types.soft_seat'),
            price: 520000,
            remainingSeats: 40,
            popular: false
        },
        {
            id: 8,
            trainName: 'SE5 Express',
            from: t('search.stations.hanoi'),
            to: t('search.stations.danang'),
            departureTime: '06:00',
            arrivalTime: '22:30',
            duration: '16h 30m',
            seatType: t('tickets.seat_types.sleeper_4'),
            price: 780000,
            remainingSeats: 15,
            popular: true
        },
        {
            id: 9,
            trainName: 'SE6 Express',
            from: t('search.stations.danang'),
            to: t('search.stations.hanoi'),
            departureTime: '11:00',
            arrivalTime: '03:30',
            duration: '16h 30m',
            seatType: t('tickets.seat_types.sleeper_6'),
            price: 720000,
            remainingSeats: 22,
            popular: false
        },
        {
            id: 10,
            trainName: 'TN5 Express',
            from: t('search.stations.hue'),
            to: t('search.stations.saigon'),
            departureTime: '15:00',
            arrivalTime: '08:00',
            duration: '17h 00m',
            seatType: t('tickets.seat_types.soft_seat'),
            price: 650000,
            remainingSeats: 28,
            popular: false
        },
        {
            id: 11,
            trainName: 'SE8 Express',
            from: t('search.stations.saigon'),
            to: t('search.stations.danang'),
            departureTime: '20:00',
            arrivalTime: '12:30',
            duration: '16h 30m',
            seatType: t('tickets.seat_types.sleeper_4'),
            price: 800000,
            remainingSeats: 10,
            popular: true
        },
        {
            id: 12,
            trainName: 'TN7 Express',
            from: t('search.stations.haiphong'),
            to: t('search.stations.saigon'),
            departureTime: '12:00',
            arrivalTime: '06:00',
            duration: '42h 00m',
            seatType: t('tickets.seat_types.sleeper_6'),
            price: 1800000,
            remainingSeats: 5,
            popular: false
        },
    ];

    // Get unique routes from translated values
    const routes = [...new Set(allSchedules.map(s => s.from))].sort();

    // Filter
    let filtered = selectedRoute === 'all'
        ? allSchedules
        : allSchedules.filter(t => t.from === selectedRoute || t.to === selectedRoute);

    // Sort
    if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (sortBy === 'time') filtered = [...filtered].sort((a, b) => a.departureTime.localeCompare(b.departureTime));

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginatedTickets = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filtered.length);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 300, behavior: 'smooth' });
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

    return (
        <main className="min-h-screen bg-white">
            <Helmet>
                <title>{t('schedules_page.seo_title')}</title>
                <meta name="description" content={t('schedules_page.seo_desc')} />
            </Helmet>
            <Header />

            {/* Hero Section */}
            <div className="pt-28 pb-12 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-950/40 to-black" />
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-0.5 bg-tet-red/20 text-tet-red rounded-full text-[9px] font-black uppercase tracking-widest border border-tet-red/30">
                                {t('schedules_page.tag')}
                            </span>
                            <span className="text-gray-500 text-[9px] font-bold uppercase tracking-wider">
                                {t('schedules_page.train_count', { count: filtered.length })}
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tighter">
                            {t('schedules_page.title')}
                        </h1>
                        <p className="text-gray-400 font-medium text-sm max-w-lg">
                            {t('schedules_page.desc')}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white border-b border-gray-100 sticky top-[72px] z-20">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 py-3">

                        {/* Route Filter */}
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                            <MapPin size={12} className="text-tet-red shrink-0" />
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest shrink-0">{t('schedules_page.route_label')}</span>
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => { setSelectedRoute('all'); setCurrentPage(1); }}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap",
                                        selectedRoute === 'all'
                                            ? "bg-gray-900 text-white"
                                            : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                                    )}
                                >
                                    {t('schedules_page.all_routes')}
                                </button>
                                {routes.map(route => (
                                    <button
                                        key={route}
                                        onClick={() => { setSelectedRoute(route); setCurrentPage(1); }}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap",
                                            selectedRoute === route
                                                ? "bg-tet-red text-white"
                                                : "bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-tet-red"
                                        )}
                                    >
                                        {route}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="flex items-center gap-2 shrink-0">
                            <ArrowUpDown size={12} className="text-gray-400" />
                            <select
                                value={sortBy}
                                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                                className="text-[10px] font-bold text-gray-600 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5 outline-none cursor-pointer hover:border-tet-red/30 transition-all font-sans"
                            >
                                <option value="default">{t('schedules_page.sort.label')}</option>
                                <option value="price-asc">{t('schedules_page.sort.price_asc')}</option>
                                <option value="price-desc">{t('schedules_page.sort.price_desc')}</option>
                                <option value="time">{t('schedules_page.sort.time')}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Schedule List */}
            <section className="py-10 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    {/* Info bar */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-5 bg-tet-red rounded-full" />
                            <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">
                                {t('schedules_page.showing', { start: startItem, end: endItem, total: filtered.length })}
                            </p>
                        </div>
                        <Link
                            to="/"
                            className="flex items-center gap-1.5 text-[10px] font-bold text-tet-red hover:text-red-700 transition-colors"
                        >
                            <Search size={12} />
                            {t('schedules_page.advanced_search')}
                        </Link>
                    </div>

                    {/* Ticket Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {paginatedTickets.map((ticket) => (
                            <TicketCard key={ticket.id} ticket={ticket} viewType="grid" />
                        ))}
                    </div>

                    {/* Empty State */}
                    {filtered.length === 0 && (
                        <div className="text-center py-20">
                            <Train size={40} className="text-gray-200 mx-auto mb-4" />
                            <p className="text-sm font-bold text-gray-400">{t('schedules_page.not_found')}</p>
                            <button
                                onClick={() => { setSelectedRoute('all'); setCurrentPage(1); }}
                                className="mt-3 text-xs font-bold text-tet-red hover:underline"
                            >
                                {t('schedules_page.view_all')}
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-10 flex flex-col items-center gap-3">
                            <div className="flex items-center gap-1.5">
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

                            <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em]">
                                {t('schedules_page.pagination', { current: currentPage, total: totalPages, start: startItem, end: endItem, count: filtered.length })}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default Schedules;
