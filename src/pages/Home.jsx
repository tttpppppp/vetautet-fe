import React from 'react';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import SearchForm from '@/components/SearchForm';
import TicketList from '@/components/TicketList';
import PromotionSection from '@/components/PromotionSection';
import Footer from '@/components/Footer';

const Home = () => {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero & Search Combined for Layout */}
            <div className="relative">
                <HeroSlider />
                <SearchForm />
            </div>

            {/* Ticket Listing */}
            <TicketList />

            {/* Promotions & Stats */}
            <PromotionSection />

            {/* Call to Action Section */}
            <section className="py-20 bg-tet-red relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Sẵn sàng cho hành trình Tết?</h2>
                    <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto font-medium">
                        Hàng ngàn vé tàu đang chờ đợi bạn. Đừng bỏ lỡ cơ hội về quê sum họp cùng gia đình với mức giá tốt nhất.
                    </p>
                    <button className="bg-tet-yellow hover:bg-white text-red-900 px-12 py-5 rounded-[2rem] font-black text-xl shadow-2xl transition-all transform hover:scale-105 active:scale-95">
                        Đặt vé ngay bây giờ
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default Home;
