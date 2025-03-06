// shopping-cart.js
const shoppingCartButton = document.querySelector('#shopping-cart');
const cart = document.querySelector('#cart');
const closeArrowButton = document.querySelector('#arrow-left');
const menuItems = document.querySelectorAll('.menu-item');
const popup = document.querySelector('#popup');
let cartItems = [];
let cartCount = '';
// shopping-cart.js (Perbaikan Final)
const toggleCart = (e) => {
  cart.classList.toggle('hidden');
  document.body.classList.toggle('overflow-hidden');
  e.preventDefault();
};
[shoppingCartButton, closeArrowButton].forEach((button) => button.addEventListener('click', toggleCart));

// popup-checkout
menuItems.forEach((menuItem) => {
  const checkoutButton = menuItem.querySelector('#Checkout');
  const handleCheckoutClick = (e) => {
    const nameItem = menuItem.querySelector('h3').textContent;
    const imgItem = menuItem.querySelector('img');
    const descriptionItem = menuItem.querySelector('p.text-lg').textContent;
    const priceBeforeDiscount = menuItem.querySelector('.price-before-discount').textContent;
    const priceAfterDiscount = menuItem.querySelector('.price-after-discount').textContent;

    popup.querySelector('#popup-image').src = imgItem.src;
    popup.querySelector('#popup-image').alt = imgItem.alt;
    popup.querySelector('#popup-name').textContent = nameItem;
    popup.querySelector('#popup-description').textContent = descriptionItem;
    popup.querySelector('.popup-price-before-discount').textContent = priceBeforeDiscount;
    popup.querySelector('.popup-price-after-discount').textContent = priceAfterDiscount;

    // Reset nilai quantityInput dan updateTotalPrice
    document.querySelector('#quantity-input').value = 1;
    updateTotalPrice();

    popup.classList.remove('hidden');
    e.preventDefault();
    e.stopPropagation();
  };

  checkoutButton.addEventListener('click', handleCheckoutClick);
});

// close button
const closeButton = document.querySelector('#close-popup');

closeButton.addEventListener('click', () => {
  popup.classList.toggle('hidden');
});

// perhitungan harga
const plusButton = document.querySelector('#plus-button');
const minusButton = document.querySelector('#minus-button');
const quantityInput = document.querySelector('#quantity-input');
const popupButtonCheckout = document.querySelector('#popup-button-checkout');
const totalPrice = popupButtonCheckout.querySelector('.total-price');

popupButtonCheckout.addEventListener('click', (e) => {
  const name = popup.querySelector('#popup-name').textContent;
  const price = parseFloat(popup.querySelector('.popup-price-after-discount').textContent.replace(/Rp\.|\.|,/g, ''));
  const quantity = parseInt(quantityInput.value);
  const image = popup.querySelector('#popup-image').src;
  const existingItem = cartItems.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.total = existingItem.price * existingItem.quantity;
  } else {
    cartItems.push({
      name,
      price,
      quantity,
      image,
      total: price * quantity,
    });
  }
  updateCartDisplay();
  updateCartCount();
  popup.classList.toggle('hidden');
  e.preventDefault();
});
// item shopping-cart
const updateCartCount = () => {
  const cartCountNumber = shoppingCartButton.querySelector('.cart-count');
  const count = cartItems.length;
  cartCountNumber.textContent = count === 0 ? '' : count >= 99 ? '99+' : count.toString();
};

