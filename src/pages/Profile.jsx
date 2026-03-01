import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Mail, Phone, MapPin, Camera,
    Shield, Bell, CreditCard, ChevronRight,
    LogOut, Settings, Award, History,
    Train, Ticket, Star, Zap, Edit3,
    CheckCircle2, Globe, Heart, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Profile = () => {
    const [activeSection, setActiveSection] = useState('profile');

    const user = {
        name: 'Phạm Kỳ Anh',
        email: 'anh.pk@gmail.com',
        phone: '090 123 4567',
        address: 'Hòa Xuân, Cẩm Lệ, Đà Nẵng',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=400',
        level: 'Diamond Member',
        points: 2450,
        trips: 12,
        joinDate: '10/2023'
    };

    const sidebarItems = [
        { id: 'profile', icon: User, label: 'Thông tin cá nhân', desc: 'Quản lý thông tin định danh' },
        { id: 'orders', icon: Ticket, label: 'Đơn hàng của bạn', desc: 'Lịch trình & Lịch sử đặt vé' },
        { id: 'security', icon: Shield, label: 'Bảo mật', desc: 'Mật khẩu & Xác thực 2 lớp' },
        { id: 'notifications', icon: Bell, label: 'Thông báo', desc: 'Cài đặt nhắc nhở chuyến đi' },
        { id: 'payment', icon: CreditCard, label: 'Thanh toán', desc: 'Quản lý thẻ & Ví' },
    ];

    const orders = [
        {
            id: 'TET2026-X89J',
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
            id: 'TET2026-P42K',
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
        }
    ];

    const statusConfig = {
        active: { color: 'text-tet-red', bg: 'bg-red-50', label: 'Chờ thanh toán' },
        completed: { color: 'text-green-500', bg: 'bg-green-50', label: 'Đã hoàn tất' }
    };

    return (
        <main className="min-h-screen bg-[#F8F9FB] flex flex-col selection:bg-tet-red selection:text-white">
            <Header />

            {/* Premium Header/Cover */}
            <div className="relative pt-32 h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-950 to-black" />
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F8F9FB] to-transparent" />

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-tet-red/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-tet-yellow/10 rounded-full blur-[120px] animate-pulse delay-700" />
            </div>

            <section className="-mt-24 pb-24 relative z-10">
                <div className="max-w-7xl mx-auto px-6 md:px-12">

                    {/* Main Container */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* LEFT: Profile Overview Card */}
                        <div className="lg:col-span-4 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-50/50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />

                                <div className="relative flex flex-col items-center text-center">
                                    <div className="relative mb-4">
                                        <div className="w-24 h-24 rounded-[2.2rem] overflow-hidden border-[4px] border-white shadow-2xl relative">
                                            <img src={user.avatar} className="w-full h-full object-cover" alt={user.name} />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                                <Camera className="text-white" size={20} />
                                            </div>
                                        </div>
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                            className="absolute -bottom-2 -right-2 w-11 h-11 bg-tet-red rounded-2xl flex items-center justify-center text-white shadow-lg border-4 border-white"
                                        >
                                            <Zap size={20} fill="currentColor" />
                                        </motion.div>
                                    </div>

                                    <h2 className="text-xl font-black text-gray-900 mb-1 tracking-tight">{user.name}</h2>
                                    <div className="flex items-center gap-2 mb-6">
                                        <Award size={14} className="text-tet-red" />
                                        <span className="text-tet-red font-black text-[10px] uppercase tracking-[0.2em]">{user.level}</span>
                                    </div>

                                    {/* Quick Stats Wrap */}
                                    <div className="grid grid-cols-2 gap-3 w-full pt-4 border-t border-gray-50">
                                        <div className="p-3 bg-gray-50/50 rounded-2xl">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Điểm thưởng</p>
                                            <p className="text-lg font-black text-gray-900">{user.points}</p>
                                        </div>
                                        <div className="p-3 bg-gray-50/50 rounded-2xl">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Chuyến đi</p>
                                            <p className="text-lg font-black text-gray-900">{user.trips}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Sidebar Menu */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-[2.5rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white"
                            >
                                <nav className="space-y-2">
                                    {sidebarItems.map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveSection(item.id)}
                                            className={cn(
                                                "w-full flex items-center gap-4 p-4 rounded-[1.5rem] transition-all relative group overflow-hidden",
                                                activeSection === item.id
                                                    ? "bg-gray-900 text-white shadow-xl shadow-gray-200"
                                                    : "text-gray-500 hover:bg-gray-50"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                                                activeSection === item.id ? "bg-white/10" : "bg-gray-50 group-hover:bg-white"
                                            )}>
                                                <item.icon size={20} className={activeSection === item.id ? "text-tet-yellow" : "text-gray-400 group-hover:text-gray-900"} />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-black text-sm">{item.label}</p>
                                                <p className={cn("text-[9px] font-bold tracking-wide uppercase", activeSection === item.id ? "text-white/40" : "text-gray-300")}>{item.desc}</p>
                                            </div>
                                            {activeSection === item.id && (
                                                <motion.div layoutId="activePill" className="absolute right-4 w-1.5 h-6 bg-tet-yellow rounded-full" />
                                            )}
                                        </button>
                                    ))}

                                    <div className="pt-4 mt-4 border-t border-gray-50">
                                        <button className="w-full flex items-center gap-4 p-5 rounded-[1.8rem] text-red-500 font-black hover:bg-red-50 transition-all">
                                            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                                                <LogOut size={20} />
                                            </div>
                                            <span className="text-sm">Đăng xuất tài khoản</span>
                                        </button>
                                    </div>
                                </nav>
                            </motion.div>
                        </div>

                        {/* RIGHT: Main Content Area */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* Feature Highlight Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-white rounded-[2rem] p-6 border border-white shadow-sm hover:shadow-xl transition-all relative overflow-hidden group cursor-pointer"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-tet-red to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative z-10 flex items-center gap-5">
                                        <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-tet-red group-hover:bg-white/20 group-hover:text-white transition-all">
                                            <Ticket size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-gray-900 group-hover:text-white text-base transition-colors">Vé đang dùng</h4>
                                            <p className="text-gray-400 group-hover:text-white/70 font-bold text-sm transition-colors">Bạn có 2 vé sắp tới</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white rounded-[2.5rem] p-8 border border-white shadow-sm hover:shadow-xl transition-all relative overflow-hidden group cursor-pointer"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative z-10 flex items-center gap-6">
                                        <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-900 group-hover:bg-white/20 group-hover:text-white transition-all">
                                            <Globe size={32} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-gray-900 group-hover:text-white text-lg transition-colors">Membership</h4>
                                            <p className="text-gray-400 group-hover:text-white/70 font-bold transition-colors">Tận hưởng ưu đãi VIP</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Section Details Card */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeSection}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-white shadow-2xl shadow-gray-200/50"
                                >
                                    {activeSection === 'profile' && (
                                        <div className="space-y-12">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-50">
                                                <div>
                                                    <h3 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Thông tin định danh</h3>
                                                    <p className="text-gray-400 font-bold text-sm max-w-md">Lưu giữ các thông tin cơ bản để việc đặt vé trở nên nhanh chóng hơn.</p>
                                                </div>
                                                <button className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-[1.2rem] font-black text-xs uppercase tracking-widest hover:bg-tet-red transition-all shadow-xl shadow-gray-200 active:scale-95 group">
                                                    <Edit3 size={14} className="group-hover:rotate-12 transition-transform" />
                                                    Chỉnh sửa
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                                {[
                                                    { label: 'Họ và tên', value: user.name, icon: User, color: 'text-tet-red' },
                                                    { label: 'Địa chỉ Email', value: user.email, icon: Mail, color: 'text-blue-500' },
                                                    { label: 'Số điện thoại', value: user.phone, icon: Phone, color: 'text-green-500' },
                                                    { label: 'Địa chỉ thường trú', value: user.address, icon: MapPin, color: 'text-orange-500' },
                                                    { label: 'Ngày tham gia', value: user.joinDate, icon: History, color: 'text-purple-500' },
                                                    { label: 'Quốc tịch', value: 'Việt Nam', icon: Globe, color: 'text-cyan-500' }
                                                ].map((info, idx) => (
                                                    <div key={idx} className="group space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className={cn("w-1.5 h-1.5 rounded-full", info.color.replace('text-', 'bg-'))} />
                                                            <label className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{info.label}</label>
                                                        </div>
                                                        <div className="text-base font-black text-gray-900 flex items-center gap-3 pl-4">
                                                            {info.value}
                                                            <CheckCircle2 size={12} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Advanced Status */}
                                            <div className="p-6 rounded-[2rem] bg-gradient-to-br from-gray-50 to-white border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition-shadow">
                                                <div className="flex items-center gap-6">
                                                    <div className="relative">
                                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-tet-red shadow-xl border border-red-50">
                                                            <Zap size={28} fill="currentColor" />
                                                        </div>
                                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-[3px] border-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-black text-gray-900 mb-0.5 tracking-tight">Xác thực chính chủ</h4>
                                                        <p className="text-gray-400 font-bold max-w-xs text-xs leading-relaxed">Đã liên kết với CCCD gắn chip v2.0.</p>
                                                    </div>
                                                </div>
                                                <button className="whitespace-nowrap bg-white text-gray-900 border-2 border-gray-900 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all active:scale-95">
                                                    Chi tiết E-ID
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {activeSection === 'orders' && (
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between pb-6 border-b border-gray-50">
                                                <div>
                                                    <h3 className="text-2xl font-black text-gray-900 mb-1">Đơn hàng của bạn</h3>
                                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Theo dõi vé & lịch trình di chuyển</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                {orders.map((order, idx) => {
                                                    const Config = statusConfig[order.status];
                                                    return (
                                                        <motion.div
                                                            key={order.id}
                                                            initial={{ opacity: 0, x: 20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: idx * 0.1 }}
                                                            className="p-5 bg-gray-50 rounded-[1.8rem] border border-gray-100 hover:bg-white hover:shadow-xl transition-all group"
                                                        >
                                                            <div className="flex flex-col md:flex-row items-center gap-6">
                                                                <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center text-tet-red shadow-sm shrink-0">
                                                                    <Train size={20} />
                                                                </div>
                                                                <div className="flex-grow">
                                                                    <div className="flex items-center gap-3 mb-1">
                                                                        <span className="font-black text-gray-900 text-base uppercase">{order.train}</span>
                                                                        <span className={cn("px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest", Config.bg, Config.color)}>
                                                                            {Config.label}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 font-bold text-gray-600 text-sm">
                                                                        <span>{order.from}</span>
                                                                        <ArrowRight size={12} className="text-gray-300" />
                                                                        <span>{order.to}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right shrink-0">
                                                                    <p className="font-black text-gray-900 text-sm">{order.date}</p>
                                                                    <p className="text-[11px] font-bold text-gray-400">Vé: {order.seats.join(', ')}</p>
                                                                </div>
                                                                <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-900 hover:bg-black hover:text-white transition-all shadow-sm group-hover:scale-105 active:scale-95">
                                                                    <ChevronRight size={20} />
                                                                </button>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {!['profile', 'orders'].includes(activeSection) && (
                                        <div className="flex flex-col items-center justify-center py-20 text-center">
                                            <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200 mb-8 animate-pulse">
                                                <Settings size={48} />
                                            </div>
                                            <h3 className="text-2xl font-black text-gray-900 mb-2">Đang phát triển</h3>
                                            <p className="text-gray-400 font-bold max-w-xs">Tính năng này đang được cập nhật. Vui lòng quay lại sau.</p>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default Profile;
