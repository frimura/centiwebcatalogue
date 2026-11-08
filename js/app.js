
'use strict';

/* =========================================================
   1. CONFIGURATION
   ========================================================= */

const CONFIG = {
  spreadsheetId: '1wTJRGfmdAARp9d_qNNQ1UUUssuNo5p9tarxPiYllGLo',
  gid: '0',
  currency: 'IDR',
  whatsappNumber: '6287877888865', // Replace with the CS WhatsApp number (country code, digits only).
  cacheKey: 'centi_catalog_rows_v1',
  cartKey: 'centi_catalog_cart_v1',
  refreshInterval: 5 * 60 * 1000
};

/* =========================================================
   2. LANGUAGE CONFIGURATION
   ========================================================= */

const LANGUAGE_KEY = 'centi_catalog_language_v1';

let currentLanguage =
  localStorage.getItem(LANGUAGE_KEY) === 'id' ? 'id' : 'en';

const LANG = {
  en: {
    language: 'Language / Bahasa',
    searchPlaceholder: 'Search SKU or product name…',
    loadingCatalog: 'Loading catalog…',
    connectingCatalog: 'Connecting to product catalog…',
    noProducts: 'No products found',
    tryAnother: 'Try another SKU or product name.',
    refresh: '↻ Refresh',
    selectQuantity: 'Select quantity',
    quantity: 'Quantity',
    subtotal: 'Subtotal',
    addToCart: 'Add to Cart',
    catalog: 'Catalog',
    cart: 'Cart',
    yourOrder: 'Your order',
    differentProducts: 'different products',
    total: 'Total',
    emptyCart: 'Empty cart',
    remove: 'Remove',
    emptyCartTitle: 'Your cart is empty',
    emptyCartText: 'Add products from the catalog.',
    added: 'Added',
    toCart: 'to cart',
    cartEmptied: 'Cart emptied',
    confirmEmpty: 'Are you sure you want to remove all products from your cart?',
    catalogUnavailable: 'Catalog unavailable',
    first160: 'Showing first 160 matches. Refine your search to narrow results.',
    close: 'Close',
    sku: 'SKU',
    each: 'each',
    productsLoaded: 'products loaded',
    offline: 'offline',
    unknownPC: 'Unknown PC',
    usingSavedCatalog: 'Using saved catalog',
    refreshFailed: 'Refresh failed',
    connectingSheets: 'Connecting to Google Sheets…',
    couldNotLoad: 'Could not load catalog',
    showingFirst: 'Showing first',
    of: 'of',
    products: 'products',
    matching: 'matching products',
    spellingCorrected: 'spelling corrected',
    noEveryWord: 'No product matches every word',
    closest: 'closest products',
    fullTitle: 'found in full product title',
    ranked: 'ranked by relevance',
  },

  id: {
    language: 'Bahasa / Language',
    searchPlaceholder: 'Cari SKU atau nama produk…',
    loadingCatalog: 'Memuat katalog…',
    connectingCatalog: 'Menghubungkan ke katalog produk…',
    noProducts: 'Produk tidak ditemukan',
    tryAnother: 'Coba SKU atau nama produk lainnya.',
    refresh: '↻ Muat ulang',
    selectQuantity: 'Pilih jumlah',
    quantity: 'Jumlah',
    subtotal: 'Subtotal',
    addToCart: 'Tambah ke Keranjang',
    catalog: 'Katalog',
    cart: 'Keranjang',
    yourOrder: 'Pesanan Anda',
    differentProducts: 'produk berbeda',
    total: 'Total',
    emptyCart: 'Kosongkan keranjang',
    remove: 'Hapus',
    emptyCartTitle: 'Keranjang masih kosong',
    emptyCartText: 'Tambahkan produk dari katalog.',
    added: 'Ditambahkan',
    toCart: 'ke keranjang',
    cartEmptied: 'Keranjang dikosongkan',
    confirmEmpty: 'Yakin ingin menghapus semua produk dari keranjang?',
    catalogUnavailable: 'Katalog tidak tersedia',
    first160: 'Menampilkan 160 hasil pertama. Persempit pencarian Anda.',
    close: 'Tutup',
    sku: 'SKU',
    each: 'per item',
    productsLoaded: 'produk dimuat',
    offline: 'offline',
    unknownPC: 'PC tidak dikenal',
    usingSavedCatalog: 'Menggunakan katalog tersimpan',
    refreshFailed: 'Pembaruan gagal',
    connectingSheets: 'Menghubungkan ke Google Sheets…',
    couldNotLoad: 'Tidak dapat memuat katalog',
    showingFirst: 'Menampilkan',
    of: 'dari',
    products: 'produk',
    matching: 'produk cocok',
    spellingCorrected: 'ejaan diperbaiki',
    noEveryWord: 'Tidak ada produk yang cocok dengan semua kata',
    closest: 'produk terdekat',
    fullTitle: 'ditemukan dalam judul produk lengkap',
    ranked: 'diurutkan berdasarkan relevansi',
  }
};

