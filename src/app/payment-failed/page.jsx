'use client';

import Link from 'next/link';
import { XCircle, RefreshCw } from 'lucide-react';

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          Sorry, your payment could not be processed.<br />
          No amount has been deducted.
        </p>
        <div className="space-y-3">
          <Link
            href="/checkout"
            className="block w-full bg-[#415f2d] text-white py-3 rounded-lg hover:bg-[#344b24] transition-colors font-semibold"
          >
            <RefreshCw className="inline-block mr-2 w-5 h-5" />
            Try Again
          </Link>
          <Link
            href="/"
            className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Back to Home
          </Link>
        </div>
        <div className="mt-6 text-xs text-gray-400 font-semibold tracking-wide">
          Nature Medica
        </div>
      </div>
    </div>
  );
}
