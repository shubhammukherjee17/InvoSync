'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';

interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export default function InvoiceGenerator() {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, description: '', quantity: 1, rate: 0, amount: 0 },
  ]);
  const [gstRate, setGstRate] = useState(18);
  const [signatureName, setSignatureName] = useState('');
  const [signatureTitle, setSignatureTitle] = useState('Authorized Signatory');

  const addItem = () => {
    setItems([...items, { id: items.length + 1, description: '', quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: keyof InvoiceItem, value: string | number) => {
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
  const gstAmount = (subtotal * gstRate) / 100;
  const total = subtotal + gstAmount;

  const saveAsDraft = () => {
    const draft = {
      companyName,
      companyAddress,
      clientName,
      clientAddress,
      invoiceNumber,
      invoiceDate,
      items,
      gstRate,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('invoice_draft', JSON.stringify(draft));
    alert('Invoice saved as draft!');
  };

  const loadDraft = () => {
    const draft = localStorage.getItem('invoice_draft');
    if (draft) {
      const data = JSON.parse(draft);
      setCompanyName(data.companyName);
      setCompanyAddress(data.companyAddress);
      setClientName(data.clientName);
      setClientAddress(data.clientAddress);
      setInvoiceNumber(data.invoiceNumber);
      setInvoiceDate(data.invoiceDate);
      setItems(data.items);
      setGstRate(data.gstRate);
      alert('Draft loaded successfully!');
    } else {
      alert('No draft found!');
    }
  };

  const printInvoice = () => {
    const printWindow = window.open('', '', 'height=800,width=800');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice ${invoiceNumber}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; }
              .header { text-align: center; border-bottom: 3px solid #6366f1; padding-bottom: 20px; margin-bottom: 30px; }
              .company { font-size: 24px; font-weight: bold; color: #6366f1; }
              .section { margin: 20px 0; }
              .label { font-weight: bold; color: #374151; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
              th { background-color: #f3f4f6; font-weight: bold; }
              .total-row { background-color: #ede9fe; font-weight: bold; font-size: 1.1em; }
              .footer { margin-top: 40px; text-align: center; color: #6b7280; font-size: 0.9em; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="company">${companyName || 'Your Company'}</div>
              <div>${companyAddress || 'Company Address'}</div>
            </div>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
              <div class="section">
                <div class="label">Bill To:</div>
                <div>${clientName || 'Client Name'}</div>
                <div>${clientAddress || 'Client Address'}</div>
              </div>
              <div class="section" style="text-align: right;">
                <div><span class="label">Invoice #:</span> ${invoiceNumber}</div>
                <div><span class="label">Date:</span> ${invoiceDate}</div>
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

            <div style="text-align: right; margin-top: 20px;">
              <div style="margin: 10px 0;"><span class="label">Subtotal:</span> ₹${subtotal.toFixed(2)}</div>
              <div style="margin: 10px 0;"><span class="label">GST (${gstRate}%):</span> ₹${gstAmount.toFixed(2)}</div>
              <div style="margin: 10px 0; font-size: 1.2em; color: #6366f1;"><span class="label">Total:</span> ₹${total.toFixed(2)}</div>
            </div>

            ${signatureName ? `
              <div style="margin-top: 60px; text-align: right;">
                <div style="display: inline-block; border-top: 2px solid #374151; padding-top: 10px; min-width: 200px;">
                  <div style="font-weight: bold;">${signatureName}</div>
                  <div style="font-size: 0.9em; color: #6b7280;">${signatureTitle}</div>
                </div>
              </div>
            ` : ''}

            <div class="footer">
              <p>Thank you for your business!</p>
              <p>Generated by InvoSync - ${new Date().toLocaleString()}</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const downloadInvoice = () => {
    printInvoice();
  };

  const emailInvoice = () => {
    const subject = `Invoice ${invoiceNumber} from ${companyName || 'InvoSync'}`;
    const body = `Dear ${clientName || 'Customer'},\n\nPlease find attached invoice ${invoiceNumber} dated ${invoiceDate}.\n\nInvoice Details:\nSubtotal: ₹${subtotal.toFixed(2)}\nGST (${gstRate}%): ₹${gstAmount.toFixed(2)}\nTotal: ₹${total.toFixed(2)}\n\nThank you for your business!\n\nBest regards,\n${companyName || 'Your Company'}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-4xl shadow-lg mb-6">
            📄
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white mb-4">
            Invoice Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Create professional invoices instantly with customizable templates.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Company Details</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company Name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <textarea
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    placeholder="Company Address"
                    rows={2}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Client Details</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Client Name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <textarea
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    placeholder="Client Address"
                    rows={2}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Invoice Info</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Invoice #</label>
                    <input
                      type="text"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                    <input
                      type="date"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Items</h2>
                  <button
                    onClick={addItem}
                    className="px-4 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors"
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
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          placeholder="Qty"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                          placeholder="Rate"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">₹{item.amount.toFixed(2)}</span>
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
                    </div>
                  ))}
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
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    value={signatureTitle}
                    onChange={(e) => setSignatureTitle(e.target.value)}
                    placeholder="Title/Position"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800 h-fit sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Invoice Preview</h2>
              
              <div className="space-y-6 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {companyName || 'Your Company'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {companyAddress || 'Company Address'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Bill To:</p>
                    <p className="text-gray-600 dark:text-gray-400">{clientName || 'Client Name'}</p>
                    <p className="text-gray-600 dark:text-gray-400">{clientAddress || 'Client Address'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">Invoice: {invoiceNumber}</p>
                    <p className="text-gray-600 dark:text-gray-400">Date: {invoiceDate}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 text-gray-900 dark:text-white">Item</th>
                        <th className="text-right py-2 text-gray-900 dark:text-white">Qty</th>
                        <th className="text-right py-2 text-gray-900 dark:text-white">Rate</th>
                        <th className="text-right py-2 text-gray-900 dark:text-white">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 text-gray-700 dark:text-gray-300">{item.description || '-'}</td>
                          <td className="text-right py-2 text-gray-700 dark:text-gray-300">{item.quantity}</td>
                          <td className="text-right py-2 text-gray-700 dark:text-gray-300">₹{item.rate.toFixed(2)}</td>
                          <td className="text-right py-2 text-gray-700 dark:text-gray-300">₹{item.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Subtotal:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">GST ({gstRate}%):</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹{gstAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total:</span>
                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {signatureName && (
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-right">
                      <div className="inline-block">
                        <div className="border-t-2 border-gray-400 pt-2 px-8 min-w-[200px]">
                          <div className="font-semibold text-gray-900 dark:text-white">{signatureName}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{signatureTitle}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={printInvoice}
                  className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-purple-600 hover:to-purple-700"
                >
                  🖨️ Print Invoice
                </button>
                
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={saveAsDraft}
                    className="px-4 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-colors text-sm"
                  >
                    💾 Save
                  </button>
                  <button
                    onClick={loadDraft}
                    className="px-4 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-colors text-sm"
                  >
                    📂 Load
                  </button>
                  <button
                    onClick={emailInvoice}
                    className="px-4 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-colors text-sm"
                  >
                    📧 Email
                  </button>
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