function t(key) {
  return LANG[currentLanguage][key] || LANG.en[key] || key;
}

const $ = id => document.getElementById(id);

function applyLanguage() {
  document.documentElement.lang = currentLanguage;

  const languageSelect = $('languageSelect');
  if (languageSelect) languageSelect.value = currentLanguage;

  $('searchInput').placeholder = t('searchPlaceholder');
  $('refreshBtn').textContent = t('refresh');

  $('emptyState').querySelector('strong').textContent = t('noProducts');
  $('emptyState').querySelector('span').textContent = t('tryAnother');

  $('quantityPanel').querySelector('.panel-head strong').textContent =
    t('selectQuantity');

  $('quantityPanel').querySelector('label').textContent = t('quantity');
  $('quantityPanel').querySelector('.quantity-subtotal span').textContent =
    t('subtotal');

  $('confirmAddToCart').textContent = t('addToCart');

  $('navCatalog').lastChild.textContent = t('catalog');
  $('navCart').lastChild.textContent = t('cart') + ' ';

  $('cartPanel').querySelector('.panel-head strong').textContent =
    t('yourOrder');

  $('cartPanel').querySelector('.total-line span').textContent = t('total');

  $('sendOrder').querySelector('span').textContent = currentLanguage === 'id' ? 'Tanyakan CS' : 'Ask Customer Service';
  $('emptyCart').textContent = t('emptyCart');

  renderProducts();
  renderCart();
}

/* =========================================================
   3. STATE AND STORAGE
   ========================================================= */

const CSV_URL =
  `https://docs.google.com/spreadsheets/d/${CONFIG.spreadsheetId}/export?format=csv&gid=${CONFIG.gid}`;

let products = [];
let cart = readStorage(CONFIG.cartKey, {});

let toastTimer;
let searchTimer;
let refreshTimer = null;
let catalogRequest = null;
let selectedProduct = null;
let previousSearchQuery = '';

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Could not read storage "${key}".`, error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save storage "${key}".`, error);
  }
}

/* =========================================================
   4. REQUESTER IDENTITY
   ========================================================= */

/* =========================================================
   5. GENERAL HELPERS
   ========================================================= */

function money(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: CONFIG.currency,
    maximumFractionDigits: 0
  }).format(Number(value) || 0);
}

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

/* =========================================================
   6. GOOGLE SHEETS CSV PARSING
   ========================================================= */

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i++;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(cell);
      cell = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i++;

      row.push(cell);

      if (row.some(value => value !== '')) {
        rows.push(row);
      }

      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }

  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

