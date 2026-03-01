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

const TicketDetails = () => {
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
        from: 'Sài Gòn',
        to: 'Hà Nội',
        date: '25/01/2026',
        departureTime: '21:30',
        arrivalTime: '05:45 (+1 ngày)',
        duration: '32h 15p',
        pricePerSeat: 1250000,
        type: 'Giường nằm Khoang 4',
    };

    const cars = [
        { id: 1, type: 'Khoang 4 VIP', price: 1500000 },
        { id: 2, type: 'Khoang 6 Thường', price: 1100000 },
        { id: 3, type: 'Ngồi mềm Điều hòa', price: 850000 },
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

    // Step 1: Seat Selection View
    const renderSeatSelection = () => (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
                {/* Summary Card */}
                <div className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-tet-red/[0.02] rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-white rounded-2xl flex items-center justify-center text-tet-red shrink-0 shadow-sm border border-red-100/50">
                                <Train size={24} className="drop-shadow-sm" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="px-1.5 py-0.5 bg-tet-red text-white text-[8px] font-black rounded-md uppercase tracking-wider">Xuân 2026</span>
                                    <h2 className="text-lg font-black text-gray-900 tracking-tight">{ticket.trainId}</h2>
                                </div>
                                <p className="text-gray-400 font-bold flex items-center gap-2 text-[10px] uppercase tracking-wider">
                                    <Calendar size={10} className="text-tet-red" /> {ticket.date} <span className="w-1 h-1 rounded-full bg-gray-300" /> {ticket.type}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 md:gap-8 bg-gray-50/50 px-5 py-3 rounded-2xl border border-gray-100/50 backdrop-blur-sm">
                            <div className="text-center">
                                <p className="text-lg font-black text-gray-900 mb-0.5">{ticket.departureTime}</p>
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{ticket.from}</p>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[7px] font-black text-tet-red uppercase tracking-widest bg-red-50 px-1.5 py-0.5 rounded-full">{ticket.duration}</span>
                                <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full border border-tet-red bg-white" />
                                    <div className="w-8 h-[1px] bg-gradient-to-r from-tet-red via-tet-red/50 to-gray-200" />
                                    <div className="w-1 h-1 rounded-full bg-gray-200" />
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-black text-gray-900 mb-0.5">{ticket.arrivalTime}</p>
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{ticket.to}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Car Selection */}
                <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-black text-gray-900 group">
                        <div className="w-8 h-8 bg-red-50 text-tet-red rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12 shadow-sm">
                            <Train size={16} />
                        </div>
                        Chọn toa tàu
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {cars.map((car) => (
                            <button
                                key={car.id}
                                onClick={() => setSelectedCar(car.id)}
                                className={cn(
                                    "px-6 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-sm border-2 text-sm",
                                    selectedCar === car.id
                                        ? "bg-white border-tet-red text-tet-red shadow-lg shadow-tet-red/5 -translate-y-0.5"
                                        : "bg-white border-gray-50 text-gray-400 hover:border-gray-200 hover:text-gray-600 hover:bg-gray-50/50"
                                )}
                            >
                                <div className={cn(
                                    "w-2.5 h-2.5 rounded-full",
                                    selectedCar === car.id ? "bg-tet-red animate-pulse" : "bg-gray-200"
                                )} />
                                Toa {car.id}: {car.type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Seat Map */}
                <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col items-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
                    <div className="w-full max-w-xl">
                        <div className="w-full h-10 bg-gray-50 rounded-t-[3rem] border-x-4 border-t-4 border-gray-100 flex items-center justify-center mb-10 relative shadow-inner">
                            <span className="text-[9px] font-black text-gray-300 tracking-[0.4em] uppercase">Phòng Điều Hành / Đầu Tàu</span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 bg-gray-50/30 p-8 rounded-[2rem] border border-dashed border-gray-200">
                            {[...Array(28)].map((_, i) => {
                                const seatId = `${selectedCar}-${i + 1}`;
                                const isSelected = selectedSeats.includes(seatId);
                                const isOccupied = i % 7 === 2 || i % 9 === 0;
                                return (
                                    <button
                                        key={seatId}
                                        disabled={isOccupied}
                                        onClick={() => toggleSeat(seatId)}
                                        className={cn(
                                            "aspect-square rounded-xl transition-all relative flex items-center justify-center font-black text-xs",
                                            isOccupied ? "bg-gray-100 text-gray-300 cursor-not-allowed" :
                                                isSelected
                                                    ? "bg-tet-red text-white shadow-xl shadow-tet-red/30 scale-105 ring-2 ring-white"
                                                    : "bg-white text-gray-500 border border-gray-100 hover:border-tet-red hover:text-tet-red hover:shadow-lg hover:-translate-y-1 shadow-sm"
                                        )}
                                    >
                                        {i + 1}
                                        {isSelected && <CheckCircle2 size={12} className="absolute -top-1 -right-1 text-white fill-tet-red" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-white border border-gray-200 shadow-sm" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Trống</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-gray-100" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Đã đặt</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-tet-red shadow-lg shadow-tet-red/20" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Đang chọn</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selection Summary Sidebar */}
            <div className="lg:col-span-4">
                <div className="sticky top-40 space-y-4">
                    <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100">
                        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center justify-between">
                            Chi tiết đặt chỗ
                            <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                                <ShoppingBag size={16} className="text-gray-400" />
                            </div>
                        </h3>

                        {selectedSeats.length === 0 ? (
                            <div className="py-12 text-center space-y-3 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto shadow-sm">
                                    <Info size={24} className="text-gray-200" />
                                </div>
                                <p className="text-gray-300 font-black text-[10px] uppercase tracking-[0.2em] px-6">Vui lòng chọn chỗ ngồi</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    {selectedSeats.map(id => (
                                        <div key={id} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-100 group hover:bg-white hover:shadow-md transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-tet-red font-black text-xs shadow-sm group-hover:scale-110 transition-transform">
                                                    {id.split('-')[1]}
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Toa {id.split('-')[0]}</p>
                                                    <p className="font-bold text-gray-900 text-xs">Ghế {id.split('-')[1]}</p>
                                                </div>
                                            </div>
                                            <span className="font-black text-gray-900 text-sm">{(ticket.pricePerSeat / 1000000).toFixed(1)}M</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-dashed border-gray-200 space-y-4">
                                    <div className="flex justify-between items-center px-1">
                                        <span className="font-bold text-gray-400 text-sm">Tổng tiền</span>
                                        <span className="text-2xl font-black text-tet-red">{(selectedSeats.length * ticket.pricePerSeat / 1000000).toFixed(2)}M VNĐ</span>
                                    </div>
                                    <button
                                        onClick={nextStep}
                                        className="w-full bg-tet-yellow hover:bg-[#FFB300] text-red-900 font-black py-4 rounded-xl shadow-xl shadow-tet-yellow/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-xs"
                                    >
                                        Tiếp tục đặt vé
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-red-50/70 backdrop-blur-sm p-6 rounded-[1.8rem] border border-red-100 shadow-sm flex items-start gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm shadow-red-200">
                            <AlertTriangle className="text-tet-red" size={16} />
                        </div>
                        <div>
                            <h4 className="font-black text-tet-red text-[10px] uppercase tracking-widest mb-0.5 leading-tight">Lưu ý dịp Tết</h4>
                            <p className="text-red-900/60 text-[10px] font-bold leading-relaxed">
                                Tối đa 04 vé/khách. Thanh toán trong 15ph.
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
            <div className="lg:col-span-8 space-y-6">
                <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm">
                        <Users className="text-tet-red" size={24} />
                    </div>
                    Thông tin hành khách
                </h3>
                {selectedSeats.map((seatId, index) => (
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        key={seatId}
                        className="bg-white rounded-[1.8rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-6">
                            <span className="px-3 py-1.5 bg-gray-50 text-gray-300 text-[8px] font-black rounded-lg uppercase tracking-widest shadow-inner">
                                Ghế {seatId.split('-')[1]} • Toa {seatId.split('-')[0]}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-tet-red" /> Họ và tên
                                </label>
                                <input
                                    type="text"
                                    placeholder="Vd: NGUYỄN VĂN A"
                                    className="w-full bg-gray-50/50 border-2 border-transparent focus:border-tet-red focus:bg-white focus:ring-4 focus:ring-tet-red/5 rounded-xl px-4 py-3 outline-none font-bold text-sm text-gray-900 transition-all placeholder:text-gray-300 shadow-inner"
                                    value={passengers[seatId]?.name || ''}
                                    onChange={(e) => handlePassengerChange(seatId, 'name', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-tet-red" /> Số CMND / CCCD
                                </label>
                                <input
                                    type="text"
                                    placeholder="Số định danh"
                                    className="w-full bg-gray-50/50 border-2 border-transparent focus:border-tet-red focus:bg-white focus:ring-4 focus:ring-tet-red/5 rounded-xl px-4 py-3 outline-none font-bold text-sm text-gray-900 transition-all placeholder:text-gray-300 shadow-inner"
                                    value={passengers[seatId]?.idCard || ''}
                                    onChange={(e) => handlePassengerChange(seatId, 'idCard', e.target.value)}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
                <div className="bg-red-50 rounded-3xl p-6 border border-red-100 flex gap-4">
                    <AlertCircle className="text-tet-red shrink-0" size={24} />
                    <p className="text-xs text-red-700 font-bold leading-relaxed">
                        Thông tin hành khách phải trùng khớp với giấy tờ tùy thân. Vé tàu Tết sẽ được kiểm tra CCCD/Hộ chiếu khi lên tàu.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-4">
                <div className="sticky top-40 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                    <h3 className="text-xl font-black text-gray-900 mb-6">Tóm tắt chuyến đi</h3>
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 font-bold">Chuyến tàu</span>
                            <span className="font-black text-gray-900">{ticket.trainId}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 font-bold">Số lượng vé</span>
                            <span className="font-black text-gray-900">{selectedSeats.length} Người</span>
                        </div>
                        <div className="h-px bg-gray-100" />
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 font-bold">Tổng tiền</span>
                            <span className="text-2xl font-black text-tet-red">{(selectedSeats.length * ticket.pricePerSeat).toLocaleString()}đ</span>
                        </div>
                    </div>
                    <button
                        onClick={nextStep}
                        className="w-full bg-tet-yellow hover:bg-[#FFB300] text-red-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-tet-yellow/20 transition-all"
                    >
                        Tiếp tục thanh toán <ChevronRight size={20} />
                    </button>
                    <button
                        onClick={prevStep}
                        className="w-full mt-3 text-gray-400 font-bold hover:text-gray-600 transition-colors py-2"
                    >
                        Quay về chọn chỗ
                    </button>
                </div>
            </div>
        </div>
    );

    // Step 3: Payment
    const renderPayment = () => (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
                <div className="bg-white rounded-[3rem] p-12 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-tet-yellow/[0.03] rounded-full -mr-32 -mt-32" />
                    <h3 className="text-2xl font-black text-gray-900 mb-10 flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm">
                            <CreditCard className="text-tet-red" size={24} />
                        </div>
                        Phương thức thanh toán
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
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
                                    "p-8 rounded-[2rem] border-2 transition-all flex items-center gap-6 group relative overflow-hidden",
                                    paymentMethod === method.id
                                        ? "border-tet-red bg-white shadow-xl shadow-tet-red/5 -translate-y-1"
                                        : "border-gray-50 bg-gray-50/50 hover:border-gray-200 hover:bg-white"
                                )}
                            >
                                <div className={cn(
                                    "w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-black/10 group-hover:scale-110 transition-transform",
                                    method.color
                                )}>
                                    {method.icon}
                                </div>
                                <div className="text-left">
                                    <p className="font-black text-gray-900 text-lg mb-1">{method.name}</p>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Miễn phí giao dịch</p>
                                </div>
                                {paymentMethod === method.id && (
                                    <div className="absolute top-4 right-4 text-tet-red">
                                        <CheckCircle2 size={24} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex items-center gap-5 shadow-sm">
                        <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center shrink-0">
                            <ShieldCheck size={28} />
                        </div>
                        <div>
                            <p className="font-black text-gray-900 text-sm mb-1 uppercase tracking-tight">Thanh toán an toàn</p>
                            <p className="text-gray-400 text-xs font-bold leading-relaxed">Dữ liệu của bạn được mã hóa 256-bit chuẩn quốc tế.</p>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex items-center gap-5 shadow-sm">
                        <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shrink-0">
                            <Zap size={28} />
                        </div>
                        <div>
                            <p className="font-black text-gray-900 text-sm mb-1 uppercase tracking-tight">Xử lý tức thì</p>
                            <p className="text-gray-400 text-xs font-bold leading-relaxed">Nhận vé điện tử ngay sau khi hoàn tất thanh toán.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 sticky top-48">
                    <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-widest text-xs">Tổng kết thanh toán</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-bold text-gray-400 px-2">
                            <span>Giá vé ({selectedSeats.length} người)</span>
                            <span className="text-gray-900">{(selectedSeats.length * ticket.pricePerSeat / 1000000).toFixed(2)}M VNĐ</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold text-gray-400 px-2">
                            <span>Phí dịch vụ</span>
                            <span className="text-green-500">Miễn phí</span>
                        </div>
                        <div className="pt-6 border-t border-dashed border-gray-200 mt-6">
                            <div className="flex justify-between items-center mb-8 px-2">
                                <span className="font-black text-gray-900 uppercase text-xs tracking-widest">Tổng cộng</span>
                                <span className="text-3xl font-black text-tet-red">{(selectedSeats.length * ticket.pricePerSeat / 1000000).toFixed(2)}M</span>
                            </div>
                            <button
                                onClick={nextStep}
                                disabled={!paymentMethod}
                                className="w-full bg-tet-red hover:bg-tet-red-dark text-white font-black py-5 rounded-2xl disabled:opacity-50 disabled:grayscale transition-all shadow-xl shadow-tet-red/20 transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.2em] text-sm"
                            >
                                Thanh toán ngay
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
            className="max-w-2xl mx-auto text-center space-y-8 py-10"
        >
            <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                <CheckCircle2 size={56} />
            </div>
            <div className="space-y-4">
                <h2 className="text-4xl font-black text-gray-900">Đặt vé thành công!</h2>
                <p className="text-gray-500 font-bold text-lg">
                    Cảm ơn bạn đã tin tưởng dịch vụ Vé Tàu Tết. Mã đặt chỗ của bạn là: <span className="text-tet-red font-black">TET2026-X89J</span>
                </p>
            </div>

            <div className="bg-white rounded-[3rem] p-12 shadow-2xl border-2 border-gray-100 relative overflow-hidden text-left space-y-10 group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-tet-red/5 rounded-full -mr-20 -mt-20 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                <div className="flex justify-between items-start border-b border-gray-100 pb-10 relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full text-[10px] font-black text-tet-red uppercase tracking-widest mb-4">
                            Vé điện tử xuân bính ngọ
                        </div>
                        <p className="text-3xl font-black text-gray-900 leading-tight">
                            {ticket.trainId}: <span className="text-tet-red underline decoration-dashed decoration-2 underline-offset-8 transition-all hover:decoration-solid cursor-default">{ticket.from}</span> - {ticket.to}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2">Ngày đi</p>
                        <p className="text-2xl font-black text-gray-900">{ticket.date}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-12 relative z-10">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Hành khách</p>
                        <div className="space-y-1">
                            {selectedSeats.map(id => (
                                <p key={id} className="font-black text-gray-900 text-lg">{passengers[id]?.name || 'KHÁCH HÀNG'}</p>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Toa / Chỗ</p>
                        <div className="space-y-1">
                            {selectedSeats.map(id => (
                                <p key={id} className="font-black text-gray-900 text-lg">Toa {id.split('-')[0]} - Số {id.split('-')[1]}</p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-10 flex flex-col items-center gap-6 relative z-10">
                    <div className="p-4 bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-inner group/qr">
                        <div className="w-56 h-56 bg-white rounded-[2rem] flex items-center justify-center shadow-lg border-2 border-dashed border-gray-100 group-hover/qr:scale-[1.02] transition-transform duration-500">
                            <span className="text-[10px] font-black text-gray-300 tracking-[0.3em] uppercase animate-pulse">Scan QR Code</span>
                        </div>
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mt-4">VETAUTET2026-X89J</p>
                </div>
            </div>

            <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 text-tet-red font-black text-lg hover:underline transition-all"
            >
                Quay về trang chủ <ChevronRight />
            </button>
        </motion.div>
    );

    return (
        <main className="min-h-screen bg-[#FDFDFD] flex flex-col">
            <div className="flex-grow">
                <Header />

                {/* Multi-step Header - Sticky below fixed main header */}
                <div className="pt-[140px] pb-5 bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center justify-between gap-4">
                        <button
                            onClick={() => step === 1 ? navigate(-1) : prevStep()}
                            className="flex items-center gap-1.5 text-gray-400 hover:text-tet-red transition-all font-bold group bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm text-[11px] uppercase tracking-wider"
                        >
                            <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Quay lại
                        </button>

                        <div className="flex items-center gap-4 text-xs">
                            {[
                                { s: 1, n: 'Chọn chỗ' },
                                { s: 2, n: 'Thông tin' },
                                { s: 3, n: 'Thanh toán' }
                            ].map((item, i) => (
                                <React.Fragment key={item.s}>
                                    <div className={cn(
                                        "flex items-center gap-2 font-bold transition-all",
                                        step === item.s ? "text-tet-red scale-105" : step > item.s ? "text-green-500" : "text-gray-300"
                                    )}>
                                        <span className={cn(
                                            "w-7 h-7 rounded-lg flex items-center justify-center text-[10px] transition-all shadow-sm",
                                            step === item.s ? "bg-tet-red text-white shadow-tet-red/20 rotate-12" : step > item.s ? "bg-green-500 text-white" : "bg-gray-50 text-gray-400"
                                        )}>
                                            {step > item.s ? <CheckCircle2 size={14} /> : item.s}
                                        </span>
                                        <span className="hidden sm:inline uppercase tracking-widest text-[9px]">{item.n}</span>
                                    </div>
                                    {i < 2 && <div className={cn("h-px w-6 transition-colors", step > item.s ? "bg-green-500" : "bg-gray-100")} />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
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
