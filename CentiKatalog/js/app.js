
'use strict';

/* =========================================================
   1. CONFIGURATION
   ========================================================= */

const CONFIG = {
  spreadsheetId: '1wTJRGfmdAARp9d_qNNQ1UUUssuNo5p9tarxPiYllGLo',
  gid: '0',
  currency: 'IDR',
  cacheKey: 'centi_catalog_rows_v1',
  cartKey: 'centi_catalog_cart_v1',
  settingsKey: 'centi_catalog_settings_v1',
  identityKey: 'centi_catalog_requester_v1',
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
    connectionSettings: '⚙ Connection settings',
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
    destinationPC: 'Destination PC',
    selectPC: 'Select PC',
    customerType: 'Customer type',
    selectCustomer: 'Select customer',
    sendToPC: 'Send to PC',
    selectPCFirst: 'Select a PC first',
    sendTelegram: 'Send to Telegram',
    copyOrder: 'Copy order text',
    emptyCart: 'Empty cart',
    remove: 'Remove',
    emptyCartTitle: 'Your cart is empty',
    emptyCartText: 'Add products from the catalog.',
    saveSettings: 'Save settings',
    appsScriptURL: 'Apps Script Web App URL',
    orderPIN: 'Order access PIN',
    userSelect: 'Select name',
    changeUser: 'Change user',
    requesterTitle: 'Who is using this device?',
    requesterPrompt: 'Select your name before creating an order.',
    added: 'Added',
    toCart: 'to cart',
    cartEmptied: 'Cart emptied',
    confirmEmpty: 'Are you sure you want to remove all products from your cart?',
    selectName: 'Select your name before sending an order',
    selectCustomerFirst: 'Please select a customer type',
    selectDestination: 'Please select a destination PC',
    setURL: 'Set your Apps Script URL first',
    enterPIN: 'Enter the order access PIN',
    orderTooLong: 'Order is too long. Copy it instead.',
    telegramTooLong: 'Order is too long for the secure bot request. Copy it instead.',
    confirmTelegram: 'CONFIRM TELEGRAM ORDER',
    confirmPC: 'CONFIRM PC ORDER',
    destination: 'Destination',
    listenerID: 'Listener ID',
    confirmSend: 'Are you sure you want to send this order?',
    sending: 'Sending…',
    sendingPC: 'Sending to PC…',
    sentTelegram: 'Order sent to Telegram',
    sentToPC: 'Order sent to',
    orderCopied: 'Order copied',
    copyUnavailable: 'Clipboard unavailable in this browser',
    settingsSaved: 'Settings saved',
    orderFailed: 'Send failed',
    routingFailed: 'PC routing failed',
    catalogUnavailable: 'Catalog unavailable',
    first160: 'Showing first 160 matches. Refine your search to narrow results.',
    close: 'Close',
    sku: 'SKU',
    each: 'each',
    productsLoaded: 'products loaded',
    offline: 'offline',
    unknownPC: 'Unknown PC',
    telegramRejected: 'Telegram rejected the order',
    pcFailed: 'PC routing failed',
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
    sendFailedCopy: 'You can copy the order instead.',
    sentTo: 'Order sent to'
  },

  id: {
    connectionSettings: '⚙ Pengaturan koneksi',
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
    destinationPC: 'PC Tujuan',
    selectPC: 'Pilih PC',
    customerType: 'Jenis pelanggan',
    selectCustomer: 'Pilih pelanggan',
    sendToPC: 'Kirim ke PC',
    selectPCFirst: 'Pilih PC terlebih dahulu',
    sendTelegram: 'Kirim ke Telegram',
    copyOrder: 'Salin teks pesanan',
    emptyCart: 'Kosongkan keranjang',
    remove: 'Hapus',
    emptyCartTitle: 'Keranjang masih kosong',
    emptyCartText: 'Tambahkan produk dari katalog.',
    saveSettings: 'Simpan pengaturan',
    appsScriptURL: 'URL Apps Script Web App',
    orderPIN: 'PIN akses pesanan',
    userSelect: 'Pilih nama',
    changeUser: 'Ganti pengguna',
    requesterTitle: 'Siapa yang menggunakan perangkat ini?',
    requesterPrompt: 'Pilih nama Anda sebelum membuat pesanan.',
    added: 'Ditambahkan',
    toCart: 'ke keranjang',
    cartEmptied: 'Keranjang dikosongkan',
    confirmEmpty: 'Yakin ingin menghapus semua produk dari keranjang?',
    selectName: 'Pilih nama Anda sebelum mengirim pesanan',
    selectCustomerFirst: 'Silakan pilih jenis pelanggan',
    selectDestination: 'Silakan pilih PC tujuan',
    setURL: 'Masukkan URL Apps Script terlebih dahulu',
    enterPIN: 'Masukkan PIN akses pesanan',
    orderTooLong: 'Pesanan terlalu panjang. Silakan salin teks pesanan.',
    telegramTooLong: 'Pesanan terlalu panjang untuk dikirim melalui bot. Silakan salin teks pesanan.',
    confirmTelegram: 'KONFIRMASI PESANAN TELEGRAM',
    confirmPC: 'KONFIRMASI PESANAN KE PC',
    destination: 'Tujuan',
    listenerID: 'ID Listener',
    confirmSend: 'Apakah Anda yakin ingin mengirim pesanan ini?',
    sending: 'Mengirim…',
    sendingPC: 'Mengirim ke PC…',
    sentTelegram: 'Pesanan terkirim ke Telegram',
    sentToPC: 'Pesanan terkirim ke',
    orderCopied: 'Pesanan berhasil disalin',
    copyUnavailable: 'Clipboard tidak tersedia di browser ini',
    settingsSaved: 'Pengaturan berhasil disimpan',
    orderFailed: 'Pengiriman gagal',
    routingFailed: 'Pengiriman ke PC gagal',
    catalogUnavailable: 'Katalog tidak tersedia',
    first160: 'Menampilkan 160 hasil pertama. Persempit pencarian Anda.',
    close: 'Tutup',
    sku: 'SKU',
    each: 'per item',
    productsLoaded: 'produk dimuat',
    offline: 'offline',
    unknownPC: 'PC tidak dikenal',
    telegramRejected: 'Telegram menolak pesanan',
    pcFailed: 'Pengiriman ke PC gagal',
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
    sendFailedCopy: 'Anda dapat menyalin teks pesanan.',
    sentTo: 'Pesanan terkirim ke'
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

  $('settingsButton').textContent = t('connectionSettings');
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

  document.querySelector('label[for="listenerDestination"]').textContent =
    t('destinationPC');

  document.querySelector('label[for="customerType"]').textContent =
    t('customerType');

  $('listenerDestination').options[0].textContent = t('selectPC');
  $('customerType').options[0].textContent = t('selectCustomer');

  $('sendOrder').textContent = t('sendTelegram');
  $('copyOrder').textContent = t('copyOrder');
  $('emptyCart').textContent = t('emptyCart');
  $('saveSettings').textContent = t('saveSettings');

  const settingsLabels = $('settingsPanel').querySelectorAll('label');
  if (settingsLabels[0]) {
    settingsLabels[0].childNodes[0].textContent = t('appsScriptURL');
  }
  if (settingsLabels[1]) {
    settingsLabels[1].childNodes[0].textContent = t('orderPIN');
  }

  updateRequesterBadge();
  renderProducts();
  renderCart();
  updatePCButton();
}

