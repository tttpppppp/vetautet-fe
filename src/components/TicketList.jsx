import * as React from 'react';
import TicketCard from './TicketCard';
import { LayoutGrid, ListFilter, ChevronRight } from 'lucide-react';

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

const TicketList = () => {
    return (
        <section className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="h-1 w-8 bg-tet-red rounded-full"></span>
                            <span className="text-tet-red font-black text-[10px] uppercase tracking-[0.2em]">Khám phá ngay</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                            Vé Tàu Tết <span className="text-tet-red">Phổ Biến</span> Nhất
                        </h2>
                        <p className="text-gray-500 font-medium max-w-lg">
                            Các chuyến tàu được nhiều người lựa chọn nhất trong mùa Tết năm nay.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-900 shadow-sm">
                            <LayoutGrid size={20} />
                        </button>
                        <button className="p-3 text-gray-400">
                            <ListFilter size={20} />
                        </button>
                    </div>
                </div>

                {/* Ticket Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dummyTickets.map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-16 text-center">
                    <button className="px-10 py-5 bg-white border border-gray-100 text-gray-900 font-black rounded-2xl shadow-sm hover:shadow-md transition-all inline-flex items-center gap-3 group">
                        Xem tất cả lịch trình
                        <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TicketList;
