'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, Home, ArrowLeft, Package, Heart } from 'lucide-react';
import logo from '@/assets/logor.webp';

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/">
            <Image src={logo} alt="Nature Medica" width={180} height={70} className="mx-auto" />
          </Link>
        </div>

        {/* Animated 404 with Pills */}
        <div className="mb-8 relative">
          <div className="flex items-center justify-center gap-4 mb-4">
            {/* 4 */}
            <div className="relative">
              <span className="text-8xl font-bold" style={{ color: '#3A5D1E' }}>4</span>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-[#3A5D1E] to-[#2d4818] rounded-full animate-bounce flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">💊</span>
              </div>
            </div>

            {/* 0 */}
            <div className="relative">
              <span className="text-8xl font-bold text-gray-300">0</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border-8 rounded-full animate-spin" style={{ borderColor: '#3A5D1E', borderTopColor: 'transparent' }} />
              </div>
            </div>

            {/* 4 */}
            <div className="relative">
              <span className="text-8xl font-bold" style={{ color: '#3A5D1E' }}>4</span>
              <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-[#3A5D1E] to-[#2d4818] rounded-full animate-bounce flex items-center justify-center shadow-lg" style={{ animationDelay: '0.2s' }}>
                <span className="text-white text-2xl">🌿</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8 space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Oops! This Page Went on Sick Leave
          </h1>
          <p className="text-lg text-gray-600">
            Don't worry, we have plenty of healthy alternatives for you!
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#3A5D1E] transition-colors text-base"
            />
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #3A5D1E 0%, #2d4818 100%)' }}
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-md hover:shadow-lg"
            style={{ borderColor: '#3A5D1E' }}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>

          <Link
            href="/products"
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-md hover:shadow-lg"
            style={{ borderColor: '#3A5D1E' }}
          >
            <Package className="w-5 h-5" />
            Browse Products
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4 font-semibold">You might be looking for:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Vitamins', href: '/products?category=vitamins' },
              { name: 'Supplements', href: '/products?category=supplements' },
              { name: 'Organic Foods', href: '/products?category=organic-foods' },
              { name: 'Best Sellers', href: '/products?bestseller=true' }
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 bg-white rounded-lg text-sm font-medium hover:bg-[#3A5D1E] hover:text-white transition-colors shadow-sm"
                style={{ border: '1px solid #3A5D1E', color: '#3A5D1E' }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
