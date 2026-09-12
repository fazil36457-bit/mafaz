/* ============================================================
   JAN — Full Application JavaScript
   Auth | Session | Cart | Buy-Again | Qty | Filters
   ============================================================ */

'use strict';

/* ═══════════════════════════════════════════
   PRODUCT DATABASE
═══════════════════════════════════════════ */
const PRODUCTS = [
  { id:'p1',  name:'Aashirvaad Atta 10kg',       brand:'Aashirvaad', category:'grocery',       price:420,  oldPrice:460, moq:10, rating:4.8, reviews:2341, img:'assets/images/products/atta.jpg' },
  { id:'p2',  name:'Soft Drink Cans 250ml',       brand:'CoolDrink',  category:'beverages',     price:18,   oldPrice:22,  moq:24, rating:4.6, reviews:1823, img:'assets/images/products/cola.jpg' },
  { id:'p3',  name:'Soap Bar 125g Pack',           brand:'CleanCare',  category:'fmcg',          price:95,   oldPrice:105, moq:48, rating:4.7, reviews:3102, img:'assets/images/products/soap.jpg' },
  { id:'p4',  name:'Classic Salted Chips 150g',   brand:'CrunchBite', category:'snacks',        price:10,   oldPrice:13,  moq:60, rating:4.5, reviews:4201, img:'assets/images/products/chips.jpg' },
  { id:'p5',  name:'Toothpaste Daily Care 120g',  brand:'DentaGlow',  category:'fmcg',          price:112,  oldPrice:130, moq:24, rating:4.8, reviews:5610, img:'assets/images/products/toothpaste.jpg' },
  { id:'p6',  name:'Instant Coffee Premium 200g', brand:'AromaGold',  category:'beverages',     price:35,   oldPrice:42,  moq:24, rating:4.9, reviews:1298, img:'assets/images/products/coffee.jpg' },
  { id:'p7',  name:'Basmati Rice 5kg Bag',        brand:'RoyalGrain', category:'grocery',       price:125,  oldPrice:145, moq:20, rating:4.7, reviews:3890, img:'assets/images/products/rice.jpg' },
  { id:'p8',  name:'Dishwash Liquid 500ml',       brand:'PureLine',   category:'cleaning',      price:45,   oldPrice:55,  moq:24, rating:4.6, reviews:2109, img:'assets/images/products/dishwash.jpg' },
  { id:'p9',  name:'Premium Shampoo 500ml',       brand:'AuroraHair', category:'personal-care', price:175,  oldPrice:199, moq:24, rating:4.8, reviews:1876, img:'assets/images/products/shampoo.jpg' },
  { id:'p10', name:'Toned Milk 500ml Pouches',    brand:'DairyFresh', category:'dairy',         price:28,   oldPrice:0,   moq:48, rating:4.9, reviews:6720, img:'assets/images/products/milk.jpg' },
  { id:'p11', name:'Butter Biscuits 150g',        brand:'GoldenBake', category:'snacks',        price:12,   oldPrice:16,  moq:48, rating:4.6, reviews:3310, img:'assets/images/products/biscuits.jpg' },
  { id:'p12', name:'Sunflower Cooking Oil 1L',    brand:'SunGold',    category:'grocery',       price:160,  oldPrice:185, moq:24, rating:4.7, reviews:4430, img:'assets/images/products/oil.jpg' },
];

/* ═══════════════════════════════════════════
   AUTH SYSTEM
═══════════════════════════════════════════ */
const Auth = {
  SESSION_KEY: 'jan_user',

  get() {
    try { return JSON.parse(localStorage.getItem(this.SESSION_KEY)); }
    catch { return null; }
  },

  login(data) {
    const user = { ...data, loginAt: Date.now(), orders: data.orders || 0, totalSaved: data.totalSaved || 0 };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    location.reload();
  },

  isLoggedIn() { return !!this.get(); },

  updateStats(ordersAdd = 0, savedAdd = 0) {
    const u = this.get();
    if (!u) return;
    u.orders = (u.orders || 0) + ordersAdd;
    u.totalSaved = (u.totalSaved || 0) + savedAdd;
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(u));
  }
};

