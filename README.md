<p align="center">
  <a href="https://flambeau-shop.vercel.app/">
    <img src="https://img.shields.io/badge/Live_Demo-flambeau--shop.vercel.app-D4AF37?style=for-the-badge&logo=vercel&logoColor=white&labelColor=1A1A1A" alt="Live Demo" />
  </a>
  <a href="https://github.com/oualidkarmoun/flambeau-shop">
    <img src="https://img.shields.io/badge/Source_GitHub-Flambeau_Shop-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository" />
  </a>
</p>

# 🕯️ FLAMBEAU Shop

### Premium home-fragrance e-commerce with an AI shopping assistant

**FLAMBEAU Shop** is a full-stack e-commerce experience for an artisanal home-fragrance brand based in Oujda, Morocco.  
The project combines an elegant storefront, product and order workflows, a real Node.js backend, persistent data through Google Apps Script / Google Sheets, and an AI assistant powered through Hugging Face.

> **Live:** https://flambeau-shop.vercel.app/

---

## ✨ Preview

<p align="center">
  <img src="docs/flambeau-home.png" width="100%" alt="FLAMBEAU Shop homepage preview" />
</p>

> Add the provided homepage screenshot as `docs/flambeau-home.png` to display it here.

---

## 🎯 Project Highlights

- 🛍️ **Modern e-commerce storefront** for candles, wax melts, bakhour, diffusers and home-fragrance products
- 🛒 **Shopping cart and checkout flow** with product variants, quantities, delivery fees and order confirmation
- 🤖 **AI shopping assistant** powered by **Meta Llama 3.1 8B Instruct** through the Hugging Face router
- 🌍 **Multilingual customer support logic** for French, Arabic and Moroccan Darija
- 📦 **Dynamic product management** through backend APIs
- 🧾 **Order persistence** through **Google Apps Script + Google Sheets**
- 🔐 **Admin and security protections** with rate limiting, environment-based secrets and request validation
- ⚡ **Serverless deployment on Vercel**
- 📱 **Responsive interface** designed for desktop and mobile

---

## 🧠 AI Assistant

The integrated assistant acts as a product advisor for FLAMBEAU customers.

It can help users with:

- choosing a fragrance family
- understanding how wax melts and burners are used
- product usage and safety guidance
- gift recommendations
- order preparation
- French, Arabic and Moroccan Darija conversations

The AI route uses the **Hugging Face Chat Completions API** with:

```text
meta-llama/Llama-3.1-8B-Instruct
```

The assistant is configured with brand-specific instructions so that responses stay focused on FLAMBEAU products and customer needs.

---

## 🛒 E-commerce Features

### Customer side

- Browse products by category
- Open individual product pages
- Select fragrances for supported products
- Add products to cart
- Change quantities
- Remove cart items
- Calculate subtotal, delivery and total
- Submit customer information
- Receive a generated order number
- View order confirmation
- Use the AI assistant directly from the storefront

### Product handling

- Product availability / sold-out state
- Dynamic product data
- Related-product recommendations
- Category filtering
- Product images, prices, descriptions and fragrance options

---

## 🧩 Architecture

```text
Customer Browser
      │
      ├── Static storefront (HTML / CSS / JavaScript)
      │
      ├── /api/products
      ├── /api/orders
      └── /api/chat
             │
             ├── Node.js / Vercel Serverless API
             │
             ├── Hugging Face → Meta Llama 3.1 8B Instruct
             │
             └── Google Apps Script
                        │
                        └── Google Sheets
```

The same repository can also run locally through the Node.js server.

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=html,css,js,nodejs,vercel,git,github" alt="HTML CSS JavaScript Node.js Vercel Git GitHub" />
</p>

| Layer | Technologies |
|---|---|
| **Frontend** | HTML5 · CSS3 · Vanilla JavaScript |
| **Backend** | Node.js · Serverless API routes |
| **AI** | Hugging Face Router · Meta Llama 3.1 8B Instruct |
| **Data / Persistence** | Google Apps Script · Google Sheets |
| **Deployment** | Vercel |
| **Security** | Environment variables · Rate limiting · Request validation · Security headers |

---

## 📁 Project Structure

```text
flambeau-shop/
├── api/                    # Vercel serverless API routes
│   ├── chat.js
│   ├── products.js
│   └── ...
├── data/                   # Local development data
├── docs/                   # Documentation and screenshots
├── public/                 # Storefront pages, CSS, JS and assets
├── server/                 # Local Node.js server
├── google-apps-script.js   # Persistent Google Sheets integration
├── .env.example
├── package.json
└── vercel.json
```

---

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/oualidkarmoun/flambeau-shop.git
cd flambeau-shop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your environment file

**Windows**

```bash
copy .env.example .env
```

**macOS / Linux**

```bash
cp .env.example .env
```

### 4. Configure environment variables

```env
NODE_ENV=development
ADMIN_PASSWORD=your-secure-admin-password
SESSION_SECRET=your-random-secret-key
CORS_ALLOWED_ORIGINS=http://localhost:3000
TRUST_PROXY=false

GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/xxx/exec

HF_TOKEN=hf_xxx
HF_MODEL=meta-llama/Llama-3.1-8B-Instruct
```

> Never commit real secrets or production tokens to GitHub.

### 5. Start the application

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

---

## ✅ Code Checks

```bash
npm run check
```

This checks the main backend and frontend JavaScript files for syntax errors.

---

## ☁️ Deployment

The production version is deployed on **Vercel**.

```text
https://flambeau-shop.vercel.app/
```

The `vercel.json` configuration:

- serves the static storefront from `public/`
- routes `/api/*` requests to serverless Node.js handlers
- keeps secrets in environment variables

### Persistent data on Vercel

Vercel's local filesystem is not durable.  
For production persistence, FLAMBEAU uses:

**Google Apps Script → Google Sheets**

for products, orders and contact data.

More deployment details are available in:

```text
docs/DEPLOYMENT.md
```

---

## 🔐 Security Notes

The project includes several protections for production use:

- request method validation
- maximum request-body limits
- rate limiting
- security headers
- environment-based credentials
- controlled CORS origins
- server-side AI token usage

Production credentials should always be configured through the hosting platform and never stored in the repository.

---

## 🗺️ Possible Next Steps

- Customer accounts and authenticated order history
- Online payment integration
- Dedicated database migration
- Advanced product-search and recommendation system
- AI assistant connected to real-time product stock
- Analytics dashboard
- Automated testing and CI/CD

---

## 👨‍💻 Author

**Oualid Karmoun**  
AI Engineering Student @ ENIAD

[LinkedIn](https://www.linkedin.com/in/oualid-karmoun/) · [GitHub](https://github.com/oualidkarmoun)

---

<p align="center">
  <strong>Built as a real-world e-commerce project combining software engineering and AI integration.</strong>
</p>
