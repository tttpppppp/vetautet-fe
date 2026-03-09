import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

const destinations = [
    {
        id: 1,
        name: 'Hà Nội',
        tours: '124 Hành trình',
        image: 'https://images.unsplash.com/photo-1599708153386-62bf3f0b0bc8?auto=format&fit=crop&q=80&w=800',
        className: 'col-span-12 md:col-span-8 row-span-2'
    },
    {
        id: 2,
        name: 'Đà Nẵng',
        tours: '86 Hành trình',
        image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800',
        className: 'col-span-12 md:col-span-4 row-span-1'
    },
    {
        id: 3,
        name: 'Sa Pa',
        tours: '54 Hành trình',
        image: 'https://images.unsplash.com/photo-1592394533824-9440e5d68530?auto=format&fit=crop&q=80&w=800',
        className: 'col-span-12 md:col-span-4 row-span-1'
    },
    {
        id: 4,
        name: 'Hồ Chí Minh',
        tours: '215 Hành trình',
        image: 'https://plus.unsplash.com/premium_photo-1669466547631-41c3ffbe0edb?auto=format&fit=crop&q=80&w=800',
        className: 'col-span-12 md:col-span-4 row-span-1'
    },
    {
        id: 5,
        name: 'Đà Lạt',
        tours: '92 Hành trình',
        image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&q=80&w=800',
        className: 'col-span-12 md:col-span-8 row-span-1'
    }
];

const DestinationsSection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-tet-red font-bold tracking-wider uppercase text-sm mb-3">
                            <span className="w-8 h-1 bg-tet-red rounded-full"></span>
                            <span>Khám Phá Điểm Đến</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
                            Những Điểm Đến <br /> <span className="text-tet-red">Được Yêu Thích Nhất</span>
                        </h2>
                    </div>
                    <button className="mt-6 md:mt-0 flex items-center gap-2 text-gray-600 hover:text-tet-red font-bold transition-colors group px-6 py-3 rounded-full border-2 border-gray-200 hover:border-tet-red/30 hover:bg-red-50">
                        Xem tất cả điểm đến
                        <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[280px]">
                    {destinations.map((dest) => (
                        <div
                            key={dest.id}
                            className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ${dest.className}`}
                        >
                            {/* Background Image */}
                            <img
                                src={dest.image}
                                alt={dest.name}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex justify-between items-end">
                                <div>
                                    <div className="flex items-center gap-1.5 text-white/90 text-sm font-semibold mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <MapPin size={16} />
                                        <span>Việt Nam</span>
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-black text-white mb-1 shadow-black drop-shadow-md tracking-tight">
                                        {dest.name}
                                    </h3>
                                    <p className="text-white/80 text-sm md:text-base font-semibold">
                                        {dest.tours}
                                    </p>
                                </div>

                                {/* Hover Arrow */}
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100 border border-white/30 shadow-lg">
                                    <ArrowRight className="text-white" size={24} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DestinationsSection;