/* ═══════════════════════════════════════════
   CART
═══════════════════════════════════════════ */
const Cart = {
  KEY: 'jan_cart',

  get() { try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); } catch { return []; } },

  save(items) { localStorage.setItem(this.KEY, JSON.stringify(items)); updateCartBadge(); },

  add(product, qty) {
    const items = this.get();
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ ...product, qty });
    }
    this.save(items);
  },

  remove(id) {
    this.save(this.get().filter(i => i.id !== id));
  },

  updateQty(id, qty) {
    const items = this.get();
    const item = items.find(i => i.id === id);
    if (item) { item.qty = Math.max(item.moq || 10, qty); }
    this.save(items);
  },

  total() {
    return this.get().reduce((s, i) => s + i.price * i.qty, 0);
  },

  count() {
    return this.get().reduce((s, i) => s + i.qty, 0);
  },

  clear() { this.save([]); }
};

/* ═══════════════════════════════════════════
   PURCHASE HISTORY
═══════════════════════════════════════════ */
const PurchaseHistory = {
  KEY: 'jan_purchases',

  get() { try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); } catch { return []; } },

  save(orders) { localStorage.setItem(this.KEY, JSON.stringify(orders)); },

  addOrder(items, total) {
    const orders = this.get();
    const order = {
      id: 'JAN' + Date.now().toString().slice(-8),
      date: new Date().toISOString(),
      items: items.map(i => ({ ...i })),
      total,
      status: 'processing'
    };
    orders.unshift(order);
    this.save(orders);
    // Simulate delivery status change after 2s demo
    Auth.updateStats(1, items.reduce((s,i) => s + ((i.oldPrice||0)-i.price)*i.qty, 0));
    return order;
  },

  getRecentProducts() {
    const orders = this.get();
    const seen = new Set();
    const products = [];
    for (const order of orders) {
      for (const item of order.items) {
        if (!seen.has(item.id)) {
          seen.add(item.id);
          products.push(item);
        }
      }
    }
    return products;
  }
};

/* ═══════════════════════════════════════════
   UI HELPERS
═══════════════════════════════════════════ */
function updateCartBadge() {
  const count = Cart.count();
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}

let toastTimeout;
function showToast(msg, type = 'success') {
  let t = document.getElementById('global-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'global-toast';
    t.className = 'toast';
    t.innerHTML = `<span class="toast-icon"></span><span class="toast-text"></span><button class="toast-close" onclick="document.getElementById('global-toast').classList.remove('show')">✕</button>`;
    document.body.appendChild(t);
  }
  t.querySelector('.toast-icon').textContent = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  t.querySelector('.toast-text').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.remove('show'), 3500);
}

function hideToast() {
  document.getElementById('global-toast')?.classList.remove('show');
}

