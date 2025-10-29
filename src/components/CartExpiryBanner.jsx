'use client';

import { useState, useEffect } from 'react';
import { FiClock } from 'react-icons/fi';

export default function CartExpiryBanner() {
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('naturemedica_cart');
    if (!stored) return;

    try {
      const data = JSON.parse(stored);
      if (data.expiresAt) {
        const now = new Date().getTime();
        const timeLeft = data.expiresAt - now;
        const days = Math.ceil(timeLeft / (24 * 60 * 60 * 1000));
        
        if (days > 0 && days <= 7) {
          setDaysLeft(days);
        }
      }
    } catch (error) {
      console.error('Error reading cart expiry:', error);
    }
  }, []);

  if (!daysLeft || daysLeft > 5) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex items-center gap-2 text-yellow-800">
        <FiClock className="w-5 h-5" />
        <p className="text-sm font-semibold">
          Your cart will expire in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}. 
          Complete your purchase soon!
        </p>
      </div>
    </div>
  );
}