function updateCartDisplay() {
  const cartContent = document.querySelector('#cart .cart-content');
  let total = 0;
  cartContent.innerHTML = '';

  cartItems.forEach((item, index) => {
    total += item.total;
    const cartItem = document.createElement('div');
    cartItem.className = 'relative flex items-center justify-between w-full p-4 my-4 shadow-[5px_5px_5px_rgb(0,0,0,0.25)] cart-item';
    cartItem.innerHTML = `
          <div class="flex items-center flex-1 ">
              <img src="${item.image}" class="w-16 h-16 object-cover" alt="${item.name}">
                  <div class="absolute ml-3 top-2 left-20 md:static">
                  <h3 class="font-bold">${item.name}</h3>
              </div>
          </div>
          <div class="flex items-center space-x-2 md:space-x-4">
              <button class="quantity-minus px-2 py-1 bg-gray-200 rounded" data-index="${index}">-</button>
              <input type="input" value="${item.quantity}" class="quantity-input w-12 text-center" data-index="${index}">
              <button class="quantity-plus px-2 py-1 bg-gray-200 rounded" data-index="${index}">+</button>
              <span class="ml-4 font-poppins font-bold">Rp.${item.total.toLocaleString('id-ID')}</span>
              <button class="remove-item text-red-500" data-index="${index}">&times;</button>
          </div>
      `;

    cartContent.appendChild(cartItem);
  });

  document.querySelector('#checkout-shopping-cart .total-price-cart').textContent = `Rp.${total.toLocaleString('id-ID')}`;
}

cart.addEventListener('click', (e) => {
  const index = e.target.dataset.index;

  if (e.target.classList.contains('remove-item')) {
    cartItems.splice(index, 1);
    updateCartDisplay();
    updateCartCount();
  }

  if (e.target.classList.contains('quantity-minus')) {
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity--;
      cartItems[index].total = cartItems[index].quantity * cartItems[index].price;
      updateCartDisplay();
    }
  }

  if (e.target.classList.contains('quantity-plus')) {
    cartItems[index].quantity++;
    cartItems[index].total = cartItems[index].quantity * cartItems[index].price;
    updateCartDisplay();
  }
});

// Handle input manual
document.querySelector('#cart').addEventListener('input', (e) => {
  if (e.target.classList.contains('quantity-input')) {
    const index = e.target.dataset.index;
    const newQuantity = parseInt(e.target.value) || 1;

    cartItems[index].quantity = newQuantity;
    cartItems[index].total = cartItems[index].quantity * cartItems[index].price;
    updateCartDisplay();
  }
});
const updateQuantity = (value) => {
  const quantity = parseInt(quantityInput.value) + value;
  if (quantity < 1) quantity = 1;
  quantityInput.value = quantity;
  updateTotalPrice();
};

plusButton.addEventListener('click', () => updateQuantity(1));
minusButton.addEventListener('click', () => updateQuantity(-1));

function updateTotalPrice() {
  const totalPriceElement = popup.querySelector('.total-price');
  const price = parseFloat(popup.querySelector('.popup-price-after-discount').textContent.replace(/Rp\.|\.|,/g, ''));
  const quantity = parseInt(quantityInput.value) || 1;
  const total = price * quantity;
  totalPriceElement.textContent = `Rp.${total.toLocaleString('id-ID')}`;
}

quantityInput.addEventListener('input', () => {
  const quantity = parseInt(quantityInput.value);
  if (isNaN(quantity) || quantity < 1) quantity = 1;
  quantityInput.value = quantity;
  updateTotalPrice();
});

const search = document.querySelector('#search').addEventListener('click', (e) => {
  popup.classList.add('hidden');
  e.preventDefault();
  e.stopPropagation();
});

document.addEventListener('click', (e) => {
  if (e.target !== popup && !popup.contains(e.target)) {
    popup.classList.add('hidden');
    e.preventDefault();
  }
});

// Add event listener to popupButtonCheckout to prevent default behavior
popupButtonCheckout.addEventListener('click', (e) => {
  e.preventDefault();
});

// Add event listener to popup to prevent default behavior
popup.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Add event listener to popup to handle keyboard navigation
popup.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    popup.classList.add('hidden');
  }
});

// Add event listener to popup to handle focus trap
popup.addEventListener('focusin', (e) => {
  if (e.target === popup) {
    popup.querySelector('#popup-button-checkout').focus();
  }
});

// Add event listener to popup to handle submit
popupButtonCheckout.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('name', popup.querySelector('#popup-name').textContent);
  formData.append('price', popup.querySelector('.popup-price-after-discount').textContent);
  formData.append('quantity', quantityInput.value);
  // Send form data to server
  console.log(formData);
});
