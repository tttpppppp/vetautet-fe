import React from 'react';
import { Gift, Zap, Smartphone, ArrowRight } from 'lucide-react';

const PromotionSection = () => {
    return (
        <section className="py-24 bg-white overflow-hidden relative">
            {/* Decorative Tet Background Pattern */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-red-50/50 clip-path-tet -z-10" />

            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Promotion Banner 1 */}
                    <div className="relative group grayscale hover:grayscale-0 transition-all duration-700">
                        <div className="absolute inset-0 bg-gradient-to-br from-tet-red to-red-900 rounded-[3rem] transform rotate-1 group-hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-red-500/20" />
                        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-10 md:p-14 rounded-[3rem] h-full flex flex-col justify-center min-h-[400px]">
                            <div className="w-16 h-16 bg-tet-yellow rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-tet-yellow/30">
                                <Gift className="text-red-900" size={32} />
                            </div>
                            <h3 className="text-4xl font-black text-white mb-4 leading-tight">
                                Giảm Giá 20% <br /> <span className="text-tet-yellow italic">Vé Tàu Tết</span>
                            </h3>
                            <p className="text-red-50 mb-8 text-lg font-medium opacity-80">
                                Nhập mã "TETSUMHOP" để nhận ngay ưu đãi khi đặt vé sớm trước ngày 15/12.
                            </p>
                            <button className="bg-white text-tet-red px-8 py-4 rounded-2xl font-bold flex items-center gap-2 w-fit hover:bg-tet-yellow hover:text-red-900 transition-all transform hover:translate-x-2">
                                Nhận ưu đãi ngay <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Promotion Banner 2 & Info */}
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-tet-yellow to-[#FFD54F] p-8 md:p-12 rounded-[3rem] shadow-xl shadow-tet-yellow/20 relative overflow-hidden group">
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-red-900/10 px-3 py-1 rounded-full text-red-900 text-xs font-black uppercase tracking-wider mb-4">
                                        <Zap size={14} /> Flash Sale
                                    </div>
                                    <h4 className="text-2xl font-extrabold text-red-900 mb-2">Thanh toán qua App</h4>
                                    <p className="text-red-800/70 font-bold">Hoàn tiền lên đến 100k cho mỗi giao dịch</p>
                                </div>
                                <div className="hidden sm:block">
                                    <Smartphone size={80} className="text-red-900/10" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 hover:bg-red-50 hover:border-red-100 transition-colors group">
                                <div className="text-tet-red font-black text-4xl mb-3 group-hover:scale-110 transition-transform origin-left">2tr+</div>
                                <p className="text-gray-500 font-bold text-sm">Lượt đặt vé <br /> mỗi năm</p>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 hover:bg-yellow-50 hover:border-yellow-100 transition-colors group">
                                <div className="text-tet-yellow font-black text-4xl mb-3 group-hover:scale-110 transition-transform origin-left">99%</div>
                                <p className="text-gray-500 font-bold text-sm">Khách hàng <br /> hài lòng</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PromotionSection;