/* ═══════════════════════════════════════════
   AUTH MODAL
═══════════════════════════════════════════ */
function openAuthModal(tab = 'login') {
  const overlay = document.getElementById('auth-overlay');
  if (!overlay) return;
  overlay.classList.add('open');
  switchAuthTab(tab);
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  document.getElementById('auth-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('login-form-section').style.display = tab === 'login' ? 'flex' : 'none';
  document.getElementById('register-form-section').style.display = tab === 'register' ? 'flex' : 'none';
}

function handleLogin(e) {
  e.preventDefault();
  const mobile = document.getElementById('login-mobile').value.trim();
  const pass   = document.getElementById('login-pass').value;
  if (!mobile || !pass) { showToast('Please fill all fields', 'error'); return; }

  // Check saved user
  const savedUsers = JSON.parse(localStorage.getItem('jan_registered_users') || '[]');
  const found = savedUsers.find(u => u.mobile === mobile && u.password === pass);

  if (found) {
    Auth.login(found);
    closeAuthModal();
    showToast(`Welcome back, ${found.name}! 👋`);
    setTimeout(() => refreshAuthUI(), 100);
  } else {
    showToast('Invalid mobile or password', 'error');
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name   = document.getElementById('reg-name').value.trim();
  const shop   = document.getElementById('reg-shop').value.trim();
  const mobile = document.getElementById('reg-mobile').value.trim();
  const pass   = document.getElementById('reg-pass').value;
  const city   = document.getElementById('reg-city').value.trim();

  if (!name || !mobile || !pass || !shop) { showToast('Please fill all required fields', 'error'); return; }
  if (mobile.length !== 10) { showToast('Enter a valid 10-digit mobile number', 'error'); return; }
  if (pass.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }

  const userData = { name, shopName: shop, mobile, password: pass, city, orders: 0, totalSaved: 0 };

  // Save to registered users store
  const savedUsers = JSON.parse(localStorage.getItem('jan_registered_users') || '[]');
  if (savedUsers.find(u => u.mobile === mobile)) {
    showToast('Account with this mobile already exists', 'error'); return;
  }
  savedUsers.push(userData);
  localStorage.setItem('jan_registered_users', JSON.stringify(savedUsers));

  Auth.login(userData);
  closeAuthModal();
  showToast(`Welcome to Jan, ${name}! 🎉 You got ₹500 credit!`);
  setTimeout(() => refreshAuthUI(), 100);
}

/* ═══════════════════════════════════════════
   AUTH UI REFRESH
═══════════════════════════════════════════ */
function refreshAuthUI() {
  const user = Auth.get();
  const orders = PurchaseHistory.get().length;

  // Sidebar profile
  const sidebar = document.getElementById('sidebar-profile');
  if (sidebar) {
    if (user) {
      sidebar.innerHTML = `
        <div class="profile-logged-in">
          <div class="profile-user-row">
            <div class="profile-avatar">${user.name[0].toUpperCase()}</div>
            <div class="profile-user-info">
              <div class="name">${user.name}</div>
              <div class="role">${user.shopName || 'Shop Owner'}</div>
            </div>
          </div>
          <div class="profile-stats">
            <div class="profile-stat">
              <div class="ps-num">${orders}</div>
              <div class="ps-label">Orders</div>
            </div>
            <div class="profile-stat">
              <div class="ps-num">₹${((user.totalSaved || 0)/100).toFixed(0)}K+</div>
              <div class="ps-label">Saved</div>
            </div>
          </div>
          <div class="sidebar-auth-btns">
            <a href="purchases.html" class="sidebar-btn sidebar-btn-secondary">📦 My Orders</a>
            <button class="sidebar-btn sidebar-btn-danger" onclick="Auth.logout()">↩ Sign Out</button>
          </div>
        </div>`;
    } else {
      sidebar.innerHTML = `
        <div class="profile-guest">
          <div class="profile-greeting">Welcome to Jan</div>
          <div class="profile-name" style="color:rgba(255,255,255,0.7);font-size:14px">Sign in for the best<br>wholesale prices</div>
          <div class="sidebar-auth-btns" style="margin-top:8px">
            <button class="sidebar-btn sidebar-btn-primary" onclick="openAuthModal('login')">🔐 Sign In</button>
            <button class="sidebar-btn sidebar-btn-secondary" onclick="openAuthModal('register')">✨ Register Free</button>
          </div>
          <div class="auth-benefits" style="margin-top:10px">
            <div class="auth-benefit"><span class="icon">✓</span> ₹500 credit on first order</div>
            <div class="auth-benefit"><span class="icon">✓</span> 30-day buy now, pay later</div>
            <div class="auth-benefit"><span class="icon">✓</span> Track your orders easily</div>
          </div>
        </div>`;
    }
  }

  // Nav display
  const navUser = document.getElementById('nav-user-widget');
  if (navUser) {
    if (user) {
      navUser.innerHTML = `
        <div class="nav-user-display" onclick="openAuthModal('login')">
          <div class="nav-user-avatar">${user.name[0].toUpperCase()}</div>
          <span class="nav-user-name">Hi, ${user.name.split(' ')[0]}</span>
        </div>`;
    } else {
      navUser.innerHTML = `<button class="btn btn-primary btn-sm" onclick="openAuthModal('login')" id="nav-signin-btn">Sign In</button>`;
    }
  }

  // Buy again section
  renderBuyAgain();
}

/* ═══════════════════════════════════════════
   PRODUCT CARD RENDERING
═══════════════════════════════════════════ */
function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function discount(p) {
  if (!p.oldPrice || p.oldPrice <= p.price) return '';
  return Math.round((1 - p.price / p.oldPrice) * 100);
}

function buildAmzCard(p, qty = null) {
  const minQty = p.moq || 10;
  const startQty = qty || minQty;
  const disc = discount(p);
  return `
  <div class="amz-card" id="card-${p.id}" data-category="${p.category}" data-price="${p.price}">
    <div class="amz-card-img">
      ${disc ? `<div class="amz-img-badge"><span class="badge badge-success">${disc}% off</span></div>` : ''}
      <div class="amz-wishlist" id="wish-${p.id}" onclick="toggleWishlist('${p.id}',event)">♡</div>
      <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='assets/images/products/atta.jpg'" />
    </div>
    <div class="amz-card-body">
      <div class="amz-brand">${p.brand}</div>
      <div class="amz-name">${p.name}</div>
      <div class="amz-rating">
        <span class="amz-stars">${renderStars(p.rating)}</span>
        <span class="amz-review-count">(${p.reviews.toLocaleString('en-IN')})</span>
      </div>
      <div class="amz-moq">Min. Order: ${minQty} units</div>
      <div class="amz-price-row">
        <div class="amz-price"><sup>₹</sup>${p.price}</div>
        ${p.oldPrice > p.price ? `<div class="amz-old-price">₹${p.oldPrice}</div><div class="amz-discount">${disc}% off</div>` : ''}
      </div>
      <div class="amz-qty-row">
        <div class="qty-selector">
          <button onclick="changeAmzQty('${p.id}', -1, ${minQty})">−</button>
          <span class="qty-display" id="qty-${p.id}">${startQty}</span>
          <button onclick="changeAmzQty('${p.id}', 1, ${minQty})">+</button>
        </div>
        <button class="amz-add-btn" id="addbtn-${p.id}" onclick="addAmzToCart('${p.id}')">
          🛒 Add
        </button>
      </div>
    </div>
  </div>`;
}

function changeAmzQty(id, delta, min = 10) {
  const el = document.getElementById(`qty-${id}`);
  if (!el) return;
  const current = parseInt(el.textContent) || min;
  el.textContent = Math.max(min, current + delta);
}

function addAmzToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const qtyEl = document.getElementById(`qty-${id}`);
  const qty = parseInt(qtyEl?.textContent) || product.moq || 10;
  Cart.add(product, qty);

  const btn = document.getElementById(`addbtn-${id}`);
  if (btn) {
    btn.textContent = '✓ Added!';
    btn.classList.add('added');
    setTimeout(() => { btn.innerHTML = '🛒 Add'; btn.classList.remove('added'); }, 1800);
  }
  showToast(`${product.name} × ${qty} added to cart!`);
}

function toggleWishlist(id, e) {
  e.stopPropagation();
  const el = document.getElementById(`wish-${id}`);
  if (!el) return;
  el.classList.toggle('active');
  el.textContent = el.classList.contains('active') ? '♥' : '♡';
  showToast(el.classList.contains('active') ? 'Added to wishlist ❤️' : 'Removed from wishlist', 'info');
}

/* ═══════════════════════════════════════════
   BUY AGAIN WIDGET
═══════════════════════════════════════════ */
function renderBuyAgain() {
  const container = document.getElementById('buy-again-container');
  if (!container) return;

  const products = PurchaseHistory.getRecentProducts();

  if (products.length === 0) {
    container.innerHTML = `
      <div class="buy-again-empty">
        <div style="font-size:32px;margin-bottom:8px">📦</div>
        <div>No previous orders yet. <a href="products.html" style="color:var(--amber)">Shop now</a> to get started!</div>
      </div>`;
    return;
  }

  container.innerHTML = products.map(p => `
    <div class="buy-again-card">
      <img src="${p.img || 'assets/images/products/atta.jpg'}" alt="${p.name}" onerror="this.src='assets/images/products/atta.jpg'" />
      <div class="ba-name">${p.name}</div>
      <div class="ba-price">₹${p.price}<span style="font-size:10px;color:var(--grey-500);font-weight:400">/${p.unit||'unit'}</span></div>
      <button class="ba-reorder-btn" onclick="reorderItem('${p.id}')">↺ Reorder</button>
    </div>
  `).join('');
}

function reorderItem(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const min = product.moq || 10;
  Cart.add(product, min);
  showToast(`${product.name} × ${min} added to cart!`);
}

/* ═══════════════════════════════════════════
   HOMEPAGE PRODUCT SECTIONS
═══════════════════════════════════════════ */
function renderHomepageProducts() {
  const categories = [
    { id: 'grocery',       label: '🛒 Grocery Staples' },
    { id: 'beverages',     label: '🧃 Beverages' },
    { id: 'fmcg',          label: '🧴 FMCG & Personal Care' },
    { id: 'snacks',        label: '🍿 Snacks & Biscuits' },
    { id: 'cleaning',      label: '🧹 Cleaning & Household' },
    { id: 'dairy',         label: '🥛 Dairy' },
    { id: 'personal-care', label: '💆 Personal Care' },
  ];

  const wrap = document.getElementById('category-sections');
  if (!wrap) return;

  let html = '';
  for (const cat of categories) {
    const products = PRODUCTS.filter(p => p.category === cat.id);
    if (!products.length) continue;
    html += `
      <div class="home-section" id="sec-${cat.id}">
        <div class="home-section-header">
          <div class="home-section-title">${cat.label}</div>
          <a href="products.html?cat=${cat.id}" class="home-section-link">See all →</a>
        </div>
        <div class="amz-products-grid">${products.map(p => buildAmzCard(p)).join('')}</div>
      </div>`;
  }

  // All products section at bottom
  html += `
    <div class="home-section" id="sec-all">
      <div class="home-section-header">
        <div class="home-section-title">🏷️ All Products</div>
        <a href="products.html" class="home-section-link">View full catalog →</a>
      </div>
      <div class="amz-products-grid">${PRODUCTS.map(p => buildAmzCard(p)).join('')}</div>
    </div>`;

  wrap.innerHTML = html;
}

/* ═══════════════════════════════════════════
   LIVE SEARCH (homepage)
═══════════════════════════════════════════ */
function homepageSearch(query) {
  const q = query.trim().toLowerCase();
  document.querySelectorAll('.amz-card').forEach(card => {
    const name  = card.querySelector('.amz-name')?.textContent.toLowerCase() || '';
    const brand = card.querySelector('.amz-brand')?.textContent.toLowerCase() || '';
    const cat   = card.dataset.category?.toLowerCase() || '';
    card.style.display = (!q || name.includes(q) || brand.includes(q) || cat.includes(q)) ? '' : 'none';
  });

  // Hide empty sections
  document.querySelectorAll('.home-section').forEach(sec => {
    const visible = [...sec.querySelectorAll('.amz-card')].some(c => c.style.display !== 'none');
    sec.style.display = visible ? '' : 'none';
  });
}

/* ═══════════════════════════════════════════
   HERO BANNER SLIDER
═══════════════════════════════════════════ */
let slideIndex = 0, slideTimer;
const SLIDES = [
  { label: 'Flash Deal Today', title: 'Up to 20% Off\nGrocery Essentials', sub: 'Premium atta, rice, pulses at wholesale prices', color: '#0D1B2A', img: 'assets/images/products/atta.jpg' },
  { label: 'Beverages Bonanza', title: 'Stock Up\non Beverages', sub: '24-can packs starting at ₹18 per can', color: '#162236', img: 'assets/images/products/cola.jpg' },
  { label: 'FMCG Special', title: 'Best Prices on\nHousehold Must-Haves', sub: 'Soaps, toothpaste, dishwash & more', color: '#0D1B2A', img: 'assets/images/products/dishwash.jpg' },
];

function initSlider() {
  const container = document.getElementById('hero-slides');
  const dotsEl    = document.getElementById('slider-dots');
  if (!container || !dotsEl) return;

  container.innerHTML = SLIDES.map((s, i) => `
    <div class="hero-slide">
      <div class="hero-slide-bg" style="background-image:url('${s.img}')"></div>
      <div class="hero-slide-content">
        <div class="hero-slide-label">${s.label}</div>
        <div class="hero-slide-title">${s.title.replace('\n','<br>')}</div>
        <div class="hero-slide-sub">${s.sub}</div>
        <a href="products.html" class="btn btn-primary" style="font-size:13px;padding:10px 20px">Shop Now →</a>
      </div>
    </div>`).join('');

  dotsEl.innerHTML = SLIDES.map((_, i) =>
    `<div class="slider-dot${i===0?' active':''}" onclick="goSlide(${i})"></div>`
  ).join('');

  startSlider();
}

function goSlide(n) {
  slideIndex = (n + SLIDES.length) % SLIDES.length;
  const container = document.getElementById('hero-slides');
  if (container) container.style.transform = `translateX(-${slideIndex * 100}%)`;
  document.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === slideIndex));
}

