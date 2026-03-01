import React from 'react';
import { motion } from 'framer-motion';
import { Train, Mail, Lock, User, ArrowRight, Github, Chrome, ChevronLeft, AlertCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { cn } from '@/lib/utils';

const registerSchema = yup.object({
    fullname: yup.string().required('Vui lòng nhập họ và tên'),
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: yup.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
}).required();

const Register = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const onSubmit = (data) => {
        console.log('Register data:', data);
        navigate('/');
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-tet-red/[0.03] rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tet-yellow/[0.03] rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590490333550-617882208035?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-[0.02] grayscale" />
            </div>

            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-8 left-8 z-50 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-bold group"
            >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Quay lại trang chủ
            </button>

            <div className="container max-w-6xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">

                {/* Left Side: Branding/Content */}
                <div className="hidden lg:block lg:w-1/2 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-tet-red rounded-2xl flex items-center justify-center shadow-lg shadow-tet-red/20">
                                <Train className="text-white" size={28} />
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">VÉ <span className="text-tet-red">TÀU</span></h1>
                        </div>
                        <h2 className="text-5xl font-black text-gray-900 leading-tight mb-6">
                            Hành trình về quê <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tet-red via-tet-yellow to-tet-red bg-[length:200%_auto] animate-gradient whitespace-nowrap">Sum họp & Bình an</span>
                        </h2>
                        <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-md">
                            Tham gia cùng hàng triệu hành khách trên khắp Việt Nam. Đặt vé nhanh chóng, an toàn và bảo mật.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="flex items-center gap-8 pt-8"
                    >
                        <div className="text-center">
                            <p className="text-3xl font-black text-gray-900">1M+</p>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Hành khách</p>
                        </div>
                        <div className="w-px h-10 bg-gray-100" />
                        <div className="text-center">
                            <p className="text-3xl font-black text-gray-900">99%</p>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Hài lòng</p>
                        </div>
                        <div className="w-px h-10 bg-gray-100" />
                        <div className="text-center">
                            <p className="text-3xl font-black text-gray-900">24/7</p>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Hỗ trợ</p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Register Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full lg:w-[480px]"
                >
                    <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden">
                        {/* Decorative inner glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-tet-red/10 blur-3xl -z-10" />

                        <div className="mb-10 text-center lg:text-left">
                            <h3 className="text-3xl font-black text-gray-900 mb-2">
                                Tạo tài khoản mới
                            </h3>
                            <p className="text-gray-500 font-medium">
                                Bắt đầu trải nghiệm đặt vé tàu hiện đại ngay hôm nay.
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-500 uppercase tracking-widest px-1">Họ và tên</label>
                                <div className="relative group">
                                    <User className={cn("absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-tet-red transition-colors", errors.fullname && "text-red-500")} size={20} />
                                    <input
                                        type="text"
                                        placeholder="Nguyễn Văn A"
                                        {...register('fullname')}
                                        className={cn(
                                            "w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 outline-none focus:border-tet-red focus:bg-white focus:ring-4 focus:ring-tet-red/5 transition-all font-bold",
                                            errors.fullname && "border-red-500 focus:ring-red-500/10"
                                        )}
                                    />
                                </div>
                                {errors.fullname && (
                                    <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 px-1">
                                        <AlertCircle size={10} /> {errors.fullname.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-500 uppercase tracking-widest px-1">Email / Số điện thoại</label>
                                <div className="relative group">
                                    <Mail className={cn("absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-tet-red transition-colors", errors.email && "text-red-500")} size={20} />
                                    <input
                                        type="text"
                                        placeholder="example@gmail.com"
                                        {...register('email')}
                                        className={cn(
                                            "w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 outline-none focus:border-tet-red focus:bg-white focus:ring-4 focus:ring-tet-red/5 transition-all font-bold",
                                            errors.email && "border-red-500 focus:ring-red-500/10"
                                        )}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 px-1">
                                        <AlertCircle size={10} /> {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Mật khẩu</label>
                                </div>
                                <div className="relative group">
                                    <Lock className={cn("absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-tet-red transition-colors", errors.password && "text-red-500")} size={20} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        {...register('password')}
                                        className={cn(
                                            "w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 outline-none focus:border-tet-red focus:bg-white focus:ring-4 focus:ring-tet-red/5 transition-all font-bold",
                                            errors.password && "border-red-500 focus:ring-red-500/10"
                                        )}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 px-1">
                                        <AlertCircle size={10} /> {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <button className="w-full bg-tet-red hover:bg-tet-red-dark text-white font-black py-4 rounded-2xl shadow-xl shadow-tet-red/20 transition-all flex items-center justify-center gap-2 group mt-4 transform active:scale-[0.98]">
                                Tạo tài khoản <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        <div className="mt-8">
                            <div className="relative flex items-center justify-center mb-8">
                                <div className="border-t border-gray-100 w-full" />
                                <span className="bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest absolute">Hoặc tiếp tục với</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-3 bg-gray-50 border border-gray-200 hover:bg-gray-100 py-3.5 rounded-2xl transition-all group">
                                    <Chrome size={20} className="text-gray-500 group-hover:text-gray-900 transition-colors" />
                                    <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900">Google</span>
                                </button>
                                <button className="flex items-center justify-center gap-3 bg-gray-50 border border-gray-200 hover:bg-gray-100 py-3.5 rounded-2xl transition-all group">
                                    <Github size={20} className="text-gray-500 group-hover:text-gray-900 transition-colors" />
                                    <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900">Github</span>
                                </button>
                            </div>
                        </div>

                        <p className="mt-10 text-center text-gray-500 font-bold">
                            Đã có tài khoản?{' '}
                            <Link
                                to="/login"
                                className="text-tet-red hover:underline decoration-2 underline-offset-4 decoration-tet-red/30 transition-all"
                            >
                                Đăng nhập ngay
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