function normalize(rows) {
  if (!rows.length) return [];

  const headers = rows[0].map(value => value.trim().toLowerCase());
  const indexOf = name => headers.indexOf(name.toLowerCase());

  const columns = {
    sku: indexOf('sku'),
    short: indexOf('nama pendek'),
    image: indexOf('images'),
    notes: indexOf('notes'),
    price: indexOf('regular price'),
    name: indexOf('name'),
    variation: indexOf('variation'),
    category: indexOf('code categorizing')
  };

  if (columns.sku < 0 || columns.price < 0) {
    throw new Error('Required columns SKU and regular price were not found.');
  }

  return rows.slice(1)
    .map(row => ({
      sku: String(row[columns.sku] || '').trim(),
      short: String(row[columns.short] || '').trim(),
      image: String(row[columns.image] || '').trim(),
      notes: String(row[columns.notes] || '').trim(),
      price: Number(
        String(row[columns.price] || '').replace(/[^0-9.-]/g, '')
      ) || 0,
      name: String(row[columns.name] || '').trim(),
      variation: String(row[columns.variation] || '').trim(),
      category: String(
        columns.category >= 0 ? row[columns.category] || '' : ''
      ).trim()
    }))
    .filter(product => product.sku);
}

/* =========================================================
   7. APPS SCRIPT CONNECTION
   ========================================================= */

function jsonp(url, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    const callbackName =
      `centiJsonp_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;

    const script = document.createElement('script');

    const timer = setTimeout(() => {
      finish(new Error('Request timed out'));
    }, timeoutMs);

    function finish(error, data) {
      clearTimeout(timer);
      delete window[callbackName];
      script.remove();

      if (error) reject(error);
      else resolve(data);
    }

    window[callbackName] = data => finish(null, data);
    script.onerror = () => finish(new Error('Could not reach Apps Script'));

    script.src =
      url + (url.includes('?') ? '&' : '?') + 'callback=' + callbackName;

    document.head.appendChild(script);
  });
}

async function fetchCatalogFromGoogleSheets() {
  const freshUrl = `${CSV_URL}&_=${Date.now()}`;

  const response = await fetch(freshUrl, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Google Sheets returned HTTP ${response.status}`);
  }

  const csvText = await response.text();
  const rows = normalize(parseCSV(csvText));

  if (!rows.length) {
    throw new Error('CSV export returned no product rows');
  }

  return rows;
}

function showCatalogStatus(message, isError = false) {
  $('status').textContent = message;
  $('status').classList.toggle('error', isError);
}

function showCachedCatalog(error) {
  const cachedRows = readStorage(CONFIG.cacheKey, null);

  if (!Array.isArray(cachedRows) || !cachedRows.length) {
    return false;
  }

  products = cachedRows;

  showCatalogStatus(
    `${t('usingSavedCatalog')} (${products.length.toLocaleString('id-ID')} ${t('products')}). ` +
    `${t('refreshFailed')}: ${error.message}`,
    true
  );

  renderProducts();
  return true;
}

async function loadCatalog(options = {}) {
  const { silent = false } = options;

  if (catalogRequest) {
    return catalogRequest;
  }

  catalogRequest = (async () => {
    const refreshButton = $('refreshBtn');

    if (!silent) {
      showCatalogStatus(t('connectingSheets'));
    }

    if (refreshButton) {
      refreshButton.disabled = true;
    }

    try {
      let rows;

      rows = await fetchCatalogFromGoogleSheets();

      products = rows;
      writeStorage(CONFIG.cacheKey, products);

      showCatalogStatus(
        `${products.length.toLocaleString('id-ID')} ${t('productsLoaded')}` +
        `${navigator.onLine ? '' : ' · ' + t('offline')}`
      );

      renderProducts();
      return true;

    } catch (error) {
      console.error('Catalog refresh failed:', error);

      const usedCache = showCachedCatalog(error);

      if (!usedCache) {
        showCatalogStatus(
          `${t('couldNotLoad')}: ${error.message}`,
          true
        );
        $('resultCount').textContent = t('catalogUnavailable');
      }

      return false;

    } finally {
      if (refreshButton) {
        refreshButton.disabled = false;
      }

      catalogRequest = null;
    }
  })();

  return catalogRequest;
}

function startAutomaticRefresh() {
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }

  refreshTimer = setInterval(() => {
    if (document.hidden || !navigator.onLine) return;
    loadCatalog({ silent: true });
  }, CONFIG.refreshInterval);
}

