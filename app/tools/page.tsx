'use client';

import Link from 'next/link';
import Footer from '../components/Footer';

const tools = [
  { id: 1, title: 'Logo Maker', slug: 'logo-maker', icon: '🎨', color: 'from-blue-500 to-blue-600', active: true },
  { id: 2, title: 'GST Calculator', slug: 'gst-calculator', icon: '🧮', color: 'from-green-500 to-green-600', active: true },
  { id: 3, title: 'Invoice Generator', slug: 'invoice-generator', icon: '📄', color: 'from-purple-500 to-purple-600', active: true },
  { id: 4, title: 'Quotation Maker', slug: 'quotation-maker', icon: '💬', color: 'from-orange-500 to-orange-600', active: true },
  { id: 5, title: 'Proforma Invoice Generator', slug: 'proforma-invoice-generator', icon: '📋', color: 'from-indigo-500 to-indigo-600', active: true },
  { id: 6, title: 'Purchase Order Generator', slug: 'purchase-order-generator', icon: '🛒', color: 'from-pink-500 to-pink-600', active: true },
  { id: 7, title: 'Receipt Maker', slug: 'receipt-maker', icon: '🧾', color: 'from-red-500 to-red-600', active: true },
  { id: 8, title: 'Depreciation Calculator', slug: 'depreciation-calculator', icon: '📉', color: 'from-yellow-500 to-yellow-600', active: true },
  { id: 9, title: 'Straight Line Depreciation Calculator', slug: 'straight-line-depreciation-calculator', icon: '📊', color: 'from-teal-500 to-teal-600', active: true },
  { id: 10, title: 'QR Code Generator', slug: 'qr-code-generator', icon: '📱', color: 'from-cyan-500 to-cyan-600', active: true },
  { id: 11, title: 'Online Barcode Generator', slug: 'online-barcode-generator', icon: '🏷️', color: 'from-lime-500 to-lime-600', active: true },
  { id: 12, title: 'QR Code Scanner from Image', slug: 'qr-code-scanner', icon: '📷', color: 'from-amber-500 to-amber-600', active: true },
  { id: 13, title: 'Business Card Maker', slug: 'business-card-maker', icon: '💼', color: 'from-emerald-500 to-emerald-600', active: true },
  { id: 14, title: 'Online Barcode Scanner', slug: 'online-barcode-scanner', icon: '🔍', color: 'from-violet-500 to-violet-600', active: true },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                <span className="text-xl font-bold text-white">I</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                InvoSync
              </span>
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
            InvoSync Web Applications
            <span className="block text-3xl sm:text-4xl md:text-5xl mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              (Tools)
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Free online business tools to help you create, calculate, and manage your business documents and assets.
          </p>
          <div className="mx-auto mt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg text-sm font-medium">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              All 14 Tools Active & Ready to Use!
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
              
              <div className="mb-4">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} text-2xl shadow-lg`}>
                  {tool.icon}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {tool.title}
              </h3>
              
              <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-blue-400">
                Use Tool
                <svg className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
