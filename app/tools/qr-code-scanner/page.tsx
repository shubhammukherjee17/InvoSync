'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';

export default function QRCodeScanner() {
  const [result, setResult] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert('QR Code scanning from image - In production, this would use a library like jsQR to decode the QR code from the uploaded image');
      setResult('Sample QR Code Content: https://example.com');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                <span className="text-xl font-bold text-white">I</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">InvoSync</span>
            </Link>
            <Link href="/tools" className="text-sm font-medium text-gray-700 hover:text-gray-900">← Back to Tools</Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-4xl shadow-lg mb-6">📷</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">QR Code Scanner</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Scan and decode QR codes from uploaded images.</p>

          <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800 text-center">
            <div className="mb-6">
              <label className="cursor-pointer inline-block rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:from-amber-600 hover:to-amber-700">
                📁 Upload QR Code Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {result && (
              <div className="mt-6 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Scanned Result:</h3>
                <p className="text-gray-700 dark:text-gray-300">{result}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(result)}
                  className="mt-4 rounded-lg bg-amber-500 px-6 py-2 font-semibold text-white hover:bg-amber-600"
                >
                  Copy to Clipboard
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
