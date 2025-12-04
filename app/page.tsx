'use client';

import { useState } from 'react';
import Link from 'next/link';
import SignupModal from './components/SignupModal';
import ContactModal from './components/ContactModal';
import DemoModal from './components/DemoModal';
import Footer from './components/Footer';
import Header from './components/Header';

const features = [
  {
    id: 1,
    title: 'Billing Software',
    slug: 'billing-software',
    description: 'Create professional bills and invoices in seconds. Manage customer billing with ease.',
    icon: '📄',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    title: 'Accounting Software',
    slug: 'accounting-software',
    description: 'Complete accounting solution for your business. Track expenses, income, and financial reports.',
    icon: '📊',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 3,
    title: 'Inventory Software',
    slug: 'inventory-software',
    description: 'Manage your inventory efficiently. Track stock levels, products, and suppliers.',
    icon: '📦',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 4,
    title: 'Invoicing Software',
    slug: 'invoicing-software',
    description: 'Generate professional invoices quickly. Send invoices and track payments seamlessly.',
    icon: '🧾',
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 5,
    title: 'Business Management Software',
    slug: 'business-management-software',
    description: 'Comprehensive business management tools to run your entire operation smoothly.',
    icon: '💼',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 6,
    title: 'More Business Softwares',
    slug: 'more-business-softwares',
    description: 'Explore additional business tools and integrations to enhance your workflow.',
    icon: '🔧',
    color: 'from-pink-500 to-pink-600',
  },
];

export default function Home() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <Header onSignupClick={() => setIsSignupOpen(true)} />

        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
              Complete Business
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Management Solution
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl dark:text-gray-300">
              All-in-one software to manage billing, accounting, inventory, invoicing, and more.
              Streamline your business operations with powerful tools designed for modern businesses.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => setIsSignupOpen(true)}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl sm:w-auto"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => setIsDemoOpen(true)}
                className="w-full rounded-xl border-2 border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-900 transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 sm:w-auto"
              >
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Powerful Features for Your Business
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Everything you need to manage and grow your business in one place
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.id}
                href={`/features/${feature.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:hover:shadow-2xl cursor-pointer"
              >
                {/* Gradient Background Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                />

                {/* Icon */}
                <div className="mb-4">
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-2xl shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>

                {/* Hover Arrow */}
                <div className="mt-6 flex items-center text-sm font-semibold text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-blue-400">
                  Learn more
                  <svg
                    className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link
                href="/formats"
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-12 shadow-xl transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative z-10">
                  <div className="mb-4 text-5xl">📋</div>
                  <h3 className="text-3xl font-bold text-white mb-3">InvoSync Formats</h3>
                  <p className="text-blue-100 mb-6">
                    Professional document formats for invoices, quotations, balance sheets, and more.
                  </p>
                  <div className="flex items-center text-white font-semibold">
                    Explore Formats
                    <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-white/0 transition-all duration-300 group-hover:bg-white/5" />
              </Link>

              <Link
                href="/tools"
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 to-pink-600 p-12 shadow-xl transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative z-10">
                  <div className="mb-4 text-5xl">🛠️</div>
                  <h3 className="text-3xl font-bold text-white mb-3">Web Applications (Tools)</h3>
                  <p className="text-purple-100 mb-6">
                    Free online tools including calculators, generators, and business utilities.
                  </p>
                  <div className="flex items-center text-white font-semibold">
                    Explore Tools
                    <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-white/0 transition-all duration-300 group-hover:bg-white/5" />
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-12 dark:text-white">
              About InvoSync
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 mb-4 dark:text-white">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To empower businesses of all sizes with comprehensive, easy-to-use software solutions
                  that streamline operations and drive growth.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 mb-4 dark:text-white">Why Choose Us</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  With thousands of satisfied customers, we provide reliable, secure, and scalable
                  business management solutions backed by exceptional support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-16 sm:px-12 sm:py-20 lg:px-16">
            <div className="relative mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Ready to Transform Your Business?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-blue-100">
                Join thousands of businesses already using InvoSync to streamline their
                operations and boost productivity.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  onClick={() => setIsSignupOpen(true)}
                  className="w-full rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl sm:w-auto"
                >
                  Get Started Free
                </button>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="w-full rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:w-auto"
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Modals */}
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  );
}
