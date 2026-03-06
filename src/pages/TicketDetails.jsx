import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Train, MapPin, Calendar, Clock, User, Users,
    ChevronLeft, CreditCard, Armchair, Info,
    CheckCircle2, AlertCircle, AlertTriangle, ChevronRight,
    ShoppingBag, ShieldCheck, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const TicketDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Seats, 2: Info, 3: Payment, 4: Success
    const [selectedCar, setSelectedCar] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [passengers, setPassengers] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('');

    // Mock Data
    const ticket = {
        id: id,
        trainId: 'SE1',
        from: t('search.stations.saigon'),
        to: t('search.stations.hanoi'),
        date: '25/01/2026',
        departureTime: '21:30',
        arrivalTime: `05:45 (+1 ${t('explore.schedules.table.departure') === 'Xuất phát' ? 'ngày' : 'day'})`,
        duration: '32h 15p',
        pricePerSeat: 1250000,
        type: t('tickets.seat_types.sleeper_4'),
    };

    const cars = [
        { id: 1, type: t('tickets.seat_types.sleeper_4_vip'), price: 1500000 },
        { id: 2, type: t('tickets.seat_types.sleeper_6_normal'), price: 1100000 },
        { id: 3, type: t('tickets.seat_types.soft_seat_ac'), price: 850000 },
    ];

    const toggleSeat = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatId));
            const newPassengers = { ...passengers };
            delete newPassengers[seatId];
            setPassengers(newPassengers);
        } else {
            if (selectedSeats.length >= 4) return; // Limit 4 seats
            setSelectedSeats([...selectedSeats, seatId]);
            setPassengers({ ...passengers, [seatId]: { name: '', idCard: '', type: 'Người lớn' } });
        }
    };

    const handlePassengerChange = (seatId, field, value) => {
        setPassengers({
            ...passengers,
            [seatId]: { ...passengers[seatId], [field]: value }
        });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const formatPrice = (price) => {
        return (price / 1000000).toFixed(2) + 'M';
    };

    // Step 1: Seat Selection View
    const renderSeatSelection = () => (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
                {/* Summary Card */}
                <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-tet-red/[0.02] rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 relative z-10">
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-50 to-white rounded-xl md:rounded-2xl flex items-center justify-center text-tet-red shrink-0 shadow-sm border border-red-100/50">
                                <Train size={20} className="md:size-24 drop-shadow-sm" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="px-1.5 py-0.5 bg-tet-red text-white text-[7px] md:text-[8px] font-black rounded-md uppercase tracking-wider">2026</span>
                                    <h2 className="text-base md:text-lg font-black text-gray-900 tracking-tight">{ticket.trainId}</h2>
                                </div>
                                <p className="text-gray-400 font-bold flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] uppercase tracking-wider">
                                    <Calendar size={8} className="text-tet-red md:size-10" /> {ticket.date} <span className="w-1 h-1 rounded-full bg-gray-300" /> {ticket.type}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 md:gap-8 bg-gray-50/50 px-4 py-2.5 rounded-xl md:rounded-2xl border border-gray-100/50 backdrop-blur-sm">
                            <div className="text-center">
                                <p className="text-base md:text-lg font-black text-gray-900 mb-0.5">{ticket.departureTime}</p>
                                <p className="text-[7px] md:text-[8px] font-black text-gray-400 uppercase tracking-widest">{ticket.from}</p>
                            </div>
                            <div className="flex flex-col items-center gap-0.5 md:gap-1">
                                <span className="text-[6px] md:text-[7px] font-black text-tet-red uppercase tracking-widest bg-red-50 px-1 py-0.5 rounded-full">{ticket.duration}</span>
                                <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full border border-tet-red bg-white" />
                                    <div className="w-6 md:w-8 h-[1px] bg-gradient-to-r from-tet-red via-tet-red/50 to-gray-200" />
                                    <div className="w-1 h-1 rounded-full bg-gray-200" />
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-base md:text-lg font-black text-gray-900 mb-0.5">{ticket.arrivalTime}</p>
                                <p className="text-[7px] md:text-[8px] font-black text-gray-400 uppercase tracking-widest">{ticket.to}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Car Selection */}
                <div className="space-y-3">
                    <h3 className="flex items-center gap-2 text-base font-black text-gray-900 group">
                        <div className="w-7 h-7 bg-red-50 text-tet-red rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12 shadow-sm">
                            <Train size={14} />
                        </div>
                        {t('ticket_details.car.title')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {cars.map((car) => (
                            <button
                                key={car.id}
                                onClick={() => setSelectedCar(car.id)}
                                className={cn(
                                    "px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm border-2 text-xs",
                                    selectedCar === car.id
                                        ? "bg-white border-tet-red text-tet-red shadow-lg shadow-tet-red/5 -translate-y-0.5"
                                        : "bg-white border-gray-50 text-gray-400 hover:border-gray-200 hover:text-gray-600 hover:bg-gray-50/50"
                                )}
                            >
                                <div className={cn(
                                    "w-2 h-2 rounded-full",
                                    selectedCar === car.id ? "bg-tet-red animate-pulse" : "bg-gray-200"
                                )} />
                                {t('ticket_details.car.label')}{car.id}: {car.type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Seat Map */}
                <div className="bg-white rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col items-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
                    <div className="w-full max-w-xl">
                        <div className="w-full h-10 bg-gray-50 rounded-t-[3rem] border-x-4 border-t-4 border-gray-100 flex items-center justify-center mb-10 relative shadow-inner">
                            <span className="text-[9px] font-black text-gray-300 tracking-[0.4em] uppercase">{t('ticket_details.seats.admin_cabin')}</span>
                        </div>
                        <div className="grid grid-cols-8 gap-1.5 md:gap-2 justify-items-center">
                            {Array.from({ length: 32 }).map((_, i) => {
                                const seatId = `${selectedCar}-${i + 1}`;
                                const isSelected = selectedSeats.includes(seatId);
                                const isOccupied = i % 7 === 2 || i % 9 === 0;
                                return (
                                    <button
                                        key={seatId}
                                        disabled={isOccupied}
                                        onClick={() => toggleSeat(seatId)}
                                        className={cn(
                                            "w-7 h-7 md:w-9 md:h-9 rounded-lg transition-all relative flex items-center justify-center font-black text-[10px]",
                                            isOccupied ? "bg-gray-100 text-gray-300 cursor-not-allowed" :
                                                isSelected
                                                    ? "bg-tet-red text-white shadow-lg shadow-tet-red/30 scale-105 ring-2 ring-white"
                                                    : "bg-white text-gray-500 border border-gray-100 hover:border-tet-red hover:text-tet-red hover:shadow-md hover:-translate-y-0.5 shadow-sm"
                                        )}
                                    >
                                        {i + 1}
                                        {isSelected && <CheckCircle2 size={10} className="absolute -top-1 -right-1 text-white fill-tet-red" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded bg-white border border-gray-200 shadow-sm" />
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{t('ticket_details.seats.empty')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded bg-gray-100" />
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{t('ticket_details.seats.occupied')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded bg-tet-red shadow-lg shadow-tet-red/20" />
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{t('ticket_details.seats.selected')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selection Summary Sidebar */}
            <div className="lg:col-span-4">
                <div className="sticky top-40 space-y-3">
                    <div className="bg-white rounded-2xl md:rounded-[2rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100">
                        <h3 className="text-lg font-black text-gray-900 mb-5 flex items-center justify-between">
                            {t('ticket_details.summary.title')}
                            <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center">
                                <ShoppingBag size={14} className="text-gray-400" />
                            </div>
                        </h3>

                        {selectedSeats.length === 0 ? (
                            <div className="py-8 text-center space-y-2 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto shadow-sm">
                                    <Info size={20} className="text-gray-200" />
                                </div>
                                <p className="text-gray-300 font-black text-[9px] uppercase tracking-[0.2em] px-4">{t('ticket_details.summary.please_select')}</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="max-h-48 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                                    {selectedSeats.map(id => (
                                        <div key={id} className="flex items-center justify-between p-2.5 bg-gray-50/50 rounded-xl border border-gray-100 group hover:bg-white hover:shadow-md transition-all">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-tet-red font-black text-[10px] shadow-sm group-hover:scale-110 transition-transform">
                                                    {id.split('-')[1]}
                                                </div>
                                                <div>
                                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{t('ticket_details.car.label')} {id.split('-')[0]}</p>
                                                    <p className="font-bold text-gray-900 text-[11px]">{t('explore.schedules.status.economy') === 'Phổ thông' ? 'Ghế' : 'Seat'} {id.split('-')[1]}</p>
                                                </div>
                                            </div>
                                            <span className="font-black text-gray-900 text-xs">{formatPrice(ticket.pricePerSeat)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-3 border-t border-dashed border-gray-200 space-y-3">
                                    <div className="flex justify-between items-center px-1">
                                        <span className="font-bold text-gray-400 text-[10px]">{t('ticket_details.payment.summary_title')}</span>
                                        <span className="text-xl font-black text-tet-red">{formatPrice(selectedSeats.length * ticket.pricePerSeat)}</span>
                                    </div>
                                    <button
                                        onClick={nextStep}
                                        className="w-full bg-tet-yellow hover:bg-[#FFB300] text-red-900 font-black py-3.5 rounded-xl shadow-lg shadow-tet-yellow/10 transition-all transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-[10px]"
                                    >
                                        {t('ticket_details.summary.continue')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-red-50/60 p-4 rounded-2xl border border-red-100 shadow-sm flex items-start gap-3">
                        <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm shadow-red-200">
                            <AlertTriangle className="text-tet-red" size={14} />
                        </div>
                        <div>
                            <h4 className="font-black text-tet-red text-[9px] uppercase tracking-widest mb-0.5 leading-tight">{t('ticket_details.notes.title')}</h4>
                            <p className="text-red-900/60 text-[9px] font-bold leading-relaxed">
                                {t('ticket_details.notes.text')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Step 2: Passenger Info View
    const renderPassengerInfo = () => (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm">
                        <Users className="text-tet-red" size={20} />
                    </div>
                    {t('ticket_details.passengers.title')}
                </h3>
                {selectedSeats.map((seatId, index) => (
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        key={seatId}
                        className="bg-white rounded-2xl p-4 md:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4">
                            <span className="px-2 py-1 bg-gray-50 text-gray-300 text-[7px] font-black rounded-md uppercase tracking-widest shadow-inner">
                                G{seatId.split('-')[1]} • T{seatId.split('-')[0]}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                            <div className="space-y-1.5">
                                <label className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] px-1 flex items-center gap-1.5">
                                    <div className="w-1 h-1 rounded-full bg-tet-red" /> {t('ticket_details.passengers.fullname')}
                                </label>
                                <input
                                    type="text"
                                    placeholder="NGUYỄN VĂN A"
                                    className="w-full bg-gray-50/50 border-2 border-transparent focus:border-tet-red focus:bg-white focus:ring-4 focus:ring-tet-red/5 rounded-lg px-3 py-2 outline-none font-bold text-xs text-gray-900 transition-all placeholder:text-gray-300 shadow-inner"
                                    value={passengers[seatId]?.name || ''}
                                    onChange={(e) => handlePassengerChange(seatId, 'name', e.target.value)}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] px-1 flex items-center gap-1.5">
                                    <div className="w-1 h-1 rounded-full bg-tet-red" /> {t('ticket_details.passengers.id_card')}
                                </label>
                                <input
                                    type="text"
                                    placeholder={t('ticket_details.passengers.id_placeholder')}
                                    className="w-full bg-gray-50/50 border-2 border-transparent focus:border-tet-red focus:bg-white focus:ring-4 focus:ring-tet-red/5 rounded-lg px-3 py-2 outline-none font-bold text-xs text-gray-900 transition-all placeholder:text-gray-300 shadow-inner"
                                    value={passengers[seatId]?.idCard || ''}
                                    onChange={(e) => handlePassengerChange(seatId, 'idCard', e.target.value)}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
                <div className="bg-red-50/50 rounded-2xl p-4 border border-red-100/50 flex gap-3">
                    <AlertCircle className="text-tet-red shrink-0" size={18} />
                    <p className="text-[10px] text-red-700/80 font-bold leading-relaxed">
                        {t('ticket_details.passengers.note')}
                    </p>
                </div>
            </div>

            <div className="lg:col-span-4">
                <div className="sticky top-40 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                    <h3 className="text-xl font-black text-gray-900 mb-6">{t('ticket_details.summary.trip_summary')}</h3>
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 font-bold">{t('explore.schedules.table.train')}</span>
                            <span className="font-black text-gray-900">{ticket.trainId}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 font-bold">{t('search_results.view.list') === 'Xem ngang' ? 'Số lượng vé' : 'Quantity'}</span>
                            <span className="font-black text-gray-900">{t('ticket_details.summary.ticket_count', { count: selectedSeats.length })}</span>
                        </div>
                        <div className="h-px bg-gray-100" />
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 font-bold">{t('ticket_details.summary.total_price')}</span>
                            <span className="text-2xl font-black text-tet-red">{(selectedSeats.length * ticket.pricePerSeat).toLocaleString()}đ</span>
                        </div>
                    </div>
                    <button
                        onClick={nextStep}
                        className="w-full bg-tet-yellow hover:bg-[#FFB300] text-red-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-tet-yellow/20 transition-all"
                    >
                        {t('ticket_details.summary.continue_payment')} <ChevronRight size={20} />
                    </button>
                    <button
                        onClick={prevStep}
                        className="w-full mt-3 text-gray-400 font-bold hover:text-gray-600 transition-colors py-2"
                    >
                        {t('ticket_details.summary.back_to_seats')}
                    </button>
                </div>
            </div>
        </div>
    );

    // Step 3: Payment
    const renderPayment = () => (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-4">
                <div className="bg-white rounded-[1.5rem] p-5 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-tet-yellow/[0.03] rounded-full -mr-24 -mt-24" />
                    <h3 className="text-lg md:text-xl font-black text-gray-900 mb-5 md:mb-8 flex items-center gap-3 relative z-10">
                        <div className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl flex items-center justify-center border border-gray-100 shadow-sm">
                            <CreditCard className="text-tet-red" size={18} />
                        </div>
                        {t('ticket_details.payment.title')}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 relative z-10">
                        {[
                            { id: 'momo', name: 'Ví MoMo', icon: 'M', color: 'bg-[#A30065]' },
                            { id: 'vnpay', name: 'VNPay', icon: 'V', color: 'bg-[#005BAA]' },
                            { id: 'visa', name: 'Thẻ Visa/Master', icon: '💳', color: 'bg-gray-800' },
                            { id: 'atm', name: 'Thẻ ATM Nội địa', icon: '🏦', color: 'bg-tet-red' }
                        ].map((method) => (
                            <button
                                key={method.id}
                                onClick={() => setPaymentMethod(method.id)}
                                className={cn(
                                    "p-3.5 md:p-5 rounded-xl md:rounded-[1.5rem] border-2 transition-all flex items-center gap-3 md:gap-4 group relative overflow-hidden",
                                    paymentMethod === method.id
                                        ? "border-tet-red bg-white shadow-lg shadow-tet-red/5 -translate-y-0.5"
                                        : "border-gray-50 bg-gray-50/50 hover:border-gray-200 hover:bg-white"
                                )}
                            >
                                <div className={cn(
                                    "w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center text-white text-lg md:text-xl font-black shadow-lg shadow-black/10 group-hover:scale-110 transition-transform",
                                    method.color
                                )}>
                                    {method.icon}
                                </div>
                                <div className="text-left">
                                    <p className="font-black text-gray-900 text-sm md:text-base mb-0.5">{method.name}</p>
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">{t('ticket_details.payment.free_fee')}</p>
                                </div>
                                {paymentMethod === method.id && (
                                    <div className="absolute top-2.5 right-2.5 md:top-3 md:right-3 text-tet-red">
                                        <CheckCircle2 size={18} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-[2rem] border border-gray-100 flex items-center gap-3 md:gap-4 shadow-sm">
                        <div className="w-8 h-8 md:w-12 md:h-12 bg-green-50 text-green-500 rounded-lg md:rounded-xl flex items-center justify-center shrink-0">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <p className="font-black text-gray-900 text-[10px] md:text-xs mb-0.5 uppercase tracking-tight">{t('ticket_details.payment.safe_payment')}</p>
                            <p className="text-gray-400 text-[9px] md:text-[10px] font-bold leading-tight md:leading-relaxed">{t('ticket_details.payment.safe_desc')}</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-[2rem] border border-gray-100 flex items-center gap-3 md:gap-4 shadow-sm">
                        <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-50 text-blue-500 rounded-lg md:rounded-xl flex items-center justify-center shrink-0">
                            <Zap size={20} />
                        </div>
                        <div>
                            <p className="font-black text-gray-900 text-[10px] md:text-xs mb-0.5 uppercase tracking-tight">{t('ticket_details.payment.instant')}</p>
                            <p className="text-gray-400 text-[9px] md:text-[10px] font-bold leading-tight md:leading-relaxed">{t('ticket_details.payment.instant_desc')}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
                <div className="bg-white rounded-2xl md:rounded-[2rem] p-5 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 sticky top-48">
                    <h3 className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-5 md:mb-6">{t('ticket_details.payment.summary_title')}</h3>
                    <div className="space-y-2.5 md:space-y-3">
                        <div className="flex justify-between items-center text-[11px] md:text-xs font-bold text-gray-400 px-0.5">
                            <span>{t('ticket_details.payment.price_for', { count: selectedSeats.length })}</span>
                            <span className="text-gray-900">{formatPrice(selectedSeats.length * ticket.pricePerSeat)} VNĐ</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px] md:text-xs font-bold text-gray-400 px-0.5">
                            <span>{t('ticket_details.payment.service_fee')}</span>
                            <span className="text-green-500">{t('ticket_details.payment.free')}</span>
                        </div>
                        <div className="pt-3 md:pt-5 border-t border-dashed border-gray-200 mt-3 md:mt-5">
                            <div className="flex justify-between items-center mb-5 md:mb-6 px-0.5">
                                <span className="font-black text-gray-900 uppercase text-[9px] md:text-[10px] tracking-widest">{t('ticket_details.summary.total')}</span>
                                <span className="text-xl md:text-2xl font-black text-tet-red">{formatPrice(selectedSeats.length * ticket.pricePerSeat)}</span>
                            </div>
                            <button
                                onClick={nextStep}
                                disabled={!paymentMethod}
                                className="w-full bg-tet-red hover:bg-tet-red-dark text-white font-black py-3.5 md:py-4 rounded-xl md:rounded-[1.2rem] disabled:opacity-50 disabled:grayscale transition-all shadow-lg shadow-tet-red/10 transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.2em] text-[10px] md:text-xs"
                            >
                                {t('ticket_details.payment.pay_now')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Step 4: Success View
    const renderSuccess = () => (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-xl mx-auto text-center space-y-6 py-4"
        >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl animate-bounce">
                <CheckCircle2 size={40} className="md:size-48" />
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">{t('ticket_details.success.title')}</h2>
                <p className="text-gray-500 font-bold text-sm md:text-base">
                    {t('ticket_details.success.booking_code')} <span className="text-tet-red font-black">VT2026-X89J</span>
                </p>
            </div>

            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-xl border border-gray-100 relative overflow-hidden text-left space-y-6 md:space-y-8 group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-tet-red/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="flex justify-between items-start border-b border-gray-100 pb-6 md:pb-8 relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-red-50 px-2.5 py-1 rounded-full text-[9px] font-black text-tet-red uppercase tracking-widest mb-3">
                            {t('ticket_details.success.e_ticket')}
                        </div>
                        <p className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
                            {ticket.trainId}: <span className="text-tet-red underline decoration-dashed decoration-2 underline-offset-4">{ticket.from}</span> - {ticket.to}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">{t('ticket_details.success.departure_date')}</p>
                        <p className="text-lg md:text-xl font-black text-gray-900">{ticket.date}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 relative z-10">
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">{t('ticket_details.passengers.title')}</p>
                        <div className="space-y-0.5">
                            {selectedSeats.map(id => (
                                <p key={id} className="font-black text-gray-900 text-sm md:text-base">{passengers[id]?.name || (t('explore.schedules.table.action') === 'Hành động' ? 'KHÁCH HÀNG' : 'CUSTOMER')}</p>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">{t('ticket_details.car.label')} / {t('explore.schedules.status.economy') === 'Phổ thông' ? 'Chỗ' : 'Seat'}</p>
                        <div className="space-y-0.5">
                            {selectedSeats.map(id => (
                                <p key={id} className="font-black text-gray-900 text-sm md:text-base">{t('ticket_details.car.label')} {id.split('-')[0]} - {t('explore.schedules.status.economy') === 'Phổ thông' ? 'Số' : 'No'} {id.split('-')[1]}</p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-6 md:pt-8 flex flex-col items-center gap-4 relative z-10">
                    <div className="p-3 bg-gray-50 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100">
                        <div className="w-32 h-32 md:w-44 md:h-44 bg-white rounded-xl md:rounded-2xl flex items-center justify-center border border-dashed border-gray-100">
                            <span className="text-[8px] font-black text-gray-300 tracking-[0.2em] uppercase">{t('ticket_details.success.qr_code')}</span>
                        </div>
                    </div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">VETAU2026-X89J</p>
                </div>
            </div>

            <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 text-tet-red font-black text-lg hover:underline transition-all"
            >
                {t('ticket_details.success.back_home')} <ChevronRight />
            </button>
        </motion.div>
    );

    return (
        <main className="min-h-screen bg-[#FDFDFD] flex flex-col">
            <Helmet>
                <title>{t('ticket_details.seo_title', { train: ticket.trainId, from: ticket.from, to: ticket.to })}</title>
                <meta name="description" content={t('ticket_details.seo_desc', { train: ticket.trainId, from: ticket.from, to: ticket.to, date: ticket.date })} />
            </Helmet>
            <div className="flex-grow">
                <Header />

                {/* Multi-step Header - Sticky below fixed main header */}
                <div className="pt-[100px] md:pt-[140px] pb-4 md:pb-5 bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40 transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-wrap items-center justify-between gap-3 md:gap-4">
                        <button
                            onClick={() => step === 1 ? navigate(-1) : prevStep()}
                            className="flex items-center gap-1.5 text-gray-400 hover:text-tet-red transition-all font-bold group bg-white px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-lg border border-gray-100 shadow-sm text-[10px] md:text-[11px] uppercase tracking-wider"
                        >
                            <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> <span className="hidden xs:inline">{t('ticket_details.steps.back')}</span>
                        </button>

                        <div className="flex items-center gap-2 md:gap-4">
                            {[
                                { s: 1, n: t('ticket_details.steps.select_seat') },
                                { s: 2, n: t('ticket_details.steps.info') },
                                { s: 3, n: t('ticket_details.steps.payment') }
                            ].map((item, i) => (
                                <React.Fragment key={item.s}>
                                    <div className={cn(
                                        "flex items-center gap-1.5 md:gap-2 font-bold transition-all",
                                        step === item.s ? "text-tet-red scale-105" : step > item.s ? "text-green-500" : "text-gray-300"
                                    )}>
                                        <span className={cn(
                                            "w-6 h-6 md:w-7 md:h-7 rounded-md md:rounded-lg flex items-center justify-center text-[9px] md:text-[10px] transition-all shadow-sm",
                                            step === item.s ? "bg-tet-red text-white shadow-tet-red/20 rotate-12" : step > item.s ? "bg-green-500 text-white" : "bg-gray-50 text-gray-400"
                                        )}>
                                            {step > item.s ? <CheckCircle2 size={12} /> : item.s}
                                        </span>
                                        <span className="hidden sm:inline uppercase tracking-widest text-[9px]">{item.n}</span>
                                    </div>
                                    {i < 2 && <div className={cn("h-px w-3 md:w-6 transition-colors", step > item.s ? "bg-green-500" : "bg-gray-100")} />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 md:py-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {step === 1 && renderSeatSelection()}
                            {step === 2 && renderPassengerInfo()}
                            {step === 3 && renderPayment()}
                            {step === 4 && renderSuccess()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default TicketDetails;
