'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/store/slices/cartSlice';

export default function OrderSuccessPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear cart after successful order
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Order Placed Successfully! 🎉</h1>
        <p className="text-gray-600 mb-8">Thank you for your purchase</p>
        <a href="/shop" className="bg-[#415f2d] text-white px-6 py-3 rounded-lg">
          Continue Shopping
        </a>
      </div>
    </div>
  );
}
