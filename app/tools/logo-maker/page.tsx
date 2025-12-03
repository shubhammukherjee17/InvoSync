'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';

export default function LogoMaker() {
  const [companyName, setCompanyName] = useState('');
  const [tagline, setTagline] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🚀');
  const [bgColor, setBgColor] = useState('#3b82f6');
  const [textColor, setTextColor] = useState('#ffffff');

  const icons = ['🚀', '💼', '⚡', '🎯', '💡', '🌟', '🔥', '💎', '🏆', '🎨', '📱', '🌐'];

  const downloadLogo = () => {
    alert('Logo download - In production, this would generate a high-resolution image file');
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
            <Link href="/tools" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              ← Back to Tools
            </Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-4xl shadow-lg mb-6">
            🎨
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white mb-4">
            Logo Maker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Create professional logos for your business in minutes.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your Company"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tagline (Optional)
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Your tagline"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Icon
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {icons.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setSelectedIcon(icon)}
                      className={`p-3 text-2xl rounded-lg transition-all ${
                        selectedIcon === icon
                          ? 'bg-blue-500 scale-110'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full h-12 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Text Color
                  </label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full h-12 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Preview</h2>
              
              <div className="flex items-center justify-center p-12 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div
                  className="p-8 rounded-2xl shadow-2xl"
                  style={{ backgroundColor: bgColor }}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">{selectedIcon}</div>
                    <div
                      className="text-2xl font-bold mb-2"
                      style={{ color: textColor }}
                    >
                      {companyName || 'Your Company'}
                    </div>
                    {tagline && (
                      <div
                        className="text-sm"
                        style={{ color: textColor, opacity: 0.8 }}
                      >
                        {tagline}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={downloadLogo}
                  className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-blue-600 hover:to-blue-700"
                >
                  💾 Download Logo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
