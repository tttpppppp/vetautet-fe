import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    const quickLinks = [
        { name: t('footer.links.about'), href: '#' },
        { name: t('footer.links.privacy'), href: '#' },
        { name: t('footer.links.terms'), href: '#' },
        { name: t('footer.links.guide'), href: '#' },
        { name: t('footer.links.faq'), href: '#' },
    ];

    return (
        <footer className="bg-gray-900 text-white pt-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

                    {/* Brand Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-10 h-10 bg-tet-red rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
                                <span className="text-white font-bold text-xl">V</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight">
                                Vé <span className="text-tet-yellow italic">Tàu</span>
                            </span>
                        </div>
                        <p className="text-gray-400 font-medium leading-relaxed mb-8">
                            {t('footer.brand_desc')}
                        </p>
                        <div className="flex items-center gap-4">
                            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 bg-white/5 hover:bg-tet-red rounded-full flex items-center justify-center transition-all group">
                                    <Icon size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
                            {t('footer.explore_title')} <div className="h-1 w-6 bg-tet-yellow" />
                        </h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
                            {t('footer.contact_title')} <div className="h-1 w-6 bg-tet-yellow" />
                        </h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-tet-red mt-1 shrink-0" size={20} />
                                <span className="text-gray-400 font-medium whitespace-pre-line">{t('footer.contact.address')}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-tet-red shrink-0" size={20} />
                                <span className="text-gray-400 font-medium">{t('footer.contact.hotline')}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-tet-red shrink-0" size={20} />
                                <span className="text-gray-400 font-medium">{t('footer.contact.email')}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
                            {t('footer.newsletter_title')} <div className="h-1 w-6 bg-tet-yellow" />
                        </h4>
                        <p className="text-gray-400 font-medium mb-6">{t('footer.newsletter_desc')}</p>
                        <div className="flex gap-2 p-2 bg-white/5 rounded-2xl border border-white/10 focus-within:border-tet-red/50 transition-all">
                            <input
                                type="email"
                                placeholder={t('footer.newsletter_placeholder')}
                                className="bg-transparent border-none outline-none px-3 py-2 text-sm w-full font-medium"
                            />
                            <button className="bg-tet-red hover:bg-tet-red-dark text-white p-2.5 rounded-xl transition-colors">
                                <ArrowUpRight size={20} />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom Footer */}
                <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 pb-12">
                    <p className="text-gray-500 text-sm font-medium">
                        {t('footer.copyright')}
                    </p>
                    <div className="flex items-center gap-8">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Payment-card-icon.png/1200px-Payment-card-icon.png" alt="Payments" className="h-6 grayscale opacity-30 invert" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
