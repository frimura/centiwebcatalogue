# Centi Catalogue

Mobile-first customer-facing product catalogue. Customers can search products, add items to a cart, and send the generated order text to Centi Customer Service through WhatsApp.

## Configure WhatsApp CS number

Open `js/app.js` and set `CONFIG.whatsappNumber` to the CS WhatsApp number in international format, digits only. For Indonesia, use `62` followed by the number without the leading `0`.

Example:
`whatsappNumber: '6281234567890'`

The customer-facing button opens `https://wa.me/` with the generated order text prefilled. It does not submit the order to a server. The cart is intentionally retained after WhatsApp opens; the customer must use **Empty cart / Kosongkan keranjang** manually.

## Publish on GitHub Pages

1. Upload the contents of this folder to a GitHub repository.
2. In repository Settings → Pages, publish from branch `main`, folder `/ (root)`.
3. Ensure the Google Sheet is shared as **Anyone with the link – Viewer**.
4. Open the published URL on mobile or desktop.

## Product catalogue source

The catalogue reads the public Google Sheets CSV export configured in `js/app.js`. The Apps Script file is retained only as an optional public catalogue JSON endpoint; it no longer sends orders and contains no Telegram credentials, order PIN, or order-authentication logic.

## Customer order flow

1. Browse and add products.
2. Open the cart and review quantities.
3. Press **Tanyakan CS**.
4. WhatsApp opens with the order details prefilled.
5. The cart remains unchanged until the customer manually empties it.

No PC routing, Telegram sending, clipboard order export, requester identity prompt, web-app connection settings, or order PIN is included in the customer interface.
