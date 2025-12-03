import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '../../components/Footer';

const formats = {
  'invoice-formats': {
    title: 'Invoice Formats',
    icon: '📄',
    color: 'from-blue-500 to-blue-600',
    description: 'Professional invoice templates for all types of businesses.',
    features: [
      'GST compliant invoice formats',
      'Tax invoice templates',
      'Proforma invoice formats',
      'Commercial invoice templates',
      'Service invoice formats',
      'Retail invoice templates',
    ],
  },
  'quotation-format': {
    title: 'Quotation Format',
    icon: '💬',
    color: 'from-green-500 to-green-600',
    description: 'Professional quotation templates to send to your clients.',
    features: [
      'Business quotation format',
      'Service quotation template',
      'Product quotation format',
      'Price quotation template',
      'Formal quotation format',
      'Quotation with terms',
    ],
  },
  'balance-sheet-formats': {
    title: 'Balance Sheet Formats',
    icon: '⚖️',
    color: 'from-purple-500 to-purple-600',
    description: 'Standard balance sheet formats for financial reporting.',
    features: [
      'Horizontal balance sheet',
      'Vertical balance sheet',
      'Comparative balance sheet',
      'Consolidated balance sheet',
      'Common size balance sheet',
      'Classified balance sheet',
    ],
  },
  'billbook-formats': {
    title: 'BillBook Formats',
    icon: '📚',
    color: 'from-orange-500 to-orange-600',
    description: 'Comprehensive billbook formats for record keeping.',
    features: [
      'Cash bill book format',
      'Credit bill book format',
      'Purchase bill book',
      'Sales bill book',
      'Daily bill book',
      'Monthly bill book',
    ],
  },
  'receipt-formats': {
    title: 'Receipt Formats',
    icon: '🧾',
    color: 'from-indigo-500 to-indigo-600',
    description: 'Payment receipt templates for various transactions.',
    features: [
      'Cash receipt format',
      'Payment receipt template',
      'Rent receipt format',
      'Advance receipt format',
      'Official receipt template',
      'Money receipt format',
    ],
  },
  'credit-note-formats': {
    title: 'Credit Note Formats',
    icon: '💳',
    color: 'from-pink-500 to-pink-600',
    description: 'Credit note templates for returns and adjustments.',
    features: [
      'GST credit note format',
      'Sales return credit note',
      'Discount credit note',
      'Credit memo template',
      'Tax credit note',
      'Credit note with reason',
    ],
  },
  'debit-note-formats': {
    title: 'Debit Note Formats',
    icon: '💰',
    color: 'from-red-500 to-red-600',
    description: 'Debit note templates for purchase returns.',
    features: [
      'GST debit note format',
      'Purchase return debit note',
      'Price difference debit note',
      'Debit memo template',
      'Tax debit note',
      'Debit note with details',
    ],
  },
  'sales-report-format': {
    title: 'Sales Report Format',
    icon: '📊',
    color: 'from-yellow-500 to-yellow-600',
    description: 'Comprehensive sales report templates.',
    features: [
      'Daily sales report',
      'Monthly sales report',
      'Product-wise sales report',
      'Customer-wise sales report',
      'Sales summary report',
      'Sales analysis report',
    ],
  },
  'estimate-format': {
    title: 'Estimate Format',
    icon: '📝',
    color: 'from-teal-500 to-teal-600',
    description: 'Professional estimate templates for projects.',
    features: [
      'Project estimate format',
      'Cost estimate template',
      'Service estimate format',
      'Construction estimate',
      'Repair estimate format',
      'Detailed estimate template',
    ],
  },
  'delivery-challan-format': {
    title: 'Delivery Challan Format',
    icon: '🚚',
    color: 'from-cyan-500 to-cyan-600',
    description: 'Delivery challan templates for goods dispatch.',
    features: [
      'GST delivery challan',
      'Transport delivery challan',
      'Job work challan',
      'Sample delivery challan',
      'Return delivery challan',
      'E-way bill challan',
    ],
  },
  'cash-flow-statement-format': {
    title: 'Cash Flow Statement Format',
    icon: '💵',
    color: 'from-lime-500 to-lime-600',
    description: 'Cash flow statement templates for financial analysis.',
    features: [
      'Direct method cash flow',
      'Indirect method cash flow',
      'Operating activities',
      'Investing activities',
      'Financing activities',
      'Free cash flow statement',
    ],
  },
  'voucher-formats': {
    title: 'Voucher Formats',
    icon: '🎫',
    color: 'from-amber-500 to-amber-600',
    description: 'Various voucher templates for accounting.',
    features: [
      'Payment voucher format',
      'Receipt voucher format',
      'Journal voucher format',
      'Contra voucher format',
      'Purchase voucher format',
      'Sales voucher format',
    ],
  },
  'work-order-format': {
    title: 'Work Order Format',
    icon: '🔨',
    color: 'from-emerald-500 to-emerald-600',
    description: 'Work order templates for service businesses.',
    features: [
      'Service work order',
      'Maintenance work order',
      'Repair work order',
      'Construction work order',
      'Purchase work order',
      'Job work order',
    ],
  },
  'reconciliation-format': {
    title: 'Reconciliation Format',
    icon: '🔄',
    color: 'from-violet-500 to-violet-600',
    description: 'Bank and account reconciliation templates.',
    features: [
      'Bank reconciliation statement',
      'Account reconciliation',
      'Vendor reconciliation',
      'Customer reconciliation',
      'GST reconciliation',
      'Inventory reconciliation',
    ],
  },
  'bill-of-exchange': {
    title: 'Bill of Exchange',
    icon: '💱',
    color: 'from-fuchsia-500 to-fuchsia-600',
    description: 'Bill of exchange formats for trade transactions.',
    features: [
      'Inland bill of exchange',
      'Foreign bill of exchange',
      'Sight bill format',
      'Time bill format',
      'Trade bill format',
      'Accommodation bill',
    ],
  },
  'income-statement': {
    title: 'Income Statement',
    icon: '📈',
    color: 'from-rose-500 to-rose-600',
    description: 'Income statement templates for profit and loss.',
    features: [
      'Single-step income statement',
      'Multi-step income statement',
      'Comparative income statement',
      'Common size income statement',
      'Projected income statement',
      'Quarterly income statement',
    ],
  },
};

export default async function FormatPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const format = formats[slug as keyof typeof formats];

  if (!format) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
              href="/formats"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              ← Back to Formats
            </Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${format.color} text-4xl shadow-lg mb-6`}>
            {format.icon}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            {format.title}
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            {format.description}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 dark:text-white">Available Formats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {format.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800"
              >
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${format.color} text-white`}>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`mx-auto max-w-4xl rounded-3xl bg-gradient-to-r ${format.color} px-8 py-16 sm:px-12 sm:py-20`}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Download These Formats
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/90">
              Get access to all {format.title} templates and customize them for your business.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="rounded-xl bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-50">
                Download Formats
              </button>
              <Link
                href="/"
                className="rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                View All Formats
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
