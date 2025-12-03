'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';
import { syncStorage } from '../../lib/syncStorage';

export default function ReceiptMaker() {
  const [companyName, setCompanyName] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('RCP-001');
  const [receiptDate, setReceiptDate] = useState(new Date().toISOString().split('T')[0]);
  const [receivedFrom, setReceivedFrom] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [purpose, setPurpose] = useState('');
  const [notes, setNotes] = useState('');

  const amountInWords = (num: number): string => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    if (num === 0) return 'Zero';
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
    if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' ' + amountInWords(num % 100) : '');
    if (num < 100000) return amountInWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + amountInWords(num % 1000) : '');
    if (num < 10000000) return amountInWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + amountInWords(num % 100000) : '');
    return amountInWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 ? ' ' + amountInWords(num % 10000000) : '');
  };

  const printReceipt = () => {
    const amt = parseFloat(amount) || 0;
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt ${receiptNumber}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; }
              .receipt { border: 2px solid #dc2626; padding: 30px; max-width: 600px; margin: 0 auto; }
              .header { text-align: center; border-bottom: 2px solid #dc2626; padding-bottom: 20px; margin-bottom: 20px; }
              .company { font-size: 24px; font-weight: bold; color: #dc2626; }
              .receipt-title { font-size: 20px; font-weight: bold; margin: 20px 0; }
              .row { display: flex; justify-content: space-between; margin: 15px 0; }
              .label { font-weight: bold; }
              .amount-box { border: 2px solid #dc2626; padding: 15px; margin: 20px 0; text-align: center; }
              .amount-large { font-size: 28px; font-weight: bold; color: #dc2626; }
              .signature { margin-top: 60px; border-top: 1px solid #000; width: 200px; text-align: center; padding-top: 10px; }
            </style>
          </head>
          <body>
            <div class="receipt">
              <div class="header">
                <div class="company">${companyName || 'Your Company'}</div>
                <div class="receipt-title">PAYMENT RECEIPT</div>
              </div>
              
              <div class="row">
                <div><span class="label">Receipt No:</span> ${receiptNumber}</div>
                <div><span class="label">Date:</span> ${receiptDate}</div>
              </div>
              
              <div class="row">
                <div><span class="label">Received From:</span> ${receivedFrom || 'N/A'}</div>
              </div>
              
              <div class="amount-box">
                <div class="amount-large">₹${amt.toFixed(2)}</div>
                <div style="margin-top: 10px; font-style: italic;">${amountInWords(Math.floor(amt))} Rupees Only</div>
              </div>
              
              <div class="row">
                <div><span class="label">Payment Method:</span> ${paymentMethod}</div>
              </div>
              
              <div class="row">
                <div><span class="label">Purpose:</span> ${purpose || 'N/A'}</div>
              </div>
              
              ${notes ? `<div style="margin: 20px 0;"><span class="label">Notes:</span><br/>${notes}</div>` : ''}
              
              <div style="text-align: right; margin-top: 40px;">
                <div class="signature">Authorized Signature</div>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const saveReceipt = async () => {
    const receipt = {
      companyName, receiptNumber, receiptDate,
      receivedFrom, amount, paymentMethod, purpose, notes,
      timestamp: new Date().toISOString(),
    };
    await syncStorage.save(`receipt_${receiptNumber}`, receipt);
    alert('Receipt saved!');
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
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-4xl shadow-lg mb-6">
            🧾
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white mb-4">
            Receipt Maker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Generate payment receipts instantly for your customers.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Receipt Details</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company Name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={receiptNumber}
                      onChange={(e) => setReceiptNumber(e.target.value)}
                      placeholder="Receipt Number"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-red-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    <input
                      type="date"
                      value={receiptDate}
                      onChange={(e) => setReceiptDate(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-red-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <input
                    type="text"
                    value={receivedFrom}
                    onChange={(e) => setReceivedFrom(e.target.value)}
                    placeholder="Received From"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-red-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />

                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount (₹)"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-red-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />

                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-red-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option>Cash</option>
                    <option>Cheque</option>
                    <option>Bank Transfer</option>
                    <option>UPI</option>
                    <option>Credit Card</option>
                    <option>Debit Card</option>
                  </select>

                  <input
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="Purpose of Payment"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-red-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />

                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Additional Notes"
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-red-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Preview</h2>
              
              <div className="border-2 border-red-500 rounded-lg p-6 space-y-4">
                <div className="text-center border-b-2 border-red-500 pb-4">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {companyName || 'Your Company'}
                  </div>
                  <div className="text-lg font-semibold mt-2">PAYMENT RECEIPT</div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold">Receipt No:</span>
                    <span>{receiptNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Date:</span>
                    <span>{receiptDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Received From:</span>
                    <span>{receivedFrom || 'N/A'}</span>
                  </div>
                </div>

                <div className="border-2 border-red-500 rounded-lg p-4 text-center my-4">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                    ₹{parseFloat(amount || '0').toFixed(2)}
                  </div>
                  {amount && (
                    <div className="text-sm italic mt-2 text-gray-600 dark:text-gray-400">
                      {amountInWords(Math.floor(parseFloat(amount)))} Rupees Only
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold">Payment Method:</span>
                    <span>{paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Purpose:</span>
                    <span>{purpose || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={printReceipt}
                  className="w-full rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-red-600 hover:to-red-700"
                >
                  🖨️ Print Receipt
                </button>
                
                <button
                  onClick={saveReceipt}
                  className="w-full rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 transition-colors"
                >
                  💾 Save Receipt
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