/* =========================================================
   9. SEARCH RESULTS AND REFINEMENT
   ========================================================= */

function resultLabel(result, list) {
  const count = list.length.toLocaleString('id-ID');

  if (!result) {
    return `${t('showingFirst')} ${list.length} ${t('of')} ` +
      `${CentiSearch.count().toLocaleString('id-ID')} ${t('products')}`;
  }

  if (result.mode === 'corrected') {
    return `${count} ${t('matching')} “${result.corrected}” (${t('spellingCorrected')})`;
  }

  if (result.mode === 'partial') {
    return `${t('noEveryWord')} · ${count} ${t('closest')}`;
  }

  if (result.mode === 'full') {
    return `${count} ${t('matching')} (${t('fullTitle')})`;
  }

  if (result.mode === 'ranked') {
    return `${count} ${t('products')} · ${t('ranked')}`;
  }

  return `${count} ${t('matching')}`;
}

function renderRefine(result) {
  let box = $('refineChips');

  if (!box) {
    box = document.createElement('div');
    box.id = 'refineChips';
    box.className = 'refine-chips';
    box.style.cssText =
      'display:flex;flex-wrap:wrap;gap:6px;margin:8px 0';

    $('resultCount').insertAdjacentElement('afterend', box);
  }

  box.innerHTML = '';

  if (!result) return;

  CentiSearch.refine(result).forEach(chip => {
    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'refine-chip';
    button.textContent = chip.label;
    button.style.cssText =
      'border:1px solid currentColor;border-radius:999px;' +
      'padding:4px 10px;background:transparent;color:inherit;' +
      'font:inherit;font-size:.85em;cursor:pointer;opacity:.85';

    button.onclick = () => {
      const input = $('searchInput');
      input.value = (input.value.trim() + ' ' + chip.add).trim();

      window.scrollTo({ top: 0, behavior: 'smooth' });

      previousSearchQuery = input.value.trim();
      renderProducts();
      input.focus();
    };

    box.appendChild(button);
  });
}

/* =========================================================
   10. PRODUCT RENDERING
   ========================================================= */

function renderProducts() {
  const query = $('searchInput').value.trim();

  CentiSearch.ensure(products);

  const result = query ? CentiSearch.search(query) : null;
  const list = result ? result.items : CentiSearch.browse(80);

  $('resultCount').textContent = resultLabel(result, list);
  renderRefine(result);

  const host = $('productList');

  host.innerHTML = list.slice(0, 160).map(product => `
    <article class="product-card">
      <div class="media">
        ${
          product.image
            ? `<img
                class="product-image"
                src="${esc(product.image)}"
                loading="lazy"
                referrerpolicy="no-referrer"
                onerror="this.outerHTML='<div class=&quot;image-placeholder&quot;>▧</div>'"
              >`
            : `<div class="image-placeholder">▧</div>`
        }
      </div>

      <div class="product-info">
        <div class="product-name">
          ${esc(product.short || product.name || product.sku)}
        </div>

        <div class="product-sku">${t('sku')}: ${esc(product.sku)}</div>

        <div class="product-variation">
          ${esc(product.variation || product.notes || '')}
        </div>

        <div class="product-price">${money(product.price)}</div>

        <button class="add-button" data-add="${esc(product.sku)}">
          ＋ ${t('addToCart')}
        </button>
      </div>
    </article>
  `).join('');

  $('emptyState').classList.toggle('hidden', list.length !== 0);

  if (list.length > 160) {
    showCatalogStatus(t('first160'));
  }

  host.querySelectorAll('[data-add]').forEach(button => {
    button.addEventListener('click', () => {
      openQuantitySelector(button.dataset.add);
    });
  });
}

/* =========================================================
   11. PRODUCT QUANTITY SELECTOR
   ========================================================= */

