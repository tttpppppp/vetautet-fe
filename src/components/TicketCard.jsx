import React from 'react';
import { Train, Clock, Armchair, BadgePercent, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TicketCard = ({ ticket, viewType = 'grid' }) => {
    const navigate = useNavigate();

    if (viewType === 'list') {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 group relative overflow-hidden flex gap-6">
                {/* Popular Badge */}
                {ticket.popular && (
                    <div className="absolute top-0 left-0 bg-tet-yellow text-red-900 text-[8px] font-black px-2 py-0.5 rounded-br-lg uppercase tracking-widest shadow-sm z-10">
                        Bán chạy
                    </div>
                )}

                {/* Left: Train Icon & Price */}
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50/50 rounded-xl min-w-[120px]">
                    <div className="w-10 h-10 bg-white text-tet-red rounded-xl flex items-center justify-center group-hover:bg-tet-red group-hover:text-white transition-colors duration-500 shadow-sm mb-3">
                        <Train size={20} />
                    </div>
                    <span className="text-lg font-black text-tet-red">
                        {ticket.price.toLocaleString('vi-VN')}
                        <span className="text-[10px] font-bold ml-0.5">đ</span>
                    </span>
                </div>

                {/* Middle: Details & Route */}
                <div className="flex-1 py-1">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-bold text-gray-900 group-hover:text-tet-red transition-colors text-sm">{ticket.trainName}</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.15em] mt-0.5">{ticket.seatType}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                                <Armchair size={12} className="text-tet-red" />
                                <span className="text-[10px] font-black text-gray-700">{ticket.remainingSeats} chỗ</span>
                            </div>
                            <div className="flex items-center gap-1.5 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                                <BadgePercent size={12} className="text-tet-yellow" />
                                <span className="text-[10px] font-black text-gray-700">Giảm 10%</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <p className="text-lg font-black text-gray-900 leading-none">{ticket.departureTime}</p>
                                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase mt-1">{ticket.from}</p>
                            </div>
                            <div className="flex flex-col items-center min-w-[60px]">
                                <div className="w-full border-t border-gray-200 relative">
                                    <Clock size={10} className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-white px-1 text-gray-300" />
                                </div>
                                <span className="text-[8px] font-black text-gray-400 mt-1 uppercase tracking-tighter">{ticket.duration}</span>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-black text-gray-900 leading-none">{ticket.arrivalTime}</p>
                                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase mt-1">{ticket.to}</p>
                            </div>
                        </div>

                        <div className="flex-1 flex justify-end">
                            <button
                                onClick={() => navigate(`/ticket/${ticket.id}`)}
                                className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-tet-red transition-all shadow-lg shadow-gray-200 flex items-center gap-2"
                            >
                                Chọn vé <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default Grid Layout
    return (
        <div className="bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 group relative overflow-hidden">
            {/* Popular Badge */}
            {ticket.popular && (
                <div className="absolute top-0 right-0 bg-tet-yellow text-red-900 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-tighter shadow-sm">
                    Bán chạy
                </div>
            )}

            <div className="flex flex-col h-full">
                {/* Header: Train Name & Class */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-50 text-tet-red rounded-2xl flex items-center justify-center group-hover:bg-tet-red group-hover:text-white transition-colors duration-500 shadow-inner">
                            <Train size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 group-hover:text-tet-red transition-colors">{ticket.trainName}</h3>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">{ticket.seatType}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xl font-black text-tet-red">
                            {ticket.price.toLocaleString('vi-VN')}
                            <span className="text-sm font-bold ml-1">đ</span>
                        </span>
                    </div>
                </div>

                {/* Route & Time */}
                <div className="flex items-center justify-between mb-8 relative">
                    <div className="text-left">
                        <p className="text-2xl font-bold text-gray-900">{ticket.departureTime}</p>
                        <p className="text-sm font-semibold text-gray-500 mt-1">{ticket.from}</p>
                    </div>

                    <div className="flex flex-col items-center flex-1 px-4 relative">
                        <div className="w-full border-t-2 border-dashed border-gray-200 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 group-hover:rotate-12 transition-transform">
                                <Clock size={16} className="text-gray-300" />
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-tighter">{ticket.duration}</p>
                    </div>

                    <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{ticket.arrivalTime}</p>
                        <p className="text-sm font-semibold text-gray-500 mt-1">{ticket.to}</p>
                    </div>
                </div>

                {/* Footer: Details & CTA */}
                <div className="mt-auto border-t border-gray-100 pt-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                            <Armchair size={14} className="text-tet-red" />
                            <span className="text-[11px] font-bold text-gray-700">{ticket.remainingSeats} chỗ</span>
                        </div>
                        <div className="flex items-center gap-1.5 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                            <BadgePercent size={14} className="text-tet-yellow" />
                            <span className="text-[11px] font-bold text-gray-700">Giảm 10%</span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate(`/ticket/${ticket.id}`)}
                        className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-tet-red transition-all transform hover:scale-105 active:scale-95 flex items-center gap-1 shadow-lg shadow-gray-200"
                    >
                        Chọn <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;
