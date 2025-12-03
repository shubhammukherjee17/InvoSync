'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';

export default function BarcodeGenerator() {
  const [text, setText] = useState('');
  const [barcodeUrl, setBarcodeUrl] = useState('');

  const generateBarcode = () => {
    if (text) {
      const url = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(text)}&code=Code128&translate-esc=on`;
      setBarcodeUrl(url);
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
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-500 to-lime-600 text-4xl shadow-lg mb-6">🏷️</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Barcode Generator</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Generate barcodes for products and inventory management.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Generate Barcode</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text or number"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-lime-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={generateBarcode}
                  className="w-full rounded-lg bg-gradient-to-r from-lime-500 to-lime-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-lime-600 hover:to-lime-700"
                >
                  Generate Barcode
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Preview</h2>
              {barcodeUrl ? (
                <div className="text-center">
                  <img src={barcodeUrl} alt="Barcode" className="mx-auto" />
                  <button
                    onClick={() => window.open(barcodeUrl, '_blank')}
                    className="mt-4 rounded-lg bg-lime-500 px-6 py-2 font-semibold text-white hover:bg-lime-600"
                  >
                    Download
                  </button>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">Enter text and generate barcode</div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
