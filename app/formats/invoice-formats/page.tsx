'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';

export default function InvoiceFormats() {
  const [selectedFormat, setSelectedFormat] = useState('gst-invoice');
  const [showPreview, setShowPreview] = useState(false);

  const formats = [
    { id: 'gst-invoice', name: 'GST Tax Invoice', description: 'Standard GST compliant invoice format' },
    { id: 'service-invoice', name: 'Service Invoice', description: 'Invoice format for service businesses' },
    { id: 'retail-invoice', name: 'Retail Invoice', description: 'Simple invoice for retail businesses' },
    { id: 'proforma-invoice', name: 'Proforma Invoice', description: 'Preliminary invoice before final billing' },
    { id: 'commercial-invoice', name: 'Commercial Invoice', description: 'For international trade' },
    { id: 'tax-invoice', name: 'Tax Invoice', description: 'Detailed tax invoice with breakdowns' },
  ];

  const downloadFormat = (formatId: string) => {
    // Generate CSV template
    let csvContent = '';
    
    switch (formatId) {
      case 'gst-invoice':
        csvContent = `Invoice Number,Date,Customer Name,Customer Address,GSTIN,Item Description,HSN Code,Quantity,Rate,Amount,CGST %,CGST Amount,SGST %,SGST Amount,Total Amount
INV-001,${new Date().toISOString().split('T')[0]},Customer Name,Customer Address,22AAAAA0000A1Z5,Product/Service,1234,1,1000,1000,9,90,9,90,1180`;
        break;
      case 'service-invoice':
        csvContent = `Invoice Number,Date,Client Name,Service Description,Hours,Rate per Hour,Subtotal,Tax %,Tax Amount,Total
SRV-001,${new Date().toISOString().split('T')[0]},Client Name,Consulting Services,10,500,5000,18,900,5900`;
        break;
      case 'retail-invoice':
        csvContent = `Invoice Number,Date,Customer Name,Item Name,Quantity,Price,Total
RTL-001,${new Date().toISOString().split('T')[0]},Customer Name,Product Name,2,500,1000`;
        break;
      default:
        csvContent = `Invoice Number,Date,Customer Name,Description,Amount
INV-001,${new Date().toISOString().split('T')[0]},Customer Name,Service/Product,1000`;
    }

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formatId}-template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const downloadExcel = (formatId: string) => {
    alert('Excel format download - In production, this would generate an actual .xlsx file using a library like xlsx or exceljs');
  };

  const downloadPDF = (formatId: string) => {
    const format = formats.find(f => f.id === formatId);
    const printWindow = window.open('', '', 'height=800,width=800');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${format?.name} Template</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; }
              .invoice { border: 2px solid #6366f1; padding: 30px; }
              .header { text-align: center; border-bottom: 2px solid #6366f1; padding-bottom: 20px; margin-bottom: 20px; }
              .company { font-size: 24px; font-weight: bold; color: #6366f1; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
              th { background-color: #ede9fe; }
              .total { font-weight: bold; font-size: 1.2em; }
            </style>
          </head>
          <body>
            <div class="invoice">
              <div class="header">
                <div class="company">YOUR COMPANY NAME</div>
                <div>Address Line 1, City, State - PIN</div>
                <div>Phone: +91 XXXXX XXXXX | Email: info@company.com</div>
                <div>GSTIN: 22AAAAA0000A1Z5</div>
              </div>
              
              <h2>${format?.name}</h2>
              
              <div style="display: flex; justify-content: space-between; margin: 20px 0;">
                <div>
                  <strong>Bill To:</strong><br/>
                  Customer Name<br/>
                  Customer Address<br/>
                  GSTIN: XXXXXXXXXXXX
                </div>
                <div style="text-align: right;">
                  <strong>Invoice #:</strong> INV-001<br/>
                  <strong>Date:</strong> ${new Date().toLocaleDateString()}<br/>
                  <strong>Due Date:</strong> ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>HSN</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Product/Service Name</td>
                    <td>1234</td>
                    <td>1</td>
                    <td>₹1,000.00</td>
                    <td>₹1,000.00</td>
                  </tr>
                </tbody>
              </table>

              <div style="text-align: right; margin-top: 20px;">
                <div>Subtotal: ₹1,000.00</div>
                <div>CGST (9%): ₹90.00</div>
                <div>SGST (9%): ₹90.00</div>
                <div class="total">Total: ₹1,180.00</div>
              </div>

              <div style="margin-top: 40px;">
                <strong>Terms & Conditions:</strong><br/>
                1. Payment due within 30 days<br/>
                2. Please make checks payable to: YOUR COMPANY NAME<br/>
                3. Thank you for your business!
              </div>

              <div style="margin-top: 40px; text-align: right;">
                <div style="border-top: 1px solid #000; width: 200px; margin-left: auto; padding-top: 10px;">
                  Authorized Signature
                </div>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
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
            <Link href="/formats" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              ← Back to Formats
            </Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-4xl shadow-lg mb-6">
            📄
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white mb-4">
            Invoice Formats
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Download professional invoice templates in multiple formats.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Format List */}
            <div className="lg:col-span-1 space-y-4">
              {formats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    selectedFormat === format.id
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 hover:shadow-md'
                  }`}
                >
                  <div className="font-bold">{format.name}</div>
                  <div className={`text-sm mt-1 ${selectedFormat === format.id ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>
                    {format.description}
                  </div>
                </button>
              ))}
            </div>

            {/* Download Options */}
            <div className="lg:col-span-2 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {formats.find(f => f.id === selectedFormat)?.name}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {formats.find(f => f.id === selectedFormat)?.description}
              </p>

              <div className="space-y-4">
                <div className="p-6 border-2 border-blue-200 dark:border-blue-800 rounded-xl">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">📊 CSV Format</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Spreadsheet-compatible format, easy to import into Excel or Google Sheets
                  </p>
                  <button
                    onClick={() => downloadFormat(selectedFormat)}
                    className="w-full rounded-lg bg-blue-500 hover:bg-blue-600 px-6 py-3 font-semibold text-white transition-colors"
                  >
                    Download CSV Template
                  </button>
                </div>

                <div className="p-6 border-2 border-green-200 dark:border-green-800 rounded-xl">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">📗 Excel Format</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Native Excel format with formulas and formatting
                  </p>
                  <button
                    onClick={() => downloadExcel(selectedFormat)}
                    className="w-full rounded-lg bg-green-500 hover:bg-green-600 px-6 py-3 font-semibold text-white transition-colors"
                  >
                    Download Excel Template
                  </button>
                </div>

                <div className="p-6 border-2 border-red-200 dark:border-red-800 rounded-xl">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">📕 PDF Format</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Print-ready PDF template with professional layout
                  </p>
                  <button
                    onClick={() => downloadPDF(selectedFormat)}
                    className="w-full rounded-lg bg-red-500 hover:bg-red-600 px-6 py-3 font-semibold text-white transition-colors"
                  >
                    Download PDF Template
                  </button>
                </div>
              </div>

              <div className="p-6 border-2 border-purple-200 dark:border-purple-800 rounded-xl">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">👁️ Preview Format</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  View the format before downloading
                </p>
                <button
                  onClick={() => setShowPreview(true)}
                  className="w-full rounded-lg bg-purple-500 hover:bg-purple-600 px-6 py-3 font-semibold text-white transition-colors"
                >
                  Preview Format
                </button>
              </div>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>💡 Tip:</strong> All templates are customizable. Edit them in your preferred software to match your brand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute right-4 top-4 rounded-lg p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {formats.find(f => f.id === selectedFormat)?.name} Preview
              </h2>

              <div className="border-2 border-blue-500 rounded-lg p-8 bg-white">
                <div className="text-center border-b-2 border-blue-500 pb-4 mb-6">
                  <div className="text-3xl font-bold text-blue-600">YOUR COMPANY NAME</div>
                  <div className="text-sm mt-2">Address Line 1, City, State - PIN</div>
                  <div className="text-sm">Phone: +91 XXXXX XXXXX | Email: info@company.com</div>
                  <div className="text-sm">GSTIN: 22AAAAA0000A1Z5</div>
                </div>

                <div className="text-2xl font-bold text-center mb-6">
                  {formats.find(f => f.id === selectedFormat)?.name.toUpperCase()}
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="font-bold">Bill To:</div>
                    <div>Customer Name</div>
                    <div>Customer Address</div>
                    <div>GSTIN: XXXXXXXXXXXX</div>
                  </div>
                  <div className="text-right">
                    <div><span className="font-bold">Invoice #:</span> INV-001</div>
                    <div><span className="font-bold">Date:</span> {new Date().toLocaleDateString()}</div>
                    <div><span className="font-bold">Due Date:</span> {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</div>
                  </div>
                </div>

                <table className="w-full mb-6">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-2">Description</th>
                      <th className="text-right py-2">HSN</th>
                      <th className="text-right py-2">Qty</th>
                      <th className="text-right py-2">Rate</th>
                      <th className="text-right py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-2">Product/Service Name</td>
                      <td className="text-right py-2">1234</td>
                      <td className="text-right py-2">1</td>
                      <td className="text-right py-2">₹1,000.00</td>
                      <td className="text-right py-2">₹1,000.00</td>
                    </tr>
                  </tbody>
                </table>

                <div className="text-right space-y-2 mb-6">
                  <div>Subtotal: ₹1,000.00</div>
                  <div>CGST (9%): ₹90.00</div>
                  <div>SGST (9%): ₹90.00</div>
                  <div className="text-xl font-bold text-blue-600 pt-2 border-t-2 border-gray-300">
                    Total: ₹1,180.00
                  </div>
                </div>

                <div className="mt-8 text-sm">
                  <div className="font-bold mb-2">Terms & Conditions:</div>
                  <div>1. Payment due within 30 days</div>
                  <div>2. Please make checks payable to: YOUR COMPANY NAME</div>
                  <div>3. Thank you for your business!</div>
                </div>

                <div className="mt-12 text-right">
                  <div className="inline-block border-t-2 border-gray-400 pt-2 px-8">
                    <div className="font-bold">Authorized Signature</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => downloadFormat(selectedFormat)}
                  className="flex-1 rounded-lg bg-blue-500 hover:bg-blue-600 px-6 py-3 font-semibold text-white transition-colors"
                >
                  Download CSV
                </button>
                <button
                  onClick={() => downloadPDF(selectedFormat)}
                  className="flex-1 rounded-lg bg-red-500 hover:bg-red-600 px-6 py-3 font-semibold text-white transition-colors"
                >
                  Print/PDF
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
