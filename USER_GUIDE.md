# InvoSync - User Guide

## 🚀 Getting Started

InvoSync is a comprehensive business management platform with powerful tools for invoicing, calculations, and document generation.

## 📱 Available Tools

### 1. GST Calculator
**Location:** `/tools/gst-calculator`

**Features:**
- Calculate GST for both inclusive and exclusive amounts
- Support for all Indian GST rates (0%, 0.25%, 3%, 5%, 12%, 18%, 28%)
- Automatic CGST/SGST breakdown
- Copy results to clipboard
- Print professional GST calculation report

**How to Use:**
1. Select calculation type (GST Exclusive or Inclusive)
2. Enter the amount
3. Select GST rate
4. Click "Calculate"
5. Use Copy or Print buttons to save results

**Use Cases:**
- Calculate final price with GST
- Reverse calculate original amount from GST-inclusive price
- Generate GST reports for accounting

---

### 2. Invoice Generator
**Location:** `/tools/invoice-generator`

**Features:**
- Professional invoice creation
- Multiple line items
- Automatic total calculations
- GST integration
- Print invoices
- Save/Load drafts
- Email invoices directly

**How to Use:**
1. Fill in company details (name, address)
2. Add client information
3. Set invoice number and date
4. Add items with quantity and rate
5. Review live preview
6. Print, Save, or Email the invoice

**Use Cases:**
- Create professional invoices for clients
- Save drafts for recurring clients
- Email invoices directly from browser
- Print for physical records

**Tips:**
- Use "Save" to store draft for later
- Use "Load" to retrieve saved draft
- Click "Email" to send via your email client

---

### 3. QR Code Generator
**Location:** `/tools/qr-code-generator`

**Features:**
- Generate QR codes for text, URLs, emails, and phone numbers
- Customize size (100px - 500px)
- Custom colors for QR code and background
- Download as PNG
- Print with details
- Share via Web Share API
- Save to history

**How to Use:**
1. Select QR code type (Text, URL, Email, Phone)
2. Enter content
3. Adjust size using slider
4. Customize colors if needed
5. Download, Print, or Share

**Use Cases:**
- Create QR codes for business cards
- Generate payment QR codes
- Share contact information
- Create event check-in codes
- Product information links

**Tips:**
- Test QR codes before printing
- Use high contrast colors for better scanning
- Larger sizes work better for distant scanning

---

### 4. Quotation Maker
**Location:** `/tools/quotation-maker`

**Features:**
- Professional quotation creation
- Company and client details
- Multiple line items
- Discount support
- Valid until date
- Custom notes and terms
- Print quotations
- Email to clients

**How to Use:**
1. Enter company details (name, email, phone)
2. Add client information
3. Set quotation number and dates
4. Add items with descriptions, quantity, and rates
5. Apply discount if needed
6. Add notes and terms & conditions
7. Print or Email the quotation

**Use Cases:**
- Send price quotes to potential clients
- Create formal business proposals
- Track quotation validity periods
- Maintain professional communication

**Tips:**
- Default validity is 30 days from today
- Save quotations for record keeping
- Customize terms & conditions for your business

---

## 💡 Pro Tips

### Data Persistence
- All tools support saving data locally
- Drafts are stored in your browser's localStorage
- Clear browser data will remove saved drafts

### Printing
- All tools have professional print layouts
- Use browser's print preview before printing
- Save as PDF using browser's print to PDF option

### Email Integration
- Email buttons use mailto: links
- Opens your default email client
- Pre-fills subject and body with relevant information

### Keyboard Shortcuts
- Tab: Navigate between fields
- Enter: Submit forms (where applicable)
- Ctrl/Cmd + P: Print (when focused on tool)

---

## 🔒 Privacy & Security

- **No Data Collection:** All calculations happen in your browser
- **Local Storage Only:** Saved data stays on your device
- **No Server Upload:** Your business data never leaves your computer
- **Secure:** No external API calls except for QR code generation

---

## 📊 Business Workflows

### Creating an Invoice Workflow
1. Use GST Calculator to verify amounts
2. Generate Invoice with calculated amounts
3. Save draft for records
4. Print or Email to client
5. Generate QR code for payment link (optional)

### Quotation to Invoice Workflow
1. Create Quotation with Quotation Maker
2. Send to client via email
3. Upon approval, use Invoice Generator
4. Copy items from quotation to invoice
5. Send final invoice

### Payment Collection
1. Generate invoice
2. Create QR code with payment link
3. Include QR code in invoice
4. Client scans to pay

---

## 🛠️ Troubleshooting

### Print Not Working
- Check browser print permissions
- Try print preview first
- Ensure pop-ups are allowed

### Save/Load Not Working
- Check if browser allows localStorage
- Clear browser cache and try again
- Ensure you're not in incognito mode

### QR Code Not Scanning
- Increase QR code size
- Use higher contrast colors
- Ensure good lighting when scanning
- Try different QR code scanner apps

---

## 📞 Support

For issues or feature requests:
- Check FEATURES.md for implementation status
- Review this guide for usage instructions
- Ensure browser is up to date

---

## 🎯 Coming Soon

- Logo Maker
- Proforma Invoice Generator
- Purchase Order Generator
- Receipt Maker
- Depreciation Calculators
- Barcode Generator/Scanner
- Business Card Maker

---

**Last Updated:** November 2024
**Version:** 1.0.0