function openQuantitySelector(sku) {
  const product = products.find(item => item.sku === sku);
  if (!product) return;

  selectedProduct = product;

  $('quantityProductName').textContent =
    product.short || product.name || product.sku;

  $('quantityProductSku').textContent = `${t('sku')}: ${product.sku}`;
  $('quantityProductPrice').textContent = money(product.price);
  $('productQuantity').value = 1;

  const image = $('quantityImage');
  const placeholder = $('quantityImagePlaceholder');

  if (product.image) {
    image.src = product.image;
    image.alt = product.short || product.name || product.sku;
    image.classList.remove('hidden');
    placeholder.classList.add('hidden');

    image.onerror = () => {
      image.classList.add('hidden');
      placeholder.classList.remove('hidden');
    };
  } else {
    image.removeAttribute('src');
    image.classList.add('hidden');
    placeholder.classList.remove('hidden');
  }

  updateQuantitySubtotal();

  $('quantityOverlay').classList.remove('hidden');
  $('quantityPanel').classList.remove('hidden');
}

function closeQuantitySelector() {
  $('quantityOverlay').classList.add('hidden');
  $('quantityPanel').classList.add('hidden');
  selectedProduct = null;
}

function updateQuantitySubtotal() {
  if (!selectedProduct) return;

  const rawValue = $('productQuantity').value;

  if (rawValue === '') {
    $('quantitySubtotal').textContent = money(0);
    return;
  }

  const quantity = Math.max(
    0,
    Math.floor(Number(rawValue) || 0)
  );

  $('quantitySubtotal').textContent =
    money(selectedProduct.price * quantity);
}

function confirmAddToCart() {
  if (!selectedProduct) return;

  const quantity = Math.max(
    1,
    Math.floor(Number($('productQuantity').value) || 1)
  );

  const sku = selectedProduct.sku;

  addToCart(sku, quantity);
  closeQuantitySelector();

  showToast(`${t('added')} ${quantity} × ${sku} ${t('toCart')}`);
}

/* =========================================================
   12. SHOPPING CART
   ========================================================= */

function addToCart(sku, quantity = 1) {
  const product = products.find(item => item.sku === sku);
  if (!product) return;

  quantity = Math.max(1, Math.floor(Number(quantity) || 1));

  cart[sku] ??= {
    sku: product.sku,
    name: product.short || product.name,
    price: product.price,
    image: product.image || '',
    qty: 0
  };

  cart[sku].image = product.image || cart[sku].image || '';
  cart[sku].qty += quantity;

  saveCart();
}

function saveCart() {
  writeStorage(CONFIG.cartKey, cart);
  updateCartBadge();
  renderCart();
}

function cartValues() {
  return Object.values(cart).filter(item => item.qty > 0);
}

function updateCartBadge() {
  const count = cartValues().reduce((sum, item) => sum + item.qty, 0);

  $('cartCount').textContent = count;
  $('navCartCount').textContent = count;
}