/* =========================================================
   3. STATE AND STORAGE
   ========================================================= */

const CSV_URL =
  `https://docs.google.com/spreadsheets/d/${CONFIG.spreadsheetId}/export?format=csv&gid=${CONFIG.gid}`;

let products = [];
let cart = readStorage(CONFIG.cartKey, {});
let settings = readStorage(CONFIG.settingsKey, {});
let toastTimer;
let searchTimer;
let refreshTimer = null;
let catalogRequest = null;
let selectedProduct = null;
let requesterName = readStorage(CONFIG.identityKey, '');
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

const REQUESTER_NAMES = [
  'Ye', 'Amin', 'Lukman', 'Resti', 'Bangkit', 'Arif',
  'Raga', 'Rauf', 'Budi', 'Frisky', 'Yudi', 'Serli'
];

function showRequesterPrompt() {
  let overlay = $('requesterIdentityOverlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'requesterIdentityOverlay';

    overlay.style.cssText = `
      position:fixed;inset:0;z-index:999999;
      display:none;align-items:center;justify-content:center;
      padding:20px;background:rgba(0,0,0,.72);
      font-family:Arial,sans-serif;
    `;

    overlay.innerHTML = `
      <section style="
        width:min(420px,100%);max-height:85vh;overflow:auto;
        padding:22px;background:#fff;color:#222;border-radius:14px;
        box-sizing:border-box
      ">
        <h2>${t('requesterTitle')}</h2>
        <p>${t('requesterPrompt')}</p>
        <div style="
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:9px;
        ">
          ${REQUESTER_NAMES.map(name => `
            <button type="button" data-requester="${esc(name)}"
              style="padding:12px;border:1px solid #ccc;
              border-radius:8px;background:#f7f7f7;
              color:#222;cursor:pointer">
              ${esc(name)}
            </button>
          `).join('')}
        </div>
      </section>
    `;

    document.body.appendChild(overlay);

    overlay.querySelectorAll('[data-requester]').forEach(button => {
      button.addEventListener('click', () => {
        requesterName = button.dataset.requester;
        writeStorage(CONFIG.identityKey, requesterName);
        overlay.style.display = 'none';
        updateRequesterBadge();
      });
    });
  } else {
    const heading = overlay.querySelector('h2');
    const paragraph = overlay.querySelector('p');

    if (heading) heading.textContent = t('requesterTitle');
    if (paragraph) paragraph.textContent = t('requesterPrompt');
  }

  overlay.style.display = 'flex';
}

