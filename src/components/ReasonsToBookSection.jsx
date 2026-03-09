import React from 'react';
import { Star, Apple, Play, Train, CalendarSync, ShieldCheck, Download } from 'lucide-react';

const reasons = [
    {
        id: 1,
        title: 'Đáp ứng mọi nhu cầu hành trình',
        description: 'Từ các tuyến tàu cao tốc Bắc Nam, tàu địa phương đến vé khứ hồi. Đa dạng lựa chọn khoang ghế ngồi, giường nằm phù hợp mọi ngân sách.',
        icon: <Train className="text-white" size={24} />,
        bgColor: 'bg-blue-500',
        lightBg: 'bg-blue-50',
    },
    {
        id: 2,
        title: 'Thay đổi lịch trình linh hoạt',
        description: 'Kế hoạch của bạn đột nhiên thay đổi? Đừng lo lắng! Hỗ trợ đổi trả vé, dời ngày đi hoặc hoàn tiền trực tuyến nhanh chóng, dễ dàng.',
        icon: <CalendarSync className="text-white" size={24} />,
        bgColor: 'bg-green-500',
        lightBg: 'bg-green-50',
    },
    {
        id: 3,
        title: 'Thanh toán an toàn, đa dạng',
        description: 'Bảo mật thông tin giao dịch tuyệt đối tuyệt đối. Đa dạng phương thức thanh toán: thẻ tín dụng, chuyển khoản ngân hàng và các ví điện tử.',
        icon: <ShieldCheck className="text-white" size={24} />,
        bgColor: 'bg-tet-red',
        lightBg: 'bg-red-50',
    }
];

const ReasonsToBookSection = () => {
    return (
        <section className="py-20 lg:py-28 bg-gray-50/50 relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-100 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                        Lý do nên đặt chỗ với <span className="text-tet-red">Hệ Thống?</span>
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Left Column - Stats & App Download */}
                    <div className="lg:w-1/3 flex flex-col">
                        <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex-1 flex flex-col justify-center">
                            <h3 className="text-2xl font-black text-gray-900 mb-2">Hơn 50 triệu lượt tải,<br />hơn 1 triệu đánh giá</h3>

                            <div className="flex items-center gap-6 mt-6 mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white">
                                        <Apple size={20} className="-mt-0.5" />
                                    </div>
                                    <div>
                                        <div className="flex text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                                            ))}
                                        </div>
                                        <div className="text-sm font-bold text-gray-900">4.8 / 5</div>
                                    </div>
                                </div>
                                <div className="w-px h-10 bg-gray-200"></div>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                        <Play size={18} fill="currentColor" />
                                    </div>
                                    <div>
                                        <div className="flex text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                                            ))}
                                        </div>
                                        <div className="text-sm font-bold text-gray-900">4.9 / 5</div>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full sm:w-auto self-start bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/30">
                                <Download size={20} />
                                <span>Tải ứng dụng ngay</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Reasons Cards */}
                    <div className="lg:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                            {/* Card 1 */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 md:col-span-2 group flex flex-col sm:flex-row items-start gap-6">
                                <div className={`w-14 h-14 shrink-0 rounded-2xl ${reasons[0].lightBg} text-blue-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform`}>
                                    <Train size={28} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-[17px] font-bold text-gray-900 mb-2">
                                        {reasons[0].title}
                                    </h3>
                                    <p className="text-gray-600 text-[15px] leading-relaxed">
                                        {reasons[0].description}
                                    </p>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                                <div className="flex items-start gap-5">
                                    <div className={`w-14 h-14 shrink-0 rounded-2xl ${reasons[1].lightBg} text-green-600 flex items-center justify-center transform group-hover:-rotate-12 transition-transform mb-5`}>
                                        <CalendarSync size={28} />
                                    </div>
                                </div>
                                <h3 className="text-[17px] font-bold text-gray-900 mb-2">
                                    {reasons[1].title}
                                </h3>
                                <p className="text-gray-600 text-[15px] leading-relaxed">
                                    {reasons[1].description}
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                                <div className="flex items-start gap-5">
                                    <div className={`w-14 h-14 shrink-0 rounded-2xl ${reasons[2].lightBg} text-tet-red flex items-center justify-center transform group-hover:scale-110 transition-transform mb-5`}>
                                        <ShieldCheck size={28} />
                                    </div>
                                </div>
                                <h3 className="text-[17px] font-bold text-gray-900 mb-2">
                                    {reasons[2].title}
                                </h3>
                                <p className="text-gray-600 text-[15px] leading-relaxed">
                                    {reasons[2].description}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ReasonsToBookSection;
