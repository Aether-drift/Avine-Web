const products = [
  {id:"phone-01",name:"The One Phone",category:"Phones",price:38990,tag:"Bestseller",image:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=850&q=85",description:"A beautifully balanced everyday phone with a vivid display, thoughtful camera, and all-day battery. Made to feel just right in your hand."},
  {id:"phone-02",name:"One Phone Mini",category:"Phones",price:29990,tag:"Just landed",image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=850&q=85",description:"Everything you love about a great phone, in a comfortably compact size. Clear, capable, and ready for wherever the day goes."},
  {id:"phone-03",name:"One Phone Pro",category:"Phones",price:49990,tag:"",image:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=850&q=85",description:"A little extra of everything. Pro-level photography, a brilliant display, and thoughtful performance for the moments that matter."},
  {id:"phone-04",name:"Everyday Case",category:"Phones",price:1490,tag:"",image:"https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=850&q=85",description:"A soft-touch, durable case with a reassuring grip and a clean silhouette. Everyday protection without the extra bulk."},
  {id:"audio-01",name:"Studio Headphones",category:"Audio",price:13990,tag:"Bestseller",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=850&q=85",description:"Your own quiet corner, wherever you are. Enjoy rich, balanced sound, soft cushioning, and a comfortable fit from morning to evening."},
  {id:"audio-02",name:"Little Speaker",category:"Audio",price:6990,tag:"",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=850&q=85",description:"Small enough to bring along, full enough to fill a room. A portable speaker with warm sound and up to 14 hours of listening."},
  {id:"audio-03",name:"Everyday Earbuds",category:"Audio",price:8990,tag:"Just landed",image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=850&q=85",description:"Easy-listening earbuds with clear sound, a secure fit, and a pocket-sized case that keeps your day moving."},
  {id:"audio-04",name:"Quiet Buds",category:"Audio",price:10990,tag:"",image:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=850&q=85",description:"A little space when you need it. Adaptive noise cancelling and naturally detailed audio in a comfortable, lightweight design."},
  {id:"wear-01",name:"Daylight Watch",category:"Wearables",price:18490,tag:"Bestseller",image:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=850&q=85",description:"A thoughtful companion for your day, with gentle wellness insights, a bright always-on display, and a battery that lasts."},
  {id:"wear-02",name:"Daylight Band",category:"Wearables",price:2490,tag:"",image:"https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=850&q=85",description:"A comfortable, easy-to-change band in a soft, durable finish. A small detail that makes your watch feel like yours."},
  {id:"wear-03",name:"Move Tracker",category:"Wearables",price:6490,tag:"",image:"https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=850&q=85",description:"A simple, lightweight way to keep a kind eye on movement, rest, and the rhythms of your everyday."},
  {id:"access-01",name:"Pocket Charger",category:"Accessories",price:2990,tag:"",image:"https://images.unsplash.com/photo-1609592424968-4a1fda5e6e4b?auto=format&fit=crop&w=850&q=85",description:"A slim, dependable power boost that slips into any bag. Thoughtful charging, right when you need it."},
  {id:"access-02",name:"Wireless Pad",category:"Accessories",price:3990,tag:"",image:"https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=850&q=85",description:"A tidy place to power up. Set your phone down, let it charge, and get on with your day."},
  {id:"access-03",name:"Carry-All Pouch",category:"Accessories",price:1790,tag:"Just landed",image:"https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=850&q=85",description:"A soft, sturdy home for your everyday essentials. Room for cables, earbuds, and all the little things you reach for."}
];

const formatPrice = (price) => new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0
}).format(price);

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (error) {
    console.error(`Unable to read ${key} from local storage.`, error);
    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Unable to save ${key} to local storage.`, error);
    showToast("Your browser couldn't save this change.");
  }
};

let toastTimer;
function showToast(message) {
  const toast = document.querySelector(".toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3000);
}

function updateCartCount() {
  const cart = readStorage("avine-cart", {});
  const count = Object.values(cart).reduce((total, quantity) => total + (Number(quantity) || 0), 0);
  document.querySelectorAll("[data-cart-count]").forEach((element) => { element.textContent = count; });
}

function addToCart(productId, quantity = 1) {
  if (!localStorage.getItem("avine-user")) {
    window.location.href = `auth.html?redirect=${encodeURIComponent(window.location.href)}`;
    return;
  }
  const cart = readStorage("avine-cart", {});
  cart[productId] = (Number(cart[productId]) || 0) + quantity;
  writeStorage("avine-cart", cart);
  updateCartCount();
  showToast("Added to your bag. Good choice.");
}

function productCard(product) {
  return `<article class="product-card" data-product-id="${product.id}">
    <div class="product-image-wrap">
      <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
      ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
      <button class="quick-view-button" data-quick-view="${product.id}">Quick view ↗</button>
    </div>
    <div class="product-info"><div><h3>${product.name}</h3><p class="product-category">${product.category}</p></div><span class="product-price">${formatPrice(product.price)}</span></div>
    <button class="product-add" data-add-cart="${product.id}">Add to cart <span>+</span></button>
  </article>`;
}

const shopState = {category: [], min: 0, max: 60000, query: "", sort: "featured", page: 1, perPage: 6};
function getFilteredProducts() {
  let filtered = products.filter((product) => {
    const matchesCategory = shopState.category.length === 0 || shopState.category.includes(product.category);
    const matchesPrice = product.price >= shopState.min && product.price <= shopState.max;
    const search = shopState.query.toLowerCase();
    const matchesQuery = !search || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(search);
    return matchesCategory && matchesPrice && matchesQuery;
  });
  if (shopState.sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (shopState.sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (shopState.sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
  return filtered;
}

function renderShop() {
  const grid = document.querySelector('[data-products="shop"]');
  if (!grid) return;
  const filtered = getFilteredProducts();
  const pageCount = Math.max(1, Math.ceil(filtered.length / shopState.perPage));
  shopState.page = Math.min(shopState.page, pageCount);
  const pageProducts = filtered.slice((shopState.page - 1) * shopState.perPage, shopState.page * shopState.perPage);
  grid.innerHTML = pageProducts.length
    ? pageProducts.map(productCard).join("")
    : `<div class="empty-state"><h3>Nothing on this shelf just yet.</h3><p>Try adjusting your filters, or clear them to see everything.</p></div>`;
  const count = document.querySelector("[data-results-count]");
  if (count) count.textContent = shopState.query || shopState.category.length ? `Showing ${filtered.length}` : `Showing all ${filtered.length}`;
  renderPagination(pageCount);
}

function renderPagination(pageCount) {
  const pagination = document.querySelector(".pagination");
  if (!pagination) return;
  const buttons = [`<button data-page-number="${shopState.page - 1}" ${shopState.page === 1 ? "disabled" : ""}>Prev</button>`];
  for (let page = 1; page <= pageCount; page += 1) {
    buttons.push(`<button data-page-number="${page}" class="${shopState.page === page ? "active" : ""}" aria-current="${shopState.page === page ? "page" : "false"}">${page}</button>`);
  }
  buttons.push(`<button data-page-number="${shopState.page + 1}" ${shopState.page === pageCount ? "disabled" : ""}>Next</button>`);
  pagination.innerHTML = buttons.join("");
}

function initShop() {
  const grid = document.querySelector('[data-products="shop"]');
  if (!grid) return;
  const params = new URLSearchParams(window.location.search);
  shopState.query = params.get("q") || "";
  const initialCategory = params.get("category");
  if (initialCategory && ["Phones", "Audio", "Wearables", "Accessories"].includes(initialCategory)) {
    shopState.category = [initialCategory];
    const checkbox = document.querySelector(`input[name="category"][value="${initialCategory}"]`);
    if (checkbox) checkbox.checked = true;
  }
  const searchInput = document.querySelector('.search-form input[name="q"]');
  if (searchInput && shopState.query) searchInput.value = shopState.query;

  const refresh = () => {
    grid.innerHTML = Array.from({length: 6}, () => '<div class="skeleton-card"><div class="skeleton-image"></div><div class="skeleton-line"></div><div class="skeleton-line short"></div></div>').join("");
    window.setTimeout(renderShop, 260);
  };
  document.querySelectorAll('input[name="category"]').forEach((checkbox) => checkbox.addEventListener("change", () => {
    shopState.category = [...document.querySelectorAll('input[name="category"]:checked')].map((item) => item.value);
    shopState.page = 1;
    refresh();
  }));
  const minInput = document.querySelector("[data-min-price]");
  const maxInput = document.querySelector("[data-max-price]");
  const range = document.querySelector("[data-price-range]");
  const updatePrice = () => {
    shopState.min = Math.max(0, Number(minInput.value) || 0);
    shopState.max = Math.max(shopState.min, Number(maxInput.value) || 0);
    maxInput.value = String(shopState.max);
    range.value = String(Math.min(60000, shopState.max));
    shopState.page = 1;
    refresh();
  };
  minInput.addEventListener("change", updatePrice);
  maxInput.addEventListener("change", updatePrice);
  range.addEventListener("input", () => {
    maxInput.value = range.value;
    shopState.max = Number(range.value);
    shopState.page = 1;
    refresh();
  });
  document.querySelector("[data-sort]").addEventListener("change", (event) => {
    shopState.sort = event.target.value;
    shopState.page = 1;
    refresh();
  });
  document.querySelector(".clear-filters").addEventListener("click", () => {
    shopState.category = [];
    shopState.min = 0;
    shopState.max = 60000;
    shopState.query = "";
    shopState.sort = "featured";
    shopState.page = 1;
    document.querySelectorAll('input[name="category"]').forEach((checkbox) => { checkbox.checked = false; });
    minInput.value = "0";
    maxInput.value = "60000";
    range.value = "60000";
    document.querySelector("[data-sort]").value = "featured";
    const input = document.querySelector('.search-form input[name="q"]');
    if (input) input.value = "";
    refresh();
  });
  document.querySelector(".pagination").addEventListener("click", (event) => {
    const button = event.target.closest("[data-page-number]");
    if (!button || button.disabled) return;
    shopState.page = Number(button.dataset.pageNumber);
    renderShop();
    document.querySelector(".shop-products").scrollIntoView({behavior: "smooth", block: "start"});
  });
  document.querySelector(".mobile-filter-toggle").addEventListener("click", () => {
    const panel = document.querySelector(".filters-panel");
    const open = panel.classList.toggle("mobile-open");
    document.querySelector(".mobile-filter-toggle").textContent = open ? "Filters −" : "Filters +";
  });
  refresh();
}

const slides = [
  {title:"Latest<br><span>Gadget.</span>",description:"Thoughtful technology. Beautifully made. Meet the little things that make a big difference.",image:"https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1500&q=90"},
  {title:"Sound<br><span>Mindful.</span>",description:"Find your own rhythm with rich, considered sound for wherever the day takes you.",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1500&q=90"},
  {title:"Move<br><span>Your Way.</span>",description:"A thoughtful little companion for all your everyday wins, big and small.",image:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1500&q=90"}
];
function initHome() {
  const featured = document.querySelector('[data-products="featured"]');
  if (featured) featured.innerHTML = [products[0], products[4], products[8], products[11]].map(productCard).join("");
  const title = document.querySelector("#hero-title");
  if (!title) return;
  let current = 0;
  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    title.innerHTML = slides[current].title;
    document.querySelector("#hero-description").textContent = slides[current].description;
    document.querySelector("#hero-image").style.backgroundImage = `url("${slides[current].image}")`;
    document.querySelector(".slide-count").innerHTML = `${String(current + 1).padStart(2, "0")} <i>/</i> 03`;
    document.querySelectorAll("[data-slide-to]").forEach((dot, dotIndex) => dot.classList.toggle("selected", dotIndex === current));
  };
  document.querySelector('[data-slide="prev"]').addEventListener("click", () => showSlide(current - 1));
  document.querySelector('[data-slide="next"]').addEventListener("click", () => showSlide(current + 1));
  document.querySelectorAll("[data-slide-to]").forEach((dot) => dot.addEventListener("click", () => showSlide(Number(dot.dataset.slideTo))));
}

function initGlobalInteractions() {
  document.querySelectorAll(".site-header").forEach((header) => {
    const actions = header.querySelector(".header-actions");
    const navigation = header.querySelector(".main-nav");
    if (actions && !actions.querySelector(".signup-link")) {
      const signup = document.createElement("a");
      signup.className = "signup-link";
      signup.href = "auth.html?mode=signup";
      signup.textContent = "Sign up";
      actions.insertBefore(signup, actions.querySelector(".cart-link"));
    }
    if (navigation && !navigation.querySelector(".mobile-auth-link")) {
      for (const [label, href] of [["Log in", "auth.html"], ["Sign up", "auth.html?mode=signup"]]) {
        const link = document.createElement("a");
        link.className = "mobile-auth-link";
        link.href = href;
        link.textContent = label;
        navigation.append(link);
      }
    }
  });
  document.querySelectorAll(".theme-toggle").forEach((button) => button.addEventListener("click", () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("avine-theme", dark ? "dark" : "light");
    } catch (error) {
      console.error("Unable to save the selected theme.", error);
      showToast("Your browser couldn't save the theme preference.");
    }
  }));
  const menuToggle = document.querySelector(".menu-toggle");
  if (menuToggle) menuToggle.addEventListener("click", () => {
    const open = document.querySelector(".site-header").classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  const modal = document.querySelector("#quick-view-modal");
  let selectedProduct = null;
  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };
  document.addEventListener("click", (event) => {
    const quick = event.target.closest("[data-quick-view]");
    if (quick && modal) {
      selectedProduct = products.find((product) => product.id === quick.dataset.quickView);
      if (!selectedProduct) return;
      modal.querySelector(".quick-image").style.backgroundImage = `url("${selectedProduct.image}")`;
      modal.querySelector("#quick-title").textContent = selectedProduct.name;
      modal.querySelector(".quick-price").textContent = formatPrice(selectedProduct.price);
      modal.querySelector(".quick-description").textContent = selectedProduct.description;
      modal.querySelector("[data-quantity-value]").textContent = "1";
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }
    const addButton = event.target.closest("[data-add-cart]");
    if (addButton) addToCart(addButton.dataset.addCart);
    if (event.target.closest("[data-close-modal]") || event.target === modal) closeModal();
    const quantityButton = event.target.closest("[data-quantity]");
    if (quantityButton) {
      const value = modal.querySelector("[data-quantity-value]");
      const next = Number(value.textContent) + (quantityButton.dataset.quantity === "plus" ? 1 : -1);
      value.textContent = Math.max(1, Math.min(99, next));
    }
    if (event.target.closest(".quick-add") && selectedProduct) {
      addToCart(selectedProduct.id, Number(modal.querySelector("[data-quantity-value]").textContent));
      if (localStorage.getItem("avine-user")) closeModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && modal.classList.contains("open")) closeModal();
  });
  document.querySelectorAll(".newsletter-form").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    form.reset();
    showToast("You're on the list. Look out for a little good news.");
  }));
  updateCartCount();
}

function initContact() {
  const form = document.querySelector(".contact-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    form.reset();
    const success = form.querySelector(".form-success");
    success.classList.add("show");
    showToast("Submitted successfully! We will get back to you soon.");
    window.setTimeout(() => success.classList.remove("show"), 5000);
  });
}

function initAuth() {
  const forms = document.querySelectorAll(".auth-form");
  if (!forms.length) return;
  const params = new URLSearchParams(window.location.search);
  const switchForm = (name) => {
    forms.forEach((form) => form.classList.toggle("active", form.classList.contains(`${name}-form`)));
    const headerPrompt = document.querySelector(".auth-header-prompt");
    const headerSwitch = document.querySelector(".auth-header-switch");
    if (headerPrompt && headerSwitch) {
      headerPrompt.textContent = name === "signup" ? "Already have an account?" : "New around here?";
      headerSwitch.textContent = name === "signup" ? "Log in" : "Create an account ↗";
      headerSwitch.dataset.authSwitch = name === "signup" ? "login" : "signup";
    }
  };
  document.querySelectorAll("[data-auth-switch]").forEach((button) => button.addEventListener("click", () => switchForm(button.dataset.authSwitch)));
  if (params.get("mode") === "signup") switchForm("signup");
  document.querySelector("[data-forgot-password]").addEventListener("click", (event) => {
    event.preventDefault();
    showToast("Password reset help: email hello@avine.ph.");
  });
  document.querySelector(".google-button").addEventListener("click", () => showToast("Google sign-in isn't connected in this demo."));
  document.querySelectorAll("[data-auth-form]").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const error = form.querySelector(".auth-error");
    error.classList.remove("show");
    if (form.dataset.authForm === "signup") {
      const data = new FormData(form);
      if (data.get("password") !== data.get("confirmPassword")) {
        error.textContent = "Those passwords don't match. Give it another try.";
        error.classList.add("show");
        return;
      }
      if (!data.get("terms")) {
        error.textContent = "Please agree to the Terms & Policy to continue.";
        error.classList.add("show");
        return;
      }
      writeStorage("avine-user", {name: data.get("name"), email: data.get("email")});
      showToast("Account created for this demo. You're all set!");
    } else {
      const data = new FormData(form);
      writeStorage("avine-user", {email: data.get("email")});
      showToast("You're signed in for this demo.");
    }
    window.setTimeout(() => {
      const redirect = params.get("redirect");
      window.location.href = redirect && new URL(redirect, window.location.href).origin === window.location.origin ? redirect : "index.html";
    }, 900);
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  initGlobalInteractions();
  initHome();
  initShop();
  initContact();
  initAuth();
});
