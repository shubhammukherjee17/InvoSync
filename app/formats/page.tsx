'use client';

import Link from 'next/link';
import Footer from '../components/Footer';

const formats = [
  { id: 1, title: 'Invoice Formats', slug: 'invoice-formats', icon: '📄', color: 'from-blue-500 to-blue-600' },
  { id: 2, title: 'Quotation Format', slug: 'quotation-format', icon: '💬', color: 'from-green-500 to-green-600' },
  { id: 3, title: 'Balance Sheet Formats', slug: 'balance-sheet-formats', icon: '⚖️', color: 'from-purple-500 to-purple-600' },
  { id: 4, title: 'BillBook Formats', slug: 'billbook-formats', icon: '📚', color: 'from-orange-500 to-orange-600' },
  { id: 5, title: 'Receipt Formats', slug: 'receipt-formats', icon: '🧾', color: 'from-indigo-500 to-indigo-600' },
  { id: 6, title: 'Credit Note Formats', slug: 'credit-note-formats', icon: '💳', color: 'from-pink-500 to-pink-600' },
  { id: 7, title: 'Debit Note Formats', slug: 'debit-note-formats', icon: '💰', color: 'from-red-500 to-red-600' },
  { id: 8, title: 'Sales Report Format', slug: 'sales-report-format', icon: '📊', color: 'from-yellow-500 to-yellow-600' },
  { id: 9, title: 'Estimate Format', slug: 'estimate-format', icon: '📝', color: 'from-teal-500 to-teal-600' },
  { id: 10, title: 'Delivery Challan Format', slug: 'delivery-challan-format', icon: '🚚', color: 'from-cyan-500 to-cyan-600' },
  { id: 11, title: 'Cash Flow Statement Format', slug: 'cash-flow-statement-format', icon: '💵', color: 'from-lime-500 to-lime-600' },
  { id: 12, title: 'Voucher Formats', slug: 'voucher-formats', icon: '🎫', color: 'from-amber-500 to-amber-600' },
  { id: 13, title: 'Work Order Format', slug: 'work-order-format', icon: '🔨', color: 'from-emerald-500 to-emerald-600' },
  { id: 14, title: 'Reconciliation Format', slug: 'reconciliation-format', icon: '🔄', color: 'from-violet-500 to-violet-600' },
  { id: 15, title: 'Bill of Exchange', slug: 'bill-of-exchange', icon: '💱', color: 'from-fuchsia-500 to-fuchsia-600' },
  { id: 16, title: 'Income Statement', slug: 'income-statement', icon: '📈', color: 'from-rose-500 to-rose-600' },
];

export default function FormatsPage() {
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
            InvoSync Formats
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Professional business document formats for all your needs. Download and customize templates for invoices, reports, and more.
          </p>
        </div>
      </section>

      {/* Formats Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {formats.map((format) => (
            <Link
              key={format.id}
              href={`/formats/${format.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${format.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
              
              <div className="mb-4">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${format.color} text-2xl shadow-lg`}>
                  {format.icon}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {format.title}
              </h3>
              
              <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-blue-400">
                View Format
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