function startSlider() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goSlide(slideIndex + 1), 4500);
}

/* ═══════════════════════════════════════════
   CART PAGE RENDER
═══════════════════════════════════════════ */
function renderCart() {
  const container = document.getElementById('cart-items');
  if (!container) return;

  const items = Cart.get();

  if (items.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:80px 20px;background:#fff;border-radius:20px;border:1.5px solid var(--grey-100)">
        <div style="font-size:80px;margin-bottom:20px">🛒</div>
        <p style="font-family:var(--font-head);font-size:22px;font-weight:700;color:var(--navy);margin-bottom:8px">Your cart is empty</p>
        <p style="font-size:14px;color:var(--grey-500);margin-bottom:24px">Browse our wholesale catalog and add products to get started</p>
        <a href="index.html" class="btn btn-primary">Continue Shopping</a>
      </div>`;
    updateOrderSummary();
    return;
  }

  container.innerHTML = items.map((item, idx) => `
    <div class="cart-item" id="cart-item-${idx}">
      <div class="cart-item-img">
        <img src="${item.img || 'assets/images/products/atta.jpg'}" alt="${item.name}"
          style="width:100%;height:100%;object-fit:contain;padding:6px"
          onerror="this.src='assets/images/products/atta.jpg'" />
      </div>
      <div class="cart-item-info">
        <div class="cart-item-brand">${item.brand || 'Jan Wholesale'}</div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">Min. Qty: ${item.moq || 10} units · ₹${item.price}/unit</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="cartChangeQty(${idx}, -${item.moq||10})">−</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" onclick="cartChangeQty(${idx}, ${item.moq||10})">+</button>
      </div>
      <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
      <button class="cart-item-remove" onclick="cartRemove('${item.id}')">🗑</button>
    </div>`).join('');

  updateOrderSummary();
}

function cartChangeQty(idx, delta) {
  const items = Cart.get();
  if (!items[idx]) return;
  items[idx].qty = Math.max(items[idx].moq || 10, items[idx].qty + delta);
  Cart.save(items);
  renderCart();
}

function cartRemove(id) {
  Cart.remove(id);
  renderCart();
  showToast('Item removed', 'info');
}

function updateOrderSummary() {
  const items    = Cart.get();
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const savings  = items.reduce((s, i) => s + ((i.oldPrice||0) - i.price) * i.qty, 0);
  const delivery = subtotal > 5000 ? 0 : 149;
  const total    = subtotal + delivery;

  const $  = id => document.getElementById(id);
  $('summary-subtotal') && ($('summary-subtotal').textContent = '₹' + subtotal.toLocaleString('en-IN'));
  $('summary-savings')  && ($('summary-savings').textContent  = savings > 0 ? '−₹' + savings.toLocaleString('en-IN') : '₹0');
  $('summary-delivery') && ($('summary-delivery').textContent = delivery === 0 ? 'FREE' : '₹' + delivery);
  $('summary-total')    && ($('summary-total').textContent    = '₹' + total.toLocaleString('en-IN'));
}

/* ═══════════════════════════════════════════
   CHECKOUT
═══════════════════════════════════════════ */
function handleCheckout(e) {
  e.preventDefault();
  if (!Auth.isLoggedIn()) {
    openAuthModal('login');
    showToast('Please sign in to place an order', 'error');
    return;
  }
  const items = Cart.get();
  if (!items.length) { showToast('Your cart is empty', 'error'); return; }

  const total = Cart.total() + (Cart.total() > 5000 ? 0 : 149);
  PurchaseHistory.addOrder(items, total);
  Cart.clear();
  renderCart();

  showToast('🎉 Order placed! Delivery in 24-48 hours.');
  setTimeout(() => { window.location.href = 'purchases.html'; }, 2000);
}

/* ═══════════════════════════════════════════
   PURCHASE HISTORY PAGE
═══════════════════════════════════════════ */
function renderPurchasesPage() {
  const container = document.getElementById('purchases-container');
  if (!container) return;

  if (!Auth.isLoggedIn()) {
    container.innerHTML = `
      <div style="text-align:center;padding:80px 20px;background:#fff;border-radius:20px;border:1.5px solid var(--grey-100)">
        <div style="font-size:64px;margin-bottom:20px">🔐</div>
        <p style="font-family:var(--font-head);font-size:22px;font-weight:700;color:var(--navy);margin-bottom:8px">Sign in to view your orders</p>
        <p style="font-size:14px;color:var(--grey-500);margin-bottom:24px">Your purchase history is saved securely to your account.</p>
        <button class="btn btn-primary" onclick="openAuthModal('login')">Sign In</button>
      </div>`;
    return;
  }

  const orders = PurchaseHistory.get();

  if (!orders.length) {
    container.innerHTML = `
      <div style="text-align:center;padding:80px 20px;background:#fff;border-radius:20px;border:1.5px solid var(--grey-100)">
        <div style="font-size:64px;margin-bottom:20px">📦</div>
        <p style="font-family:var(--font-head);font-size:22px;font-weight:700;color:var(--navy);margin-bottom:8px">No orders yet</p>
        <p style="font-size:14px;color:var(--grey-500);margin-bottom:24px">Your wholesale orders will appear here after you place them.</p>
        <a href="index.html" class="btn btn-primary">Start Shopping</a>
      </div>`;
    return;
  }

  // Simulate delivery status for demo
  const statuses = ['delivered', 'delivered', 'shipped', 'processing'];

  container.innerHTML = orders.map((order, oi) => {
    const date = new Date(order.date);
    const dateStr = date.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
    const status = order.status || statuses[oi % statuses.length];
    const statusLabel = { delivered: '✅ Delivered', shipped: '🚚 Shipped', processing: '⏳ Processing' };
    const statusClass = { delivered: 'status-delivered', shipped: 'status-shipped', processing: 'status-processing' };
    return `
      <div class="order-card">
        <div class="order-header">
          <div>
            <div class="order-id">Order #${order.id}</div>
            <div class="order-date">${dateStr}</div>
          </div>
          <span class="order-status ${statusClass[status]}">${statusLabel[status]}</span>
          <div class="order-total">₹${order.total.toLocaleString('en-IN')}</div>
        </div>
        <div class="order-items-list">
          ${order.items.map(item => `
            <div class="order-item">
              <img class="order-item-img" src="${item.img || 'assets/images/products/atta.jpg'}"
                alt="${item.name}" onerror="this.src='assets/images/products/atta.jpg'" />
              <div class="order-item-info">
                <div class="order-item-brand">${item.brand || 'Jan'}</div>
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-meta">Qty: ${item.qty} units · ₹${item.price}/unit</div>
              </div>
              <div class="order-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
            </div>`).join('')}
        </div>
        <div class="order-footer">
          <button class="btn btn-sm btn-outline" onclick="reorderAll(${oi})">↺ Reorder All</button>
          <a href="products.html" class="btn btn-sm btn-dark">🛒 Shop More</a>
        </div>
      </div>`;
  }).join('');
}

function reorderAll(orderIndex) {
  const orders = PurchaseHistory.get();
  const order  = orders[orderIndex];
  if (!order) return;
  order.items.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (product) Cart.add(product, item.qty);
  });
  showToast('✅ All items added to cart!');
  setTimeout(() => window.location.href = 'cart.html', 1200);
}

/* ═══════════════════════════════════════════
   NAVBAR SCROLL
═══════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const scrollTop = document.getElementById('scroll-top-btn');
  if (window.scrollY > 60) {
    navbar?.classList.remove('transparent');
    navbar?.classList.add('scrolled');
    scrollTop?.classList.add('visible');
  } else {
    if (navbar?.classList.contains('transparent-capable')) {
      navbar?.classList.add('transparent');
      navbar?.classList.remove('scrolled');
    }
    scrollTop?.classList.remove('visible');
  }
});

document.getElementById('scroll-top-btn')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ═══════════════════════════════════════════
   HAMBURGER / MOBILE NAV
═══════════════════════════════════════════ */
document.getElementById('hamburger')?.addEventListener('click', () => {
  const mobileNav = document.getElementById('mobile-nav');
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('home-sidebar');
  mobileNav?.classList.toggle('open');
  sidebar?.classList.toggle('mobile-open');
  hamburger?.classList.toggle('open');
  const spans = hamburger?.querySelectorAll('span') || [];
  if (hamburger?.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

/* ═══════════════════════════════════════════
   FILTER BY CATEGORY (products page)
═══════════════════════════════════════════ */
function filterByCategory(cat) {
  document.querySelectorAll('.amz-card, .product-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
  });
  document.querySelectorAll('.cat-filter-btn, .cat-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === cat);
  });
  const el = document.getElementById('product-count');
  if (el) {
    const visible = document.querySelectorAll('.amz-card:not([style*="display: none"]),.product-card:not([style*="display: none"])').length;
    el.textContent = visible;
  }
}

/* ═══════════════════════════════════════════
   PAYMENT OPTIONS
═══════════════════════════════════════════ */
document.querySelectorAll('.payment-option').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    const radio = opt.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
  });
});

/* ═══════════════════════════════════════════
   PROMO CODE
═══════════════════════════════════════════ */
document.getElementById('apply-promo')?.addEventListener('click', () => {
  const input = document.getElementById('promo-input');
  const code  = input?.value.trim().toUpperCase();
  const promos = { 'JAN10': '10% discount applied!', 'WELCOME': 'Welcome! Free delivery applied!', 'FIRST500': '₹500 credit added to your account!' };
  if (promos[code]) {
    showToast('🎉 ' + promos[code]);
    if (input) input.value = '';
  } else {
    showToast('Invalid promo code. Try JAN10 or WELCOME', 'error');
  }
});

/* ═══════════════════════════════════════════
   VIEW TOGGLE (grid/list on products page)
═══════════════════════════════════════════ */
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const grid = document.querySelector('.products-full-grid, .amz-products-grid');
    if (grid) grid.classList.toggle('list-view', btn.dataset.view === 'list');
  });
});

/* ═══════════════════════════════════════════
   INTERSECTION OBSERVER — FADE IN
═══════════════════════════════════════════ */
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/* ═══════════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════════ */
function animateCount(el, target, suffix = '') {
  const dur = 1800, start = performance.now();
  (function step(ts) {
    const p = Math.min((ts - start) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('en-IN') + suffix;
    if (p < 1) requestAnimationFrame(step);
  })(performance.now());
}

const cntObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const numEl = e.target.querySelector('.num');
      if (numEl) animateCount(numEl, parseInt(e.target.dataset.count), e.target.dataset.suffix || '');
      cntObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => cntObserver.observe(el));

/* ═══════════════════════════════════════════
   INITIALISE ON DOM READY
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  refreshAuthUI();

  // Homepage
  if (document.getElementById('category-sections')) {
    renderHomepageProducts();
    initSlider();
  }

  // Cart page
  renderCart();

  // Purchases page
  renderPurchasesPage();

  // Checkout form
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckout);

  // Auth form listeners
  document.getElementById('login-form')?.addEventListener('submit', handleLogin);
  document.getElementById('register-form')?.addEventListener('submit', handleRegister);

  // Close modal on overlay click
  document.getElementById('auth-overlay')?.addEventListener('click', e => {
    if (e.target.id === 'auth-overlay') closeAuthModal();
  });

  // Set active nav link
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href && path.includes(href.replace('.html', ''))) link.classList.add('active');
  });

  // Auto-filter from URL param
  const urlCat = new URLSearchParams(window.location.search).get('cat');
  if (urlCat) setTimeout(() => filterByCategory(urlCat), 200);
});
