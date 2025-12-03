import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '../../components/Footer';

const features = {
  'billing-software': {
    title: 'Billing Software',
    icon: '📄',
    color: 'from-blue-500 to-blue-600',
    description: 'Create professional bills and invoices in seconds. Manage customer billing with ease.',
    features: [
      'Quick bill generation with customizable templates',
      'Multiple payment gateway integrations',
      'Automated payment reminders',
      'Customer billing history and analytics',
      'Tax calculation and GST compliance',
      'Print and email bills directly',
      'Recurring billing for subscriptions',
      'Multi-currency support',
    ],
    benefits: [
      'Save up to 10 hours per week on billing',
      'Reduce billing errors by 95%',
      'Get paid faster with automated reminders',
      'Professional invoices that build trust',
    ],
  },
  'accounting-software': {
    title: 'Accounting Software',
    icon: '📊',
    color: 'from-green-500 to-green-600',
    description: 'Complete accounting solution for your business. Track expenses, income, and financial reports.',
    features: [
      'Double-entry bookkeeping system',
      'Real-time financial dashboard',
      'Automated bank reconciliation',
      'Comprehensive financial reports',
      'Tax management and filing',
      'Expense tracking and categorization',
      'Profit & Loss statements',
      'Balance sheet generation',
    ],
    benefits: [
      'Stay compliant with tax regulations',
      'Make data-driven financial decisions',
      'Save time with automated processes',
      'Access financial data anywhere, anytime',
    ],
  },
  'inventory-software': {
    title: 'Inventory Software',
    icon: '📦',
    color: 'from-purple-500 to-purple-600',
    description: 'Manage your inventory efficiently. Track stock levels, products, and suppliers.',
    features: [
      'Real-time stock level tracking',
      'Low stock alerts and notifications',
      'Multi-location inventory management',
      'Barcode scanning support',
      'Purchase order management',
      'Supplier management system',
      'Inventory valuation reports',
      'Batch and serial number tracking',
    ],
    benefits: [
      'Reduce stockouts and overstocking',
      'Improve inventory turnover by 30%',
      'Minimize inventory carrying costs',
      'Better supplier relationship management',
    ],
  },
  'invoicing-software': {
    title: 'Invoicing Software',
    icon: '🧾',
    color: 'from-orange-500 to-orange-600',
    description: 'Generate professional invoices quickly. Send invoices and track payments seamlessly.',
    features: [
      'Professional invoice templates',
      'Automated invoice numbering',
      'Online payment integration',
      'Invoice tracking and status updates',
      'Recurring invoice automation',
      'Multi-language and multi-currency support',
      'Invoice approval workflow',
      'Client portal for invoice access',
    ],
    benefits: [
      'Get paid 2x faster',
      'Reduce invoice processing time by 80%',
      'Improve cash flow management',
      'Professional branding on every invoice',
    ],
  },
  'business-management-software': {
    title: 'Business Management Software',
    icon: '💼',
    color: 'from-indigo-500 to-indigo-600',
    description: 'Comprehensive business management tools to run your entire operation smoothly.',
    features: [
      'Unified dashboard for all operations',
      'Customer relationship management (CRM)',
      'Project and task management',
      'Team collaboration tools',
      'Document management system',
      'Reporting and analytics suite',
      'Mobile app for on-the-go access',
      'Third-party integrations',
    ],
    benefits: [
      'Centralize all business operations',
      'Improve team productivity by 40%',
      'Make informed decisions with analytics',
      'Scale your business efficiently',
    ],
  },
  'more-business-softwares': {
    title: 'More Business Softwares',
    icon: '🔧',
    color: 'from-pink-500 to-pink-600',
    description: 'Explore additional business tools and integrations to enhance your workflow.',
    features: [
      'HR and payroll management',
      'Point of Sale (POS) system',
      'E-commerce integration',
      'Email marketing tools',
      'Customer support ticketing',
      'Time tracking and attendance',
      'Asset management',
      'Custom workflow automation',
    ],
    benefits: [
      'Extend functionality as you grow',
      'Integrate with your favorite tools',
      'Customize to your business needs',
      'One platform for all business needs',
    ],
  },
};

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = features[slug as keyof typeof features];

  if (!feature) {
    notFound();
  }

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
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <div className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-4xl shadow-lg mb-6`}>
              {feature.icon}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
              {feature.title}
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 dark:text-white">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feature.features.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800"
              >
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} text-white`}>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 dark:text-white">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feature.benefits.map((benefit, index) => (
              <div
                key={index}
                className={`rounded-xl bg-gradient-to-br ${feature.color} p-6 text-white shadow-lg`}
              >
                <p className="text-lg font-semibold">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`mx-auto max-w-4xl rounded-3xl bg-gradient-to-r ${feature.color} px-8 py-16 sm:px-12 sm:py-20 lg:px-16`}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/90">
              Start your free trial today and experience the power of {feature.title}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/"
                className="w-full rounded-xl bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl sm:w-auto"
              >
                Start Free Trial
              </Link>
              <Link
                href="/"
                className="w-full rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:w-auto"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

