'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';

interface QuotationItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export default function QuotationMaker() {
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [quotationNumber, setQuotationNumber] = useState('QT-001');
  const [quotationDate, setQuotationDate] = useState(new Date().toISOString().split('T')[0]);
  const [validUntil, setValidUntil] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [items, setItems] = useState<QuotationItem[]>([
    { id: 1, description: '', quantity: 1, rate: 0, amount: 0 },
  ]);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState('');
  const [terms, setTerms] = useState('Payment due within 30 days\nPrices are subject to change\nAll sales are final');
  const [signatureName, setSignatureName] = useState('');
  const [signatureTitle, setSignatureTitle] = useState('Authorized Signatory');

  const addItem = () => {
    setItems([...items, { id: items.length + 1, description: '', quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: keyof QuotationItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updated.amount = updated.quantity * updated.rate;
        }
        return updated;
      }
      return item;
    }));
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const printQuotation = () => {
    const printWindow = window.open('', '', 'height=800,width=800');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Quotation ${quotationNumber}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; }
              .header { text-align: center; border-bottom: 3px solid #f97316; padding-bottom: 20px; margin-bottom: 30px; }
              .company { font-size: 24px; font-weight: bold; color: #f97316; }
              .quotation-title { font-size: 28px; font-weight: bold; color: #374151; margin: 20px 0; }
              .section { margin: 20px 0; }
              .label { font-weight: bold; color: #374151; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
              th { background-color: #fff7ed; font-weight: bold; }
              .total-section { text-align: right; margin-top: 20px; }
              .total-row { font-weight: bold; font-size: 1.2em; color: #f97316; }
              .terms { margin-top: 30px; padding: 20px; background-color: #f9fafb; border-left: 4px solid #f97316; }
              .footer { margin-top: 40px; text-align: center; color: #6b7280; font-size: 0.9em; border-top: 1px solid #e5e7eb; padding-top: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="company">${companyName || 'Your Company'}</div>
              <div>${companyEmail || 'email@company.com'} | ${companyPhone || '+1 234 567 8900'}</div>
            </div>
            
            <div class="quotation-title">QUOTATION</div>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
              <div class="section">
                <div class="label">To:</div>
                <div>${clientName || 'Client Name'}</div>
                <div>${clientEmail || 'client@email.com'}</div>
              </div>
              <div class="section" style="text-align: right;">
                <div><span class="label">Quotation #:</span> ${quotationNumber}</div>
                <div><span class="label">Date:</span> ${quotationDate}</div>
                <div><span class="label">Valid Until:</span> ${validUntil}</div>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align: right;">Qty</th>
                  <th style="text-align: right;">Rate</th>
                  <th style="text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${items.map(item => `
                  <tr>
                    <td>${item.description || '-'}</td>
                    <td style="text-align: right;">${item.quantity}</td>
                    <td style="text-align: right;">₹${item.rate.toFixed(2)}</td>
                    <td style="text-align: right;">₹${item.amount.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="total-section">
              <div style="margin: 10px 0;"><span class="label">Subtotal:</span> ₹${subtotal.toFixed(2)}</div>
              ${discount > 0 ? `<div style="margin: 10px 0;"><span class="label">Discount (${discount}%):</span> -₹${discountAmount.toFixed(2)}</div>` : ''}
              <div class="total-row" style="margin: 10px 0;"><span class="label">Total:</span> ₹${total.toFixed(2)}</div>
            </div>

            ${notes ? `<div class="section"><div class="label">Notes:</div><div>${notes}</div></div>` : ''}

            <div class="terms">
              <div class="label">Terms & Conditions:</div>
              <div style="white-space: pre-line; margin-top: 10px;">${terms}</div>
            </div>

            <div class="footer">
              <p>Thank you for considering our quotation!</p>
              <p>Generated by InvoSync - ${new Date().toLocaleString()}</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const sendQuotation = () => {
    const subject = `Quotation ${quotationNumber} from ${companyName || 'InvoSync'}`;
    const body = `Dear ${clientName || 'Customer'},\n\nPlease find our quotation ${quotationNumber} dated ${quotationDate}.\n\nQuotation Summary:\nSubtotal: ₹${subtotal.toFixed(2)}\n${discount > 0 ? `Discount (${discount}%): -₹${discountAmount.toFixed(2)}\n` : ''}Total: ₹${total.toFixed(2)}\n\nValid Until: ${validUntil}\n\nPlease let us know if you have any questions.\n\nBest regards,\n${companyName || 'Your Company'}`;
    window.location.href = `mailto:${clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const saveQuotation = () => {
    const quotation = {
      companyName, companyEmail, companyPhone,
      clientName, clientEmail,
      quotationNumber, quotationDate, validUntil,
      items, discount, notes, terms,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('quotation_draft', JSON.stringify(quotation));
    alert('Quotation saved!');
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
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-4xl shadow-lg mb-6">
            💬
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white mb-4">
            Quotation Maker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Create professional quotations to send to your clients quickly.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Company Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company Name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="tel"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    placeholder="Phone"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Client Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Client Name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Client Email"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quotation Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quotation #</label>
                    <input
                      type="text"
                      value={quotationNumber}
                      onChange={(e) => setQuotationNumber(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-orange-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                    <input
                      type="date"
                      value={quotationDate}
                      onChange={(e) => setQuotationDate(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-orange-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Valid Until</label>
                    <input
                      type="date"
                      value={validUntil}
                      onChange={(e) => setValidUntil(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-orange-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Items</h2>
                  <button
                    onClick={addItem}
                    className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
                  >
                    + Add Item
                  </button>
                </div>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        placeholder="Item description"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                      <div className="grid grid-cols-4 gap-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          placeholder="Qty"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                          placeholder="Rate"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        <div className="flex items-center">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">₹{item.amount.toFixed(2)}</span>
                        </div>
                        {items.length > 1 && (
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Additional Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount (%)</label>
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                      min="0"
                      max="100"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-orange-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="Additional notes..."
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-orange-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Terms & Conditions</label>
                    <textarea
                      value={terms}
                      onChange={(e) => setTerms(e.target.value)}
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-orange-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Signature</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={signatureName}
                    onChange={(e) => setSignatureName(e.target.value)}
                    placeholder="Signature Name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-orange-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    value={signatureTitle}
                    onChange={(e) => setSignatureTitle(e.target.value)}
                    placeholder="Title/Position"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-orange-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Subtotal:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Discount ({discount}%):</span>
                      <span className="font-semibold">-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total:</span>
                    <span className="text-lg font-bold text-orange-600 dark:text-orange-400">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={printQuotation}
                    className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-orange-600 hover:to-orange-700"
                  >
                    🖨️ Print Quotation
                  </button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={saveQuotation}
                      className="px-4 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-colors text-sm"
                    >
                      💾 Save
                    </button>
                    <button
                      onClick={sendQuotation}
                      className="px-4 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-colors text-sm"
                    >
                      📧 Email
                    </button>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-sm text-orange-800 dark:text-orange-300">
                    <strong>Tip:</strong> Valid until date is set to 30 days from today by default.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
