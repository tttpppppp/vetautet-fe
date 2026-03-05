import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingBag, Search, Filter, Calendar,
    Train, ChevronRight, Clock, CheckCircle2,
    XCircle, AlertCircle, Ticket, MapPin,
    ArrowRight, MoreHorizontal, Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';

const Orders = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const orders = [
        {
            id: 'VT2026-X89J',
            date: '25/01/2026',
            train: 'SE1',
            from: 'Hà Nội',
            to: 'Sài Gòn',
            departureTime: '21:30',
            arrivalTime: '05:45 (+1)',
            seats: ['T01-05', 'T01-06'],
            total: '1.700.000đ',
            status: 'completed',
            isTet: true
        },
        {
            id: 'VT2026-P42K',
            date: '15/02/2026',
            train: 'SE3',
            from: 'Sài Gòn',
            to: 'Đà Nẵng',
            departureTime: '19:25',
            arrivalTime: '11:45',
            seats: ['T04-12'],
            total: '850.000đ',
            status: 'active',
            isTet: false
        },
        {
            id: 'VT2026-C11M',
            date: '10/01/2026',
            train: 'TN1',
            from: 'Hải Phòng',
            to: 'Hà Nội',
            departureTime: '13:10',
            arrivalTime: '15:20',
            seats: ['T02-22'],
            total: '85.000đ',
            status: 'cancelled',
            isTet: false
        }
    ];

    const filteredOrders = orders.filter(order => {
        if (activeTab !== 'all' && order.status !== activeTab) return false;
        if (searchQuery && !order.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const statusConfig = {
        active: { icon: Clock, color: 'text-tet-red', bg: 'bg-red-50', label: 'Chờ thanh toán', border: 'border-red-100' },
        completed: { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50', label: 'Đã hoàn tất', border: 'border-green-100' },
        cancelled: { icon: XCircle, color: 'text-gray-400', bg: 'bg-gray-50', label: 'Đã hủy', border: 'border-gray-200' }
    };

    return (
        <main className="min-h-screen bg-[#FDFDFD] flex flex-col">
            <Helmet>
                <title>Lịch sử đơn hàng - Vé Tàu Việt Nam</title>
                <meta name="description" content="Quản lý các vé tàu đã đặt, theo dõi lịch trình và tải vé điện tử của bạn tại hệ thống Vé Tàu Việt Nam." />
            </Helmet>
            <Header />

            <section className="pt-52 pb-24">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="space-y-4">
                            <span className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full text-[10px] font-black text-tet-red uppercase tracking-widest">
                                <ShoppingBag size={14} /> Quản lý đơn hàng
                            </span>
                            <h1 className="text-5xl font-black text-gray-900 tracking-tight">Vé tàu của bạn</h1>
                            <p className="text-gray-400 font-bold max-w-md">Theo dõi lịch trình, tải vé điện tử hoặc quản lý các yêu cầu hoàn/hủy vé tại đây.</p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative group min-w-[300px]">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center text-gray-400">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Tìm mã đơn hàng..."
                                className="w-full pl-14 pr-6 py-4 bg-white rounded-2xl border border-gray-100 focus:border-tet-red focus:bg-white focus:ring-4 focus:ring-tet-red/5 outline-none font-bold text-gray-800 transition-all shadow-sm group-hover:shadow-md"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                        {[
                            { id: 'all', label: 'Tất cả đơn' },
                            { id: 'active', label: 'Chờ thanh toán' },
                            { id: 'completed', label: 'Đã hoàn tất' },
                            { id: 'cancelled', label: 'Đã hủy' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap",
                                    activeTab === tab.id
                                        ? "bg-gray-900 text-white shadow-xl shadow-gray-200 translate-y-[-2px]"
                                        : "bg-white text-gray-400 hover:text-gray-900 border border-gray-100"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Orders List */}
                    <div className="space-y-6 min-h-[400px]">
                        {filteredOrders.length === 0 ? (
                            <div className="py-24 text-center bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100">
                                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-sm mb-6">
                                    <AlertCircle size={40} className="text-gray-200" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-2">Không tìm thấy đơn hàng</h3>
                                <p className="text-gray-400 font-bold mb-8">Bạn chưa có đơn hàng nào trong mục này.</p>
                                <Link to="/explore" className="bg-tet-red text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95 inline-block">
                                    Tìm chuyến ngay
                                </Link>
                            </div>
                        ) : (
                            filteredOrders.map((order, index) => {
                                const Config = statusConfig[order.status];
                                return (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition-all relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-full bg-gray-50/50 -skew-x-12 translate-x-20 group-hover:scale-110 transition-transform duration-700" />

                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 relative z-10">
                                            {/* Route Info */}
                                            <div className="flex items-center gap-8">
                                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-tet-red shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                                    <Train size={32} />
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-tet-red transition-colors">{order.train}</h3>
                                                        {order.isTet && (
                                                            <span className="bg-red-50 text-tet-red text-[8px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest border border-red-100">Ưu tiên</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-3 text-lg font-bold text-gray-700">
                                                        <span>{order.from}</span>
                                                        <ArrowRight size={18} className="text-gray-300" />
                                                        <span>{order.to}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Time & Seat */}
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                        <Calendar size={12} /> Ngày đi
                                                    </p>
                                                    <p className="font-black text-gray-900 text-lg">{order.date}</p>
                                                    <p className="text-sm font-bold text-gray-400">{order.departureTime} - {order.arrivalTime}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                        <Ticket size={12} /> Chỗ ngồi
                                                    </p>
                                                    <p className="font-black text-gray-900 text-lg">{order.seats.join(', ')}</p>
                                                    <p className="text-sm font-bold text-gray-400">{order.seats.length} Hành khách</p>
                                                </div>
                                                <div className="hidden md:block">
                                                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2 ">
                                                        Tổng tiền
                                                    </p>
                                                    <p className="font-black text-tet-red text-xl">{order.total}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Đã bao gồm VAT</p>
                                                </div>
                                            </div>

                                            {/* Status & Actions */}
                                            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-6 border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-10">
                                                <div className={cn(
                                                    "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest",
                                                    Config.bg, Config.color, Config.border, "border"
                                                )}>
                                                    <Config.icon size={14} />
                                                    {Config.label}
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <button className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-tet-red hover:text-white transition-all shadow-sm">
                                                        <Download size={20} />
                                                    </button>
                                                    <button className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95">
                                                        Chi tiết
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom Mobile View Extra */}
                                        <div className="flex md:hidden items-center justify-between mt-6 pt-6 border-t border-gray-50">
                                            <span className="text-sm font-bold text-gray-400 tracking-wider">CODE: {order.id}</span>
                                            <span className="text-xl font-black text-tet-red">{order.total}</span>
                                        </div>
                                    </motion.div>
                                );
                            })
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main >
    );
};

export default Orders;
