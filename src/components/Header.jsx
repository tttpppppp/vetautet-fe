import React, { useState, useEffect } from 'react';
import { Menu, X, Train, User, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Trang chủ', href: '/' },
        { name: 'Khám phá', href: '/explore' },
        { name: 'Khuyến mãi', href: '#' },
        { name: 'Liên hệ', href: '#' },
    ];

    return (
        <header
            className={cn(
                "fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 w-[95%] lg:w-[90%] max-w-7xl",
                isScrolled ? "top-4" : "top-6"
            )}
        >
            <div
                className={cn(
                    "flex items-center justify-between px-6 py-3 rounded-[2.5rem] transition-all duration-500",
                    isScrolled
                        ? "bg-white/90 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] py-3"
                        : "bg-black/20 backdrop-blur-md border border-white/10 py-5"
                )}
            >
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-tet-red to-red-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
                        <Train className="text-white" size={24} />
                    </div>
                    <div className="flex flex-col">
                        <span className={cn(
                            "text-xl font-black tracking-tighter leading-none transition-colors",
                            isScrolled ? "text-gray-900" : "text-white"
                        )}>
                            VÉ TÀU <span className="text-tet-red group-hover:text-tet-yellow transition-colors">TẾT</span>
                        </span>
                        <span className={cn(
                            "text-[8px] font-bold uppercase tracking-[0.3em] transition-opacity",
                            isScrolled ? "text-gray-400" : "text-white/60"
                        )}>Hành trình sum họp</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={cn(
                                "text-sm font-bold transition-all relative py-2 group",
                                isScrolled ? "text-gray-600 hover:text-tet-red" : "text-white/90 hover:text-white"
                            )}
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tet-red transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-6">
                        <Link to="/profile" className="flex items-center gap-2 text-sm font-black text-gray-500 hover:text-tet-red transition-all group">
                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-red-50 group-hover:shadow-md transition-all">
                                <User size={18} className="group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="hidden sm:inline">Phạm Kỳ Anh</span>
                        </Link>
                        <button className="bg-tet-red text-white pl-8 pr-6 py-3.5 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-4 hover:bg-black transition-all shadow-xl shadow-tet-red/20 active:scale-95 group">
                            Đặt ngay
                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform">
                                <ChevronRight size={14} />
                            </div>
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={cn(
                            "lg:hidden p-2 rounded-xl transition-colors",
                            isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
                        )}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-x-0 top-[110%] bg-white/95 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-2xl p-6 lg:hidden transition-all duration-500 origin-top transform",
                isMobileMenuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
            )}>
                <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className="text-lg font-black text-gray-800 p-4 rounded-2xl hover:bg-red-50 hover:text-tet-red transition-all"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="h-px bg-gray-100 my-4" />
                    <Link
                        to="/login"
                        className="w-full bg-gray-100 text-gray-800 font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <User size={20} /> Đăng nhập / Đăng ký
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