function renderCart() {
  const items = cartValues();

  $('cartSubtitle').textContent =
    `${items.length} ${t('differentProducts')}`;

  $('cartItems').innerHTML = items.length
    ? items.map(item => {
        const product = products.find(p => p.sku === item.sku);
        const image = item.image || product?.image || '';

        return `
          <div class="cart-row">
            <div class="cart-row-main">
              ${
                image
                  ? `<img
                      class="cart-product-image"
                      src="${esc(image)}"
                      alt="${esc(item.name)}"
                      loading="lazy"
                      referrerpolicy="no-referrer"
                      onerror="this.outerHTML='<div class=&quot;cart-image-placeholder&quot;>▧</div>'"
                    >`
                  : `<div class="cart-image-placeholder">▧</div>`
              }

              <div class="cart-product-info">
                <strong>${esc(item.name)}</strong>
                <small>${t('sku')}: ${esc(item.sku)} · ${money(item.price)} ${t('each')}</small>

                <div class="qty-control">
                  <button data-minus="${esc(item.sku)}">−</button>

                  <input
                    data-qty="${esc(item.sku)}"
                    type="number"
                    min="1"
                    step="1"
                    value="${item.qty}"
                  >

                  <button data-plus="${esc(item.sku)}">＋</button>

                  <button class="remove-button" data-remove="${esc(item.sku)}">
                    ${t('remove')}
                  </button>
                </div>
              </div>
            </div>

            <div class="cart-row-price">
              ${money(item.price * item.qty)}
            </div>
          </div>
        `;
      }).join('')
    : `
      <div class="empty">
        <strong>${t('emptyCartTitle')}</strong>
        <span>${t('emptyCartText')}</span>
      </div>
    `;

  $('cartTotal').textContent = money(
    items.reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  $('sendOrder').disabled = !items.length;
  $('emptyCart').disabled = !items.length;

  $('cartItems').querySelectorAll('[data-minus]').forEach(button => {
    button.onclick = () => changeQty(button.dataset.minus, -1);
  });

  $('cartItems').querySelectorAll('[data-plus]').forEach(button => {
    button.onclick = () => changeQty(button.dataset.plus, 1);
  });

  $('cartItems').querySelectorAll('[data-remove]').forEach(button => {
    button.onclick = () => {
      delete cart[button.dataset.remove];
      saveCart();
    };
  });

  $('cartItems').querySelectorAll('[data-qty]').forEach(input => {
    input.onchange = () => {
      const quantity = Math.max(1, Math.floor(Number(input.value) || 1));
      cart[input.dataset.qty].qty = quantity;
      saveCart();
    };
  });
}

function changeQty(sku, difference) {
  if (!cart[sku]) return;

  cart[sku].qty += difference;

  if (cart[sku].qty <= 0) {
    delete cart[sku];
  }

  saveCart();
}

function emptyCart() {
  if (!cartValues().length) return;

  if (!confirm(t('confirmEmpty'))) {
    return;
  }

  cart = {};
  saveCart();
  showToast(t('cartEmptied'));
}

/* =========================================================
   13. WHATSAPP ORDER
   ========================================================= */

function orderText() {
  const items = cartValues();

  const id = 'CAT-' +
    new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const lines = [
    `New Order: ${id}`,
    '---------------------------------',
    'Pelanggan: Catalog Order',
    'No : Mobile Catalog',
    '',
    'Pesanan :'
  ];

  for (const item of items) {
    lines.push(
      '',
      `${item.qty}x ${item.name}`,
      `  SKU: ${item.sku}`,
      `  Price: ${money(item.price)}`
    );
  }

  lines.push('', `Total : ${money(total)}`);

  return {
    id,
    text: lines.join('\n'),
    items,
    total,
  };
}

function sendOrder() {
  const items = cartValues();
  if (!items.length) return;

  const number = String(CONFIG.whatsappNumber || '').replace(/\D/g, '');
  if (!number || number.includes('XXXXXXXX')) {
    showToast(currentLanguage === 'id'
      ? 'Nomor WhatsApp CS belum diatur.'
      : 'CS WhatsApp number has not been configured.');
    return;
  }

  const text = orderText().text;
  const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  showToast(currentLanguage === 'id'
    ? 'WhatsApp dibuka. Keranjang tetap tersimpan.'
    : 'WhatsApp opened. Your cart is unchanged.');
}

/* =========================================================
   14. PANELS AND NOTIFICATIONS
   ========================================================= */

function openCart() {
  $('cartOverlay').classList.remove('hidden');
  $('cartPanel').classList.add('open');
  $('cartPanel').setAttribute('aria-hidden', 'false');
}

function closeCart() {
  $('cartOverlay').classList.add('hidden');
  $('cartPanel').classList.remove('open');
  $('cartPanel').setAttribute('aria-hidden', 'true');
}

function showToast(message) {
  $('toast').textContent = message;
  $('toast').classList.add('show');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    $('toast').classList.remove('show');
  }, 2600);
}

/* =========================================================
   15. EVENT LISTENERS
   ========================================================= */

