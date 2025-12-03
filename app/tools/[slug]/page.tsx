import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '../../components/Footer';

const tools = {
  'logo-maker': {
    title: 'Logo Maker',
    icon: '🎨',
    color: 'from-blue-500 to-blue-600',
    description: 'Create professional logos for your business in minutes with our easy-to-use logo maker.',
    features: [
      'Drag-and-drop interface',
      'Thousands of templates',
      'Custom fonts and colors',
      'High-resolution downloads',
      'Vector format support',
      'Brand kit creation',
    ],
  },
  'gst-calculator': {
    title: 'GST Calculator',
    icon: '🧮',
    color: 'from-green-500 to-green-600',
    description: 'Calculate GST amounts quickly and accurately for your business transactions.',
    features: [
      'Calculate GST inclusive/exclusive',
      'Support for all GST rates',
      'Reverse GST calculation',
      'CGST, SGST, IGST breakdown',
      'Save calculation history',
      'Export to PDF',
    ],
  },
  'invoice-generator': {
    title: 'Invoice Generator',
    icon: '📄',
    color: 'from-purple-500 to-purple-600',
    description: 'Generate professional invoices instantly with customizable templates.',
    features: [
      'Professional templates',
      'Add your logo and branding',
      'Automatic calculations',
      'GST compliant',
      'Download as PDF',
      'Email directly to clients',
    ],
  },
  'quotation-maker': {
    title: 'Quotation Maker',
    icon: '💬',
    color: 'from-orange-500 to-orange-600',
    description: 'Create professional quotations to send to your clients quickly.',
    features: [
      'Multiple quotation templates',
      'Add terms and conditions',
      'Validity period settings',
      'Product/service catalog',
      'Discount calculations',
      'Convert to invoice',
    ],
  },
  'proforma-invoice-generator': {
    title: 'Proforma Invoice Generator',
    icon: '📋',
    color: 'from-indigo-500 to-indigo-600',
    description: 'Generate proforma invoices for international trade and advance payments.',
    features: [
      'International format support',
      'Multi-currency support',
      'Customs declaration fields',
      'Shipping details',
      'Payment terms',
      'Export documentation',
    ],
  },
  'purchase-order-generator': {
    title: 'Purchase Order Generator',
    icon: '🛒',
    color: 'from-pink-500 to-pink-600',
    description: 'Create purchase orders to streamline your procurement process.',
    features: [
      'Vendor management',
      'Item specifications',
      'Delivery schedules',
      'Payment terms',
      'Approval workflow',
      'Track order status',
    ],
  },
  'receipt-maker': {
    title: 'Receipt Maker',
    icon: '🧾',
    color: 'from-red-500 to-red-600',
    description: 'Generate payment receipts instantly for your customers.',
    features: [
      'Professional receipt templates',
      'Payment method tracking',
      'Sequential numbering',
      'Digital signatures',
      'Email receipts',
      'Print-ready format',
    ],
  },
  'depreciation-calculator': {
    title: 'Depreciation Calculator',
    icon: '📉',
    color: 'from-yellow-500 to-yellow-600',
    description: 'Calculate asset depreciation using various methods.',
    features: [
      'Multiple depreciation methods',
      'Straight-line method',
      'Declining balance method',
      'Sum of years digits',
      'Depreciation schedule',
      'Tax implications',
    ],
  },
  'straight-line-depreciation-calculator': {
    title: 'Straight Line Depreciation Calculator',
    icon: '📊',
    color: 'from-teal-500 to-teal-600',
    description: 'Calculate depreciation using the straight-line method.',
    features: [
      'Simple calculation',
      'Annual depreciation',
      'Book value tracking',
      'Salvage value consideration',
      'Useful life estimation',
      'Detailed reports',
    ],
  },
  'qr-code-generator': {
    title: 'QR Code Generator',
    icon: '📱',
    color: 'from-cyan-500 to-cyan-600',
    description: 'Create QR codes for URLs, text, contact info, and more.',
    features: [
      'Multiple QR code types',
      'Custom colors and logos',
      'High-resolution output',
      'Bulk generation',
      'Analytics tracking',
      'Dynamic QR codes',
    ],
  },
  'online-barcode-generator': {
    title: 'Online Barcode Generator',
    icon: '🏷️',
    color: 'from-lime-500 to-lime-600',
    description: 'Generate barcodes for products and inventory management.',
    features: [
      'Multiple barcode formats',
      'EAN, UPC, Code 128',
      'Batch generation',
      'Print labels',
      'Custom sizes',
      'Export options',
    ],
  },
  'qr-code-scanner': {
    title: 'QR Code Scanner from Image',
    icon: '📷',
    color: 'from-amber-500 to-amber-600',
    description: 'Scan and decode QR codes from uploaded images.',
    features: [
      'Upload image files',
      'Instant decoding',
      'Multiple QR codes',
      'History tracking',
      'Copy to clipboard',
      'Privacy-focused',
    ],
  },
  'business-card-maker': {
    title: 'Business Card Maker',
    icon: '💼',
    color: 'from-emerald-500 to-emerald-600',
    description: 'Design professional business cards with ease.',
    features: [
      'Professional templates',
      'Custom designs',
      'Front and back design',
      'Print-ready files',
      'Standard sizes',
      'QR code integration',
    ],
  },
  'online-barcode-scanner': {
    title: 'Online Barcode Scanner',
    icon: '🔍',
    color: 'from-violet-500 to-violet-600',
    description: 'Scan barcodes from images or using your camera.',
    features: [
      'Camera scanning',
      'Image upload',
      'Multiple formats',
      'Product lookup',
      'Scan history',
      'Export data',
    ],
  },
};

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools[slug as keyof typeof tools];

  if (!tool) {
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
              href="/tools"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              ← Back to Tools
            </Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.color} text-4xl shadow-lg mb-6`}>
            {tool.icon}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            {tool.title}
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            {tool.description}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 dark:text-white">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tool.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800"
              >
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tool.color} text-white`}>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`mx-auto max-w-4xl rounded-3xl bg-gradient-to-r ${tool.color} px-8 py-16 sm:px-12 sm:py-20`}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Use This Tool?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/90">
              Start using {tool.title} now - it's completely free!
            </p>
            <div className="mt-10">
              <button className="rounded-xl bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-50">
                Launch Tool
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
