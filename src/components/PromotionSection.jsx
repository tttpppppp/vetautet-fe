import React from 'react';
import { Gift, Zap, Smartphone, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PromotionSection = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-white overflow-hidden relative">
            {/* Decorative Background Pattern */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-red-50/50 clip-path-tet -z-10" />

            <div className="max-w-7xl mx-auto px-4 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

                    {/* Promotion Banner 1 */}
                    <div className="relative group lg:grayscale lg:hover:grayscale-0 transition-all duration-700">
                        <div className="absolute inset-0 bg-gradient-to-br from-tet-red to-red-900 rounded-[2rem] md:rounded-[3rem] transform rotate-1 group-hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-red-500/20" />
                        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] h-full flex flex-col justify-center min-h-[320px] md:min-h-[400px]">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-tet-yellow rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-tet-yellow/30">
                                <Gift className="text-red-900" size={24} md:size={32} />
                            </div>
                            <h3 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-4 leading-tight">
                                {t('promotions.title_1')} <br /> <span className="text-tet-yellow italic font-black">{t('promotions.highlight_1')}</span>
                            </h3>
                            <p className="text-red-50 mb-6 md:mb-8 text-sm md:text-lg font-medium opacity-80 max-w-sm">
                                {t('promotions.desc_1')}
                            </p>
                            <button className="bg-white text-tet-red px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center gap-2 w-full sm:w-fit justify-center hover:bg-tet-yellow hover:text-red-900 transition-all transform hover:translate-x-2">
                                {t('promotions.cta_1')} <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Promotion Banner 2 & Info */}
                    <div className="space-y-6 md:space-y-8">
                        <div className="bg-gradient-to-r from-tet-yellow to-[#FFD54F] p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-xl shadow-tet-yellow/20 relative overflow-hidden group">
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-red-900/10 px-3 py-1 rounded-full text-red-900 text-[10px] md:text-xs font-black uppercase tracking-wider mb-4">
                                        <Zap size={14} /> {t('promotions.flash_sale')}
                                    </div>
                                    <h4 className="text-xl md:text-2xl font-extrabold text-red-900 mb-2">{t('promotions.title_2')}</h4>
                                    <p className="text-red-800/70 font-bold text-sm md:text-base">{t('promotions.desc_2')}</p>
                                </div>
                                <div className="hidden sm:block">
                                    <Smartphone size={80} className="text-red-900/10" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            <div className="bg-gray-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 hover:bg-red-50 hover:border-red-100 transition-colors group">
                                <div className="text-tet-red font-black text-2xl md:text-4xl mb-2 md:mb-3 group-hover:scale-110 transition-transform origin-left">{t('promotions.stats_1_val')}</div>
                                <p className="text-gray-500 font-bold text-[10px] md:text-sm uppercase tracking-wider whitespace-pre-line">{t('promotions.stats_1_label')}</p>
                            </div>
                            <div className="bg-gray-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 hover:bg-yellow-50 hover:border-yellow-100 transition-colors group">
                                <div className="text-tet-yellow font-black text-2xl md:text-4xl mb-2 md:mb-3 group-hover:scale-110 transition-transform origin-left">{t('promotions.stats_2_val')}</div>
                                <p className="text-gray-500 font-bold text-[10px] md:text-sm uppercase tracking-wider whitespace-pre-line">{t('promotions.stats_2_label')}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PromotionSection;
