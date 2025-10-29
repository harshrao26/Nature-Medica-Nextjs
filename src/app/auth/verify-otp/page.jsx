'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/userSlice';
import Link from 'next/link';
import { FiMail, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';

export default function VerifyOTPPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && index === 5) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('');
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
    
    if (newOtp.length === 6) {
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (otpCode = otp.join('')) => {
    if (otpCode.length !== 6) {
      setError('Please enter the complete OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpCode })
      });

      const data = await res.json();

      if (res.ok) {
        // Update Redux store
        dispatch(setUser(data.user));
        
        // Show success message
        alert('Email verified successfully! Welcome to NatureMedica 🎉');
        
        // Redirect to home
        router.push('/');
      } else {
        setError(data.error || 'Invalid OTP');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResending(true);
    setError('');

    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'verification' })
      });

      if (res.ok) {
        setTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        alert('OTP sent successfully! Please check your email.');
      } else {
        setError('Failed to resend OTP');
      }
    } catch (error) {
      setError('Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Invalid request</p>
          <Link href="/auth" className="text-[#3a5d1e] hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#3a5d1e] to-[#5a7f3d] p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMail className="text-3xl" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
            <p className="text-green-100 text-sm">
              We've sent a 6-digit code to
            </p>
            <p className="text-white font-semibold mt-1">{email}</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {/* OTP Input */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                Enter OTP Code
              </label>
              <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#3a5d1e] focus:outline-none transition-colors"
                    disabled={loading}
                  />
                ))}
              </div>
            </div>

            {/* Timer and Resend */}
            <div className="text-center mb-6">
              {!canResend ? (
                <p className="text-sm text-gray-600">
                  Didn't receive the code?{' '}
                  <span className="text-[#3a5d1e] font-semibold">
                    Resend in {timer}s
                  </span>
                </p>
              ) : (
                <button
                  onClick={handleResendOTP}
                  disabled={resending}
                  className="text-sm text-[#3a5d1e] hover:underline font-semibold flex items-center gap-2 mx-auto disabled:opacity-50"
                >
                  <FiRefreshCw className={resending ? 'animate-spin' : ''} />
                  {resending ? 'Sending...' : 'Resend OTP'}
                </button>
              )}
            </div>

            {/* Verify Button */}
            <button
              onClick={() => handleVerify()}
              disabled={loading || otp.some(digit => digit === '')}
              className="w-full bg-gradient-to-r from-[#3a5d1e] to-[#5a7f3d] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </button>

            {/* Help Text */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Note:</strong> The OTP is valid for 10 minutes. If you don't receive it, check your spam folder or click resend.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-gray-600">
          <Link href="/auth" className="hover:text-[#3a5d1e] font-medium flex items-center justify-center gap-2">
            <FiArrowLeft />
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