function updateRequesterBadge() {
  const badge = $('requesterIdentityBadge');
  if (!badge) return;

  badge.textContent = requesterName || t('userSelect');
  badge.title = t('changeUser');
  badge.onclick = showRequesterPrompt;
}

function ensureRequesterIdentity() {
  updateRequesterBadge();

  if (!REQUESTER_NAMES.includes(requesterName)) {
    showRequesterPrompt();
  }
}

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

async function fetchCatalogFromAppsScript() {
  if (!settings.scriptUrl) {
    throw new Error('Apps Script fallback is not configured');
  }

  const data = await jsonp(settings.scriptUrl + '?action=catalog');

  if (!data.ok) {
    throw new Error(data.error || 'Apps Script catalog request failed');
  }

  const rows = data.rows || [];

  if (!rows.length) {
    throw new Error('Apps Script returned no product rows');
  }

  return rows;
}

/* =========================================================
   8. CATALOG LOADING AND AUTOMATIC REFRESH
   ========================================================= */

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

      try {
        rows = await fetchCatalogFromGoogleSheets();
      } catch (sheetsError) {
        console.warn('Google Sheets request failed:', sheetsError);
        rows = await fetchCatalogFromAppsScript();
      }

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
  updatePCButton();
  $('copyOrder').disabled = !items.length;
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
   13. ORDER GENERATION AND TELEGRAM
   ========================================================= */

function getListenerName(listenerId) {
  const names = {
    'CENTI-PC': 'PC DEPAN',
    'CENTI-CS-1': 'BUDI',
    'CENTI-CS-2': 'RAUF',
    'CENTI-SOLO-MEGA': 'SOLO MEGABOOK',
    'FRISKY-PC': 'FRISKY-NITRO'
  };

  return names[listenerId] || t('unknownPC');
}

function updatePCButton() {
  const listenerId = $('listenerDestination').value;
  const customerType = $('customerType').value;
  const button = $('sendToPC');

  button.textContent = listenerId
    ? `${t('sendToPC')} · ${getListenerName(listenerId)}`
    : t('selectPCFirst');

  button.disabled =
    !listenerId ||
    !customerType ||
    !cartValues().length;
}

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
    `Requested by: ${requesterName || 'Unknown'}`,
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
    requesterName
  };
}

async function sendOrder() {
  if (!REQUESTER_NAMES.includes(requesterName)) {
    showRequesterPrompt();
    showToast(t('selectName'));
    return;
  }

  const order = orderText();
  const customerType = $('customerType').value;

  if (!customerType) {
    showToast(t('selectCustomerFirst'));
    return;
  }

  order.customerType = customerType;

   await navigator.clipboard.writeText(order.text).catch(error => {
  console.warn('Order clipboard copy failed:', error);
});
   
  if (!confirm(
    t('confirmTelegram') + '\n\n' +
    t('destination') + ': TELEGRAM\n\n' +
    t('confirmSend')
  )) {
    return;
  }

  const url = (settings.scriptUrl || '').trim();
  const pin = (settings.pin || '').trim();

  if (!url) {
    openSettings();
    showToast(t('setURL'));
    return;
  }

  if (!pin) {
    openSettings();
    showToast(t('enterPIN'));
    return;
  }

  if (order.text.length > 1500) {
    showToast(t('telegramTooLong'));
    return;
  }

  const button = $('sendOrder');
  button.disabled = true;
  button.textContent = t('sending');

  try {
    const query = new URLSearchParams({
      action: 'order',
      pin,
      payload: JSON.stringify(order)
    });

    const result = await jsonp(url + '?' + query.toString(), 30000);

    if (!result.ok) {
      throw new Error(result.error || t('telegramRejected'));
    }

    showToast(t('sentTelegram'));

    cart = {};
    saveCart();
    closeCart();

  } catch (error) {
    showToast(`${t('orderFailed')}: ${error.message}. ${t('sendFailedCopy')}`);
  } finally {
    button.disabled = false;
    button.textContent = t('sendTelegram');
  }
}

