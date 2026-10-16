# Avine Web

A static storefront demo for an e-commerce brand called Avine. The site includes a landing page, featured products, a shop catalog with filters and pagination, a contact page, and a lightweight demo authentication flow.

## Project overview

This project is a front-end-only website built with plain HTML, CSS, and JavaScript.

- `index.html` renders the home page and hero carousel.
- `shop.html` renders the product catalog with filtering and sorting.
- `contact.html` contains the contact form and map card.
- `auth.html` provides a demo sign-in and sign-up flow.
- `styles.css` contains all app styling.
- `script.js` contains product data, local state logic, cart behavior, and page initialization.

## Features

- Product catalog with category filters, price filtering, sorting, and pagination
- Add-to-cart behavior that persists in browser local storage
- Theme toggle for a light/dark mode
- Quick-view modal for individual products
- Newsletter signup and contact form interactions
- Demo auth flow with local browser persistence

## Running locally

Because this is a static site, you can open the HTML files directly in a browser, or serve the folder locally with a simple web server.

Example:

```bash
cd "C:\Users\neilp\Downloads\VS projects\Avine Web"
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Browser storage notes

The app uses `localStorage` to persist:

- the cart (`avine-cart`)
- the logged-in demo user (`avine-user`)
- the selected theme (`avine-theme`)

This makes the mock storefront behave like a small client-side application without a backend.

## Customization

To update products, edit the `products` array in `script.js`.

To change brand styling or layout, adjust the variables and classes in `styles.css`.

To update copy, edit the text embedded in the HTML files.
