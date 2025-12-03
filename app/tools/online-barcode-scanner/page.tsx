'use client';

import Link from 'next/link';
import Footer from '../../components/Footer';

export default function BarcodeScanner() {
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
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 text-4xl shadow-lg mb-6">🔍</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Barcode Scanner</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Scan barcodes from images or using your camera.</p>
          <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <p className="text-gray-600 dark:text-gray-400">Barcode scanning functionality - Similar to QR Code Scanner but for barcodes!</p>
            <Link href="/tools/qr-code-scanner" className="mt-6 inline-block rounded-lg bg-violet-500 px-8 py-3 font-semibold text-white hover:bg-violet-600">
              Use QR Code Scanner
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
