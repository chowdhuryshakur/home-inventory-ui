'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Eye, EyeOff, User, Lock, Package, AlertCircle, LogIn, ArrowBigRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:h-dvh lg:w-[50%] px-26.25 py-46 bg-linear-to-br from-[#EFF6FF] to-[#E0E7FF] hidden lg:flex justify-end">
        <div className='flex flex-col gap-10'>
            <Image src='/images/login_page_graphic.jpg' alt='login' width={512} height={500}/>
            <div className="text-center gap-3">
                <h1 className="text-[24px] font-semibold text-[#1E293B] mb-2">
                    Organize Everything
                </h1>
                <p className="text-[16px] text-[#475569]">Keep track of your belongings, warranties, and important<br/> documents all in one secure place.</p>
            </div>
        </div>
      </div>
      <div className="min-h-screen lg:h-dvh w-full lg:w-[50%] px-4 lg:px-[136] py-8 lg:py-44.5 flex justify-start">
        <div className='flex flex-col gap-8 w-full max-w-md'>
            <div className="flex flex-col items-center">
                <Image src='/images/logo.png' alt='logo' width={60} height={60}/>
                <h1 className="text-[24px] font-semibold text-[#0F172A]">
                    Home Inventory
                </h1>
                <p className="text-[14px] text-[#64748B]">Track and organize your things</p>
            </div>
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-lg p-8 gap-6">
                <div className="mb-6">
                    <h2 className="text-[20px] font-semibold text-[#0F172A]">Sign in to your account</h2>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5.5">
                    <div className='relative'>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field"
                            placeholder="Enter your username"
                            required
                            disabled={isLoading}
                        />
                        <User className="absolute right-3 top-12.5 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>

                    <div className='relative'>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            placeholder="Enter your password"
                            required
                            disabled={isLoading}
                        />
                         <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-12.5 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <div className='flex items-center justify-between'>
                        <span className='flex items-center'><input type='checkbox' className='mr-2'/><p className='text-[14px] text-[#334155]'>Remember me</p></span>
                        <a href="" className='text-[14px] text-[#3B82F6]'>Forgot password?</a>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 py-3 px-4 text-sm sm:text-base text-white font-medium rounded-lg bg-[#3B82F6]"
                        >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                        <ArrowRight className="w-5 h-5 mr-2" />
                    </Button>
                    <p className="text-sm text-gray-600 text-center">
                    Don&apos;t have an account?{' '}
                        <a
                            href="http://4.213.57.100:3100/swagger/index.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#3B82F6] hover:text-primary-700 font-medium"
                        >
                            Create one
                        </a>
                    </p>
                </form>
            </div>
            <div className='flex flex-col items-center'>
                <p className='text-[#64748B] text-[12px] mb-2'>Version 1.2.4</p>
                <div className='flex items-center gap-3'>
                    <p className='text-[#64748B] text-[12px]'>Help Center</p>
                    <p className='text-[#64748B] text-[12px]'>•</p>
                    <p className='text-[#64748B] text-[12px]'>Privacy Policy</p>
                    <p className='text-[#64748B] text-[12px]'>•</p>
                    <p className='text-[#64748B] text-[12px]'>Terms of Service</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}