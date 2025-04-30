// script.js - Handles dynamic rendering and interactions for the e-commerce site

// Global state
let selectedProduct = null;
let selectedSize = null;
let selectedColor = null;
let promoCodeApplied = false;
let shippingCost = 5.00; // default standard shipping

// Utility: Format price as currency
function formatPrice(price) {
  return '$' + price.toFixed(2);
}

// Render Home Page Sections
function renderNewestShoes() {
  const container = document.getElementById('newest-shoes');
  container.innerHTML = '';
  // Show first 4 newest products (by id descending)
  const newest = [...products].sort((a,b) => b.id - a.id).slice(0,4);
  newest.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card shadow-sm';
    card.style.minWidth = '180px';
    card.style.cursor = 'pointer';
    card.innerHTML = `
      <img src="${product.image}" class="card-img-top" alt="${product.name}" />
      <div class="card-body p-2">
        <h6 class="card-title mb-1">${product.brand}</h6>
        <p class="card-text mb-0">${product.name}</p>
      </div>
    `;
    card.addEventListener('click', () => {
      showProductDetail(product.id);
    });
    container.appendChild(card);
  });
}

function renderCategories() {
  const container = document.getElementById('categories');
  container.innerHTML = '';
  categories.forEach(cat => {
    const div = document.createElement('div');
    div.className = 'category-item';
    div.innerHTML = `
      <div class="category-icon text-secondary"><i class="${cat.icon}"></i></div>
      <div>${cat.name}</div>
    `;
    container.appendChild(div);
  });
}

function renderPopularShoes() {
  const container = document.getElementById('popular-shoes');
  container.innerHTML = '';
  // For demo, pick first 5 products as popular
  const popular = products.slice(0,5);
  popular.forEach(product => {
    const item = document.createElement('div');
    item.className = 'list-group-item popular-shoe-item';
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="popular-shoe-info">
        <div><strong>${product.brand}</strong> - ${product.name}</div>
      </div>
      <div class="popular-shoe-price">${formatPrice(product.price)}</div>
    `;
    item.addEventListener('click', () => {
      showProductDetail(product.id);
    });
    container.appendChild(item);
  });
}

// Show product detail page
function showProductDetail(productId) {
  selectedProduct = products.find(p => p.id === productId);
  if (!selectedProduct) return;

  // Hide other pages, show product detail
  hideAllPages();
  document.getElementById('product-detail-page').classList.remove('d-none');

  // Fill product detail info
  document.getElementById('product-detail-image').src = selectedProduct.image;
  document.getElementById('product-detail-brand').textContent = selectedProduct.brand;
  document.getElementById('product-detail-name').textContent = selectedProduct.name;
  document.getElementById('product-detail-price').textContent = formatPrice(selectedProduct.price);
  document.getElementById('product-detail-description').textContent = selectedProduct.description;

  // Render rating stars (fixed 4 stars for demo)
  const ratingContainer = document.getElementById('product-detail-rating');
  ratingContainer.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.className = i <= 4 ? 'fas fa-star text-warning' : 'far fa-star text-warning';
    ratingContainer.appendChild(star);
  }

  // Render sizes
  const sizesContainer = document.getElementById('product-detail-sizes');
  sizesContainer.innerHTML = '';
  selectedSize = null;
  selectedProduct.sizes.forEach(size => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-outline-secondary';
    btn.textContent = size;
    btn.addEventListener('click', () => {
      selectedSize = size;
      updateSizeSelection();
    });
    sizesContainer.appendChild(btn);
  });

  // Render colors
  const colorsContainer = document.getElementById('product-detail-colors');
  colorsContainer.innerHTML = '';
  selectedColor = null;
  selectedProduct.colors.forEach(color => {
    const circle = document.createElement('div');
    circle.className = 'color-circle';
    circle.style.backgroundColor = color;
    circle.title = color;
    circle.addEventListener('click', () => {
      selectedColor = color;
      updateColorSelection();
    });
    colorsContainer.appendChild(circle);
  });

  updateSizeSelection();
  updateColorSelection();

  // Scroll to top
  window.scrollTo(0, 0);
}

// Update size button selection UI
function updateSizeSelection() {
  const buttons = document.querySelectorAll('#product-detail-sizes .btn');
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.textContent === selectedSize);
  });
}

// Update color circle selection UI
function updateColorSelection() {
  const circles = document.querySelectorAll('#product-detail-colors .color-circle');
  circles.forEach(circle => {
    circle.classList.toggle('selected', circle.style.backgroundColor === selectedColor);
  });
}

// Add to cart handler
function addToCart() {
  if (!selectedProduct) return alert('No product selected');
  if (!selectedSize) return alert('Please select a size');
  if (!selectedColor) return alert('Please select a color');

  // Check if item already in cart with same size and color
  const existingIndex = cartItems.findIndex(item =>
    item.product.id === selectedProduct.id &&
    item.size === selectedSize &&
    item.color === selectedColor
  );

  if (existingIndex >= 0) {
    cartItems[existingIndex].quantity += 1;
  } else {
    cartItems.push({
      product: selectedProduct,
      size: selectedSize,
      color: selectedColor,
      quantity: 1
    });
  }

  alert('Product added to cart');
  updateCartCount();
}

// Update cart count in bottom nav (optional enhancement)
function updateCartCount() {
  // Could add badge or count on cart icon if desired
}

// Show cart page
function showCartPage() {
  hideAllPages();
  document.getElementById('cart-page').classList.remove('d-none');
  renderCartItems();
}

// Render cart items list
function renderCartItems() {
  const container = document.getElementById('cart-items');
  container.innerHTML = '';

  if (cartItems.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('cart-total-price').textContent = formatPrice(0);
    return;
  }

  cartItems.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'list-group-item cart-item';

    div.innerHTML = `
      <img src="${item.product.image}" alt="${item.product.name}" />
      <div class="cart-item-info">
        <div><strong>${item.product.name}</strong></div>
        <div>Size: ${item.size}, Color: <span style="background-color:${item.color};width:15px;height:15px;display:inline-block;border-radius:50%;border:1px solid #ccc;"></span></div>
        <div class="cart-item-quantity">
          <button class="btn-decrease" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button class="btn-increase" data-index="${index}">+</button>
        </div>
      </div>
      <div class="cart-item-price">
        <div>${formatPrice(item.product.price)}</div>
        <div><strong>${formatPrice(item.product.price * item.quantity)}</strong></div>
        <button class="btn btn-link btn-sm text-danger btn-remove" data-index="${index}">Remove</button>
      </div>
    `;

    container.appendChild(div);
  });

  // Attach event listeners for quantity buttons and remove buttons
  document.querySelectorAll('.btn-increase').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = parseInt(e.target.dataset.index);
      cartItems[idx].quantity++;
      renderCartItems();
      updateCartTotal();
    });
  });

  document.querySelectorAll('.btn-decrease').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = parseInt(e.target.dataset.index);
      if (cartItems[idx].quantity > 1) {
        cartItems[idx].quantity--;
      } else {
        cartItems.splice(idx, 1);
      }
      renderCartItems();
      updateCartTotal();
    });
  });

  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = parseInt(e.target.dataset.index);
      cartItems.splice(idx, 1);
      renderCartItems();
      updateCartTotal();
    });
  });

  updateCartTotal();
}

// Update cart total price display
function updateCartTotal() {
  let total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  if (promoCodeApplied) {
    total *= 0.9; // 10% discount for demo
  }
  total += shippingCost;
  document.getElementById('cart-total-price').textContent = formatPrice(total);
}

// Apply promo code handler
function applyPromoCode() {
  const input = document.getElementById('promo-code');
  const code = input.value.trim();
  if (code.toLowerCase() === 'shoes10') {
    promoCodeApplied = true;
    alert('Promo code applied! 10% discount.');
  } else {
    promoCodeApplied = false;
    alert('Invalid promo code.');
  }
  updateCartTotal();
}

// Show checkout page
function showCheckoutPage() {
  if (cartItems.length === 0) {
    alert('Your cart is empty.');
    return;
  }
  hideAllPages();
  document.getElementById('checkout-page').classList.remove('d-none');
  renderCheckoutOrderList();
  updateCheckoutTotal();
}

// Render checkout order list
function renderCheckoutOrderList() {
  const container = document.getElementById('checkout-order-list');
  container.innerHTML = '';
  cartItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'list-group-item d-flex justify-content-between align-items-center';
    div.textContent = `${item.product.name} x${item.quantity}`;
    const priceSpan = document.createElement('span');
    priceSpan.textContent = formatPrice(item.product.price * item.quantity);
    div.appendChild(priceSpan);
    container.appendChild(div);
  });
}

// Update checkout total price
function updateCheckoutTotal() {
  let total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  if (promoCodeApplied) {
    total *= 0.9;
  }
  total += shippingCost;
  document.getElementById('checkout-total-price').textContent = formatPrice(total);
}

// Place order handler
function placeOrder() {
  if (cartItems.length === 0) {
    alert('Your cart is empty.');
    return;
  }
  // For demo, generate random order number
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  document.getElementById('order-number').textContent = '#' + orderNumber;

  // Clear cart
  cartItems = [];
  promoCodeApplied = false;

  hideAllPages();
  document.getElementById('order-success-page').classList.remove('d-none');
}

// Hide all main pages
function hideAllPages() {
  const pages = ['home-page', 'product-detail-page', 'cart-page', 'checkout-page', 'order-success-page'];
  pages.forEach(id => {
    document.getElementById(id).classList.add('d-none');
  });
}

// Event listeners setup
function setupEventListeners() {
  // Bottom nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if (target === 'home-page') {
        showHomePage();
      } else if (target === 'cart-page') {
        showCartPage();
      }
      // Other nav buttons disabled for now
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Back to home from product detail
  document.getElementById('back-to-home').addEventListener('click', () => {
    showHomePage();
    document.querySelector('.nav-btn[data-target="home-page"]').click();
  });

  // Add to cart button
  document.getElementById('add-to-cart-btn').addEventListener('click', addToCart);

  // View all newest button (for demo, just alert)
  document.getElementById('view-all-newest').addEventListener('click', () => {
    alert('View All Newest Shoes clicked (not implemented)');
  });

  // Apply promo code
  document.getElementById('apply-promo-btn').addEventListener('click', applyPromoCode);

  // Checkout button
  document.getElementById('checkout-btn').addEventListener('click', () => {
    showCheckoutPage();
    document.querySelector('.nav-btn[data-target="cart-page"]').classList.remove('active');
  });

  // Place order button
  document.getElementById('place-order-btn').addEventListener('click', placeOrder);

  // Continue shopping button on order success
  document.getElementById('continue-shopping-btn').addEventListener('click', () => {
    showHomePage();
    document.querySelector('.nav-btn[data-target="home-page"]').click();
  });

  // Track order button (for demo, alert)
  document.getElementById('track-order-btn').addEventListener('click', () => {
    alert('Track Order clicked (not implemented)');
  });
}

// Show home page
function showHomePage() {
  hideAllPages();
  document.getElementById('home-page').classList.remove('d-none');
  renderNewestShoes();
  renderCategories();
  renderPopularShoes();
  updateCartCount();
}

// Initialize app
function init() {
  setupEventListeners();
  showHomePage();
}

// Run init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);