function bindEvents() {
  const menuButton = $('headerMenuButton');
  const menu = $('headerMenu');

  menuButton.onclick = event => {
    event.stopPropagation();

    const isOpen = !menu.classList.contains('hidden');

    menu.classList.toggle('hidden', isOpen);
    menuButton.setAttribute('aria-expanded', String(!isOpen));
  };

  document.addEventListener('click', event => {
    if (!event.target.closest('.header-menu')) {
      menu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });

  const languageSelect = $('languageSelect');

  if (languageSelect) {
    languageSelect.addEventListener('change', event => {
      currentLanguage = event.target.value === 'id' ? 'id' : 'en';

      try {
        localStorage.setItem(LANGUAGE_KEY, currentLanguage);
      } catch (error) {
        console.warn('Could not save language preference:', error);
      }

      applyLanguage();
    });
  }

  $('searchInput').addEventListener('input', () => {
    clearTimeout(searchTimer);

    const query = $('searchInput').value.trim();

    if (query && !previousSearchQuery) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    previousSearchQuery = query;

    searchTimer = setTimeout(renderProducts, 120);
  });

  $('clearSearch').onclick = () => {
    $('searchInput').value = '';
    previousSearchQuery = '';
    renderProducts();
    $('searchInput').focus();
  };

  $('refreshBtn').onclick = () => loadCatalog();

  $('closeQuantity').onclick = closeQuantitySelector;
  $('quantityOverlay').onclick = closeQuantitySelector;

  $('quantityMinus').onclick = () => {
    const input = $('productQuantity');
    input.value = Math.max(1, Number(input.value || 1) - 1);
    updateQuantitySubtotal();
  };

  $('quantityPlus').onclick = () => {
    const input = $('productQuantity');
    input.value = Math.max(1, Number(input.value || 1) + 1);
    updateQuantitySubtotal();
  };

  $('productQuantity').addEventListener('input', updateQuantitySubtotal);

  $('productQuantity').addEventListener('focus', event => {
    event.target.value = '';
    updateQuantitySubtotal();
  });

  $('productQuantity').addEventListener('blur', () => {
    const input = $('productQuantity');

    input.value = Math.max(
      1,
      Math.floor(Number(input.value) || 1)
    );

    updateQuantitySubtotal();
  });

  $('confirmAddToCart').onclick = confirmAddToCart;

  $('cartTop').onclick = openCart;
  $('navCart').onclick = openCart;

  $('navCatalog').onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  $('closeCart').onclick = closeCart;
  $('cartOverlay').onclick = closeCart;

  $('sendOrder').onclick = sendOrder;


  $('emptyCart').onclick = emptyCart;



}

/* =========================================================
   16. APP STARTUP
   ========================================================= */

function initializeApp() {
  bindEvents();
  applyLanguage();

  updateCartBadge();
  renderCart();

  CentiSearch.loadRules('./search-rules.json')
    .then(() => {
      if (products.length) renderProducts();
    })
    .catch(error => {
      console.error('Could not load search rules:', error);
    });

  loadCatalog();

  window.addEventListener('pageshow', event => {
    if (event.persisted && navigator.onLine) {
      loadCatalog({ silent: true });
    }
  });

  startAutomaticRefresh();

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && navigator.onLine) {
      loadCatalog({ silent: true });
    }
  });

  window.addEventListener('online', () => {
    loadCatalog({ silent: true });
  });

  if ('serviceWorker' in navigator) {
    let refreshing = false;
    let swRegistration;

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;

      refreshing = true;
      window.location.reload();
    });

    async function checkForUpdates() {
      if (!navigator.onLine || !swRegistration) return;

      try {
        await swRegistration.update();
      } catch (error) {
        console.log('Update check failed:', error);
      }
    }

    navigator.serviceWorker.register('./sw.js', {
      updateViaCache: 'none'
    })
      .then(registration => {
        swRegistration = registration;
        checkForUpdates();

        setInterval(checkForUpdates, 60 * 1000);

        window.addEventListener('pageshow', checkForUpdates);
        window.addEventListener('focus', checkForUpdates);

        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            checkForUpdates();
          }
        });

        window.addEventListener('online', checkForUpdates);
      })
      .catch(error => {
        console.error('Service worker registration failed:', error);
      });
  }
}

initializeApp();
