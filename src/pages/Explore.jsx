import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, MapPin, Calendar, Train, ArrowRight,
    Star, Heart, Share2, Compass, Filter,
    Clock, ChevronRight, Info, AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';

const Explore = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('all');

    const popularRoutes = [
        {
            id: 1,
            from: 'Sài Gòn',
            to: 'Đà Nẵng',
            image: 'https://images.unsplash.com/photo-1559592442-7e182c8bd03c?auto=format&fit=crop&q=80&w=800',
            price: '850.000đ',
            duration: '16h 30p',
            rating: 4.8,
            tag: 'Phổ biến nhất'
        },
        {
            id: 2,
            from: 'Hà Nội',
            to: 'Lào Cai (Sapa)',
            image: 'https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=800',
            price: '450.000đ',
            duration: '8h 15p',
            rating: 4.9,
            tag: 'Yêu thích'
        },
        {
            id: 3,
            from: 'Đà Nẵng',
            to: 'Huế',
            image: 'https://images.unsplash.com/photo-1599708145801-03c46e30ef01?auto=format&fit=crop&q=80&w=800',
            price: '120.000đ',
            duration: '2h 45p',
            rating: 4.7,
            tag: 'Cảnh đẹp'
        },
        {
            id: 4,
            from: 'Hà Nội',
            to: 'Hải Phòng',
            image: 'https://images.unsplash.com/photo-1555930141-860824641ec4?auto=format&fit=crop&q=80&w=800',
            price: '85.000đ',
            duration: '1h 50p',
            rating: 4.5,
            tag: 'Cuối tuần'
        }
    ];

    const allSchedules = [
        { id: 'SE1', from: 'Hà Nội', to: 'Sài Gòn', dep: '21:30', arr: '05:45', status: 'On Time', type: 'Express' },
        { id: 'SE3', from: 'Hà Nội', to: 'Sài Gòn', dep: '19:25', arr: '04:30', status: 'On Time', type: 'Express' },
        { id: 'SE5', from: 'Hà Nội', to: 'Sài Gòn', dep: '08:50', arr: '18:55', status: 'Delayed 10m', type: 'Normal' },
        { id: 'TN1', from: 'Hà Nội', to: 'Sài Gòn', dep: '13:10', arr: '02:15', status: 'On Time', type: 'Economy' },
    ];

    return (
        <main className="min-h-screen bg-[#FAFAFA] flex flex-col">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 md:pt-52 pb-16 md:pb-24 overflow-hidden bg-white">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-tet-red/[0.03] -skew-x-12 transform translate-x-20" />
                <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-flex items-center gap-2 bg-red-50 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[9px] md:text-xs font-black text-tet-red uppercase tracking-widest mb-4 md:mb-6">
                            <Compass size={14} className="animate-spin-slow" /> Khám phá hành trình
                        </span>
                        <h1 className="text-3xl md:text-7xl font-black text-gray-900 mb-4 md:mb-8 leading-[1.1] md:leading-[1.1]">
                            Tìm kiếm <span className="text-tet-red">Hành trình</span><br className="hidden md:block" /> Yêu thích của bạn
                        </h1>
                        <p className="text-gray-500 text-base md:text-xl font-medium mb-8 md:mb-12 max-w-xl leading-relaxed">
                            Khám phá hàng trăm tuyến đường từ Bắc chí Nam. Check lịch tàu, giá vé và các điểm dừng chân tuyệt đẹp trên dải đất hình chữ S.
                        </p>

                        {/* Search Bar */}
                        <div className="relative group max-w-2xl">
                            <div className="absolute -inset-1 bg-gradient-to-r from-tet-red to-tet-yellow rounded-2xl md:rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                            <div className="relative flex flex-col sm:flex-row bg-white rounded-2xl md:rounded-[2.2rem] shadow-xl overflow-hidden border border-gray-100 p-1.5 sm:p-0">
                                <div className="hidden sm:flex items-center pl-8 text-gray-400">
                                    <Search size={22} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm ga đi, ga đến..."
                                    className="w-full px-5 py-4 sm:px-6 sm:py-6 outline-none font-bold text-gray-800 placeholder:text-gray-300 text-sm md:text-base transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button className="bg-tet-red hover:bg-black text-white py-4 sm:px-10 sm:m-2 rounded-xl md:rounded-[1.8rem] font-black text-xs md:text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95">
                                    Tìm ngay
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-1/2 right-20 -translate-y-1/2 hidden xl:block pointer-events-none">
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-64 h-80 bg-white rounded-[3rem] shadow-2xl p-6 border border-gray-100/50 backdrop-blur-sm -rotate-6"
                    >
                        <div className="w-full h-40 bg-gray-100 rounded-2xl mb-4 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-2/3 bg-gray-100 rounded-full" />
                            <div className="h-4 w-full bg-gray-50 rounded-full" />
                            <div className="h-10 w-full bg-red-50 rounded-xl mt-4" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Popular Routes */}
            <section className="py-16 md:py-24 bg-white border-t border-gray-50">
                <div className="max-w-7xl mx-auto px-4 md:px-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 md:mb-4 tracking-tight">Tuyến đường phổ biến</h2>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Hành trình được lựa chọn nhiều nhất</p>
                        </div>
                        <div className="flex flex-wrap gap-2 md:gap-4">
                            {['all', 'Bắc', 'Trung', 'Nam'].map(region => (
                                <button
                                    key={region}
                                    onClick={() => setSelectedRegion(region)}
                                    className={cn(
                                        "px-4 py-2 md:px-6 md:py-2 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest transition-all",
                                        selectedRegion === region ? "bg-tet-red text-white shadow-lg" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                                    )}
                                >
                                    {region === 'all' ? 'Tất cả' : region}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {popularRoutes.map((route, index) => (
                            <Link
                                to={`/ticket/${route.id}`}
                                key={route.id}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative rounded-[2.5rem] overflow-hidden mb-6 aspect-[4/5] shadow-xl group-hover:shadow-2xl transition-all duration-500">
                                        <img src={route.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={route.to} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        <div className="absolute top-5 left-5">
                                            <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-tet-red uppercase tracking-widest ">
                                                {route.tag}
                                            </span>
                                        </div>
                                        <button className="absolute top-5 right-5 w-10 h-10 bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-tet-red transition-all">
                                            <Heart size={20} />
                                        </button>
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="flex items-center gap-2 text-white/70 text-xs font-bold mb-2 uppercase tracking-widest">
                                                <MapPin size={12} className="text-tet-red" /> {route.from}
                                            </div>
                                            <h3 className="text-2xl font-black text-white mb-4 group-hover:translate-x-2 transition-transform">{route.to}</h3>
                                            <div className="flex items-center justify-between">
                                                <p className="text-tet-yellow font-black text-lg">{route.price}</p>
                                                <div className="flex items-center gap-1 text-white/80">
                                                    <Star size={14} className="fill-tet-yellow text-tet-yellow" />
                                                    <span className="text-xs font-bold">{route.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Schedule Table Section */}
            <section className="py-16 md:py-24 bg-[#FAFAFA]">
                <div className="max-w-7xl mx-auto px-4 md:px-12">
                    <div className="bg-white rounded-3xl md:rounded-[3rem] p-6 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-tet-red/[0.01] rounded-full -mr-32 -mt-32" />

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 mb-8 md:mb-12 relative z-10">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Tất cả lịch trình hôm nay</h2>
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Cập nhật thời gian thực từ hệ thống</p>
                            </div>
                            <button className="flex items-center justify-center gap-3 bg-gray-50 px-5 py-3 md:px-6 md:py-3 rounded-xl md:rounded-2xl border border-gray-100 text-gray-500 font-bold text-xs md:text-sm hover:bg-white hover:shadow-lg transition-all group">
                                <Filter size={16} className="group-hover:rotate-180 transition-transform" />
                                Lọc theo trạm ga
                            </button>
                        </div>

                        <div className="overflow-x-auto relative z-10 -mx-6 md:mx-0 px-6 md:px-0">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                                        <th className="pb-6 text-left px-4">Chuyến tàu</th>
                                        <th className="pb-6 text-left px-4">Lộ trình</th>
                                        <th className="pb-6 text-left px-4">Xuất phát</th>
                                        <th className="pb-6 text-left px-4">Đến nơi</th>
                                        <th className="pb-6 text-left px-4">Trạng thái</th>
                                        <th className="pb-6 text-right px-4">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {allSchedules.map((schedule) => (
                                        <tr key={schedule.id} className="group hover:bg-gray-50/50 transition-all">
                                            <td className="py-8 px-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-tet-red font-black group-hover:scale-110 group-hover:bg-white group-hover:shadow-md transition-all">
                                                        {schedule.id}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-gray-900">{schedule.id} Express</p>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{schedule.type}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-8 px-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-bold text-gray-900">{schedule.from}</span>
                                                    <ArrowRight size={14} className="text-gray-300" />
                                                    <span className="font-bold text-gray-900">{schedule.to}</span>
                                                </div>
                                            </td>
                                            <td className="py-8 px-4 font-black text-gray-900">{schedule.dep}</td>
                                            <td className="py-8 px-4 font-black text-gray-900">{schedule.arr}</td>
                                            <td className="py-8 px-4">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                                    schedule.status === 'On Time' ? "bg-green-50 text-green-500" : "bg-red-50 text-tet-red"
                                                )}>
                                                    ● {schedule.status}
                                                </span>
                                            </td>
                                            <td className="py-8 px-4 text-right">
                                                <button className="w-10 h-10 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-tet-red hover:text-white transition-all shadow-sm">
                                                    <ChevronRight size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter/Footer Info Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-12">
                    <div className="bg-tet-yellow rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-20 relative overflow-hidden flex flex-col items-center text-center">
                        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative z-10"
                        >
                            <h2 className="text-2xl md:text-5xl font-black text-red-900 mb-4 md:mb-8 leading-tight">Ghé thăm những miền di sản</h2>
                            <p className="text-red-800/60 text-sm md:text-lg font-bold mb-8 md:mb-12 max-w-2xl leading-relaxed uppercase tracking-wider">
                                Khám phá vẻ đẹp truyền thống Việt Nam qua khung cửa sổ toa tàu.
                                <br className="hidden md:block" />Bắt đầu cuộc hành trình xuân ý nghĩa ngay hôm nay.
                            </p>
                            <button
                                onClick={() => navigate('/')}
                                className="bg-red-900 text-white px-8 py-4 md:px-12 md:py-5 rounded-full font-black text-base md:text-xl hover:bg-black transition-all shadow-2xl active:scale-95"
                            >
                                Quay lại trang chủ
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default Explore;
