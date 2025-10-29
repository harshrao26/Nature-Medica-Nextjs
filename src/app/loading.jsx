'use client';

import Image from 'next/image';
import logo from '@/assets/logor.webp';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50 overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-ping"
            style={{
              width: `${(i + 1) * 100}px`,
              height: `${(i + 1) * 100}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.3}s`,
              animationDuration: '3s',
              opacity: 0.3 - i * 0.05,
              border: '2px solid rgba(58, 93, 30, 0.2)'
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-12 transform hover:scale-105 transition-transform">

        </div>

        {/* Spinning Leaf Icon */}
        <div className="mb-8 relative">
          <div className="w-20 h-20 mx-auto relative">
            <div 
              className="absolute inset-0 rounded-full animate-spin"
              style={{
                border: '4px solid rgba(58, 93, 30, 0.2)',
                borderTopColor: '#3A5D1E'
              }}
            />
            <div 
              className="absolute inset-2 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(58, 93, 30, 0.1) 0%, rgba(58, 93, 30, 0.05) 100%)'
              }}
            >
          <Image 
            src={logo} 
            alt="Nature Medica" 
            width={220} 
            height={90} 
            className="mx-auto drop-shadow-lg" 
          />            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 
            className="text-2xl font-bold"
            style={{ color: '#3A5D1E' }}
          >
            Welcome to Nature Medica
          </h2>
          <p className="text-gray-600 font-medium">
            Natural wellness at your fingertips
          </p>
        </div>
      </div>
    </div>
  );
}
