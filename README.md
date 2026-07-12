# RO Care India

Official website for **RO Care India** — RO water purifier sales, installation, repair, filter replacement and Annual Maintenance Contracts (AMC).

🌐 **Live site:** https://samrat-sharma.github.io

## About

A fast, responsive, single-page website built with plain HTML, CSS and JavaScript — no build step required. Hosted on GitHub Pages.

## Features

- Responsive design (mobile, tablet, desktop)
- Services showcase — installation, repair, filter replacement, AMC, water testing
- AMC plan comparison (Basic / Standard / Premium)
- Supported brands section
- "How it works" process steps
- Customer testimonials
- Lead-capture forms that open a pre-filled WhatsApp message
- Floating WhatsApp button, sticky navigation and scroll animations

## Project Structure

```
.
├── index.html        # Main page markup
├── css/
│   └── style.css     # All styles
├── js/
│   └── script.js     # Navigation, forms & interactions
├── .nojekyll         # Serve files as-is on GitHub Pages
└── README.md
```

## Customisation

Before going live, update the following placeholders with your real details:

- **Phone number:** replace `+919999999999` / `919999999999` in `index.html` and `js/script.js`
- **Email:** `rocareindia123@gmail.com` (already set)
- **Service areas, prices and plan details** in `index.html`

## Local Preview

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

Pushing to the default branch automatically publishes the site via GitHub Pages
(Settings → Pages → Deploy from branch).
