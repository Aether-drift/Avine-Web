# Avine Web

A static storefront demo for an e-commerce brand called Avine. The site includes a landing page, featured products, a shop catalog with filters and pagination, a contact page, and a lightweight demo authentication flow.

## Project overview

This project is a front-end-only website built with HTML, Tailwind CSS via CDN, custom CSS, and vanilla JavaScript. It uses a hybrid styling approach: Tailwind handles common layout and responsive utilities, while `styles.css` retains brand-specific artwork, imagery, and component effects.

- `index.html` renders the home page and hero carousel.
- `shop.html` renders the product catalog with filtering and sorting.
- `about-faq.html` contains the brand story and FAQ.
- `contact.html` contains the contact form and map card.
- `auth.html` provides local demo registration and sign-in.
- `account.html` shows the current customer's profile and order history.
- `cart.html` shows the signed-in customer's cart.
- `checkout.html` runs the simulated checkout flow.
- Tailwind CSS is loaded from the CDN in each HTML page; the inline configuration enables class-based dark mode and shared fonts.
- `styles.css` contains brand-specific styling, decorative artwork, animations, and remaining component details.
- `script.js` contains product data, local state logic, cart behavior, and page initialization.

## Features

- Product catalog with category filters, price filtering, sorting, and pagination
- Customer accounts with email/password validation and salted PBKDF2 password hashes
- Per-customer carts, quantity editing, removal, and persistent cart counts
- Buy Now checkout kept separate from the cart
- Simulated order confirmation and customer order history
- Profile editing and logout
- Theme toggle for a light/dark mode
- Quick-view modal for individual products
- Newsletter signup and contact form interactions
- Client-side authentication state and responsive signed-in navigation

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

- registered demo accounts and salted password hashes (`avine-accounts`)
- the current session email (`avine-session`)
- each customer's cart (`avine-cart:<encoded-email>`)
- an unauthenticated visitor's cart (`avine-cart:guest`), merged after sign-in
- confirmed demo orders (`avine-orders:<encoded-email>`)
- the selected theme (`avine-theme`)

This makes the mock storefront behave like a small client-side application without a backend or database. Account and order data is local to the browser and can be edited by its owner; this is a learning demo, not production authentication or payment processing. Passwords are never stored in plaintext, and checkout does not collect payment details.

## Customization

To update products, edit the `products` array in `script.js`.

To change brand styling or layout, adjust the variables and classes in `styles.css`.

To update copy, edit the text embedded in the HTML files.
