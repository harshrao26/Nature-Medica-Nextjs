'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

export default function ThankYouPage() {
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback(instance => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio)
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, { spread: 26, startVelocity: 55 });
    makeShot(0.2, { spread: 60 });
    makeShot(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    makeShot(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    makeShot(0.1, { spread: 120, startVelocity: 45 });
  }, [makeShot]);

  useEffect(() => {
    fire();
  }, [fire]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-4xl font-bold text-[#415f2d] mb-4">Thank You for Your Order!</h1>
      <p className="text-lg text-gray-700 mb-8">Your order has been successfully placed at Nature Medica.</p>
      <button
        className="px-6 py-3 rounded-lg bg-[#415f2d] text-white font-semibold hover:bg-[#344b24] transition-colors"
        onClick={() => window.location.href = '/'}
      >
        Continue Shopping
      </button>

      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 9999
        }}
      />
    </div>
  );
}