async function sendToPC() {
  if (!REQUESTER_NAMES.includes(requesterName)) {
    showRequesterPrompt();
    showToast(t('selectName'));
    return;
  }

  const order = orderText();
  const customerType = $('customerType').value;

  if (!customerType) {
    showToast(t('selectCustomerFirst'));
    return;
  }

  order.customerType = customerType;
   await navigator.clipboard.writeText(order.text).catch(error => {
  console.warn('Order clipboard copy failed:', error);
});

  const url = (settings.scriptUrl || '').trim();
  const pin = (settings.pin || '').trim();
  const listenerId = $('listenerDestination').value;

  if (!url) {
    openSettings();
    showToast(t('setURL'));
    return;
  }

  if (!pin) {
    openSettings();
    showToast(t('enterPIN'));
    return;
  }

  if (!listenerId) {
    showToast(t('selectDestination'));
    return;
  }

  const destinationName = getListenerName(listenerId);

  if (!confirm(
    t('confirmPC') + '\n\n' +
    t('destination') + ': ' + destinationName + '\n' +
    t('listenerID') + ': ' + listenerId + '\n\n' +
    t('confirmSend')
  )) {
    return;
  }

  if (order.text.length > 1500) {
    showToast(t('orderTooLong'));
    return;
  }

  const button = $('sendToPC');
  button.disabled = true;
  button.textContent = t('sendingPC');

  try {
    const query = new URLSearchParams({
      action: 'route',
      pin,
      listenerId,
      payload: JSON.stringify(order)
    });

    const result = await jsonp(url + '?' + query.toString(), 30000);

    if (!result.ok) {
      throw new Error(result.error || t('pcFailed'));
    }

    showToast(`${t('sentToPC')} ${result.deviceName || destinationName}`);

    cart = {};
    saveCart();
    closeCart();

  } catch (error) {
    showToast(`${t('routingFailed')}: ${error.message}`);
  } finally {
    button.disabled = false;
    updatePCButton();
  }
}

async function copyOrder() {
  try {
    await navigator.clipboard.writeText(orderText().text);
    showToast(t('orderCopied'));
  } catch {
    showToast(t('copyUnavailable'));
  }
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

function openSettings() {
  $('settingsOverlay').classList.remove('hidden');
  $('settingsPanel').classList.remove('hidden');

  $('scriptUrl').value = settings.scriptUrl || '';
  $('orderPin').value = settings.pin || '';
}

function closeSettings() {
  $('settingsOverlay').classList.add('hidden');
  $('settingsPanel').classList.add('hidden');
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
  $('sendToPC').onclick = sendToPC;

  $('listenerDestination').addEventListener('change', updatePCButton);
  $('customerType').addEventListener('change', updatePCButton);

  $('copyOrder').onclick = copyOrder;
  $('emptyCart').onclick = emptyCart;

  $('settingsButton').onclick = () => {
    $('headerMenu').classList.add('hidden');
    $('headerMenuButton').setAttribute('aria-expanded', 'false');
    openSettings();
  };

  $('closeSettings').onclick = closeSettings;
  $('settingsOverlay').onclick = closeSettings;

  $('saveSettings').onclick = () => {
    settings = {
      scriptUrl: $('scriptUrl').value.trim(),
      pin: $('orderPin').value.trim()
    };

    writeStorage(CONFIG.settingsKey, settings);
    closeSettings();
    showToast(t('settingsSaved'));
  };
}

/* =========================================================
   16. APP STARTUP
   ========================================================= */

function initializeApp() {
  bindEvents();
  applyLanguage();
  ensureRequesterIdentity();

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
