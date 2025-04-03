// shopping-cart.js
class ShoppingCart {
  constructor() {
    this.shoppingCartButton = document.querySelector('#shopping-cart');
    this.cart = document.querySelector('#cart');
    this.closeArrowButton = document.querySelector('#arrow-left');
    this.menuItems = document.querySelectorAll('.menu-item');
    this.popup = document.querySelector('#popup');
    this.plusButton = document.querySelector('#plus-button');
    this.minusButton = document.querySelector('#minus-button');
    this.closeButton = document.querySelector('#close-popup');
    this.quantityInput = document.querySelector('#quantity-input');
    this.popupButtonCheckout = document.querySelector('#popup-button-checkout');
    this.totalPrice = this.popupButtonCheckout.querySelector('.total-price');
    this.cartItems = [];
    this.cartCount = '';
    //eventLsitener
    this.init();
  }
  init() {
    this.shoppingCartButton.addEventListener('click', this.toggleCart.bind(this));
    this.closeArrowButton.addEventListener('click', this.toggleCart.bind(this));

    this.menuItems.forEach((menuItem) => {
      const checkoutButton = menuItem.querySelector('#Checkout');
      checkoutButton.addEventListener('click', this.handleCheckoutClick.bind(this));
    });

    this.popupButtonCheckout.addEventListener('click', this.handlePopupCheckoutClick.bind(this));
    this.cart.addEventListener('click', this.handleCartItems.bind(this));
    this.cart.addEventListener('input', this.handleCartPrice.bind(this));

    this.plusButton.addEventListener('click', this.updateQuantity.bind(this, 1));
    this.minusButton.addEventListener('click', this.updateQuantity.bind(this, -1));
    this.closeButton.addEventListener('click', () => {
      this.popup.classList.toggle('hidden');
    });
    this.quantityInput.addEventListener('input', this.handleInputQuantity.bind(this));
    this.popupButtonCheckout.addEventListener('submit', this.submitData.bind(this));
    document.addEventListener('click', this.handlePopupHide.bind(this));
  }
  handlePopupHide(e) {
    if (e.target !== this.popup && !this.popup.contains(e.target)) {
      this.popup.classList.add('hidden');
      e.preventDefault();
    }
  }
  toggleCart(e) {
    this.cart.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
    e.preventDefault();
  }
  handleCheckoutClick(e) {
    const menuItem = e.target.closest('.menu-item');
    const nameItem = menuItem.querySelector('h3').textContent;
    const imgItem = menuItem.querySelector('img');
    const descriptionItem = menuItem.querySelector('p.text-lg').textContent;
    const priceBeforeDiscount = menuItem.querySelector('.price-before-discount').textContent;
    const priceAfterDiscount = menuItem.querySelector('.price-after-discount').textContent;

    this.popup.querySelector('#popup-image').src = imgItem.src;
    this.popup.querySelector('#popup-image').alt = imgItem.alt;
    this.popup.querySelector('#popup-name').textContent = nameItem;
    this.popup.querySelector('#popup-description').textContent = descriptionItem;
    this.popup.querySelector('.popup-price-before-discount').textContent = priceBeforeDiscount;
    this.popup.querySelector('.popup-price-after-discount').textContent = priceAfterDiscount;

    // Reset nilai quantityInput dan updateTotalPrice
    document.querySelector('#quantity-input').value = 1;
    this.updateTotalPrice();

    this.popup.classList.remove('hidden');
    e.preventDefault();
    e.stopPropagation();
  }
  handlePopupCheckoutClick(e) {
    const name = this.popup.querySelector('#popup-name').textContent;
    const price = parseFloat(this.popup.querySelector('.popup-price-after-discount').textContent.replace(/Rp\.|\.|,/g, ''));
    const quantity = parseInt(this.quantityInput.value);
    const image = this.popup.querySelector('#popup-image').src;
    const existingItem = this.cartItems.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.total = existingItem.price * existingItem.quantity;
    } else {
      this.cartItems.push({
        name,
        price,
        quantity,
        image,
        total: price * quantity,
      });
    }
    this.updateCartDisplay();
    this.updateCartCount();
    this.popup.classList.toggle('hidden');
    e.preventDefault();
  }
  handleCartItems(e) {
    const index = e.target.dataset.index;
    const item = this.cartItems[index];
    if (e.target.classList.contains('remove-item')) {
      this.cartItems.splice(index, 1);
      this.updateCartDisplay();
      this.updateCartCount();
    } else if (e.target.classList.contains('quantity-minus')) {
      item.quantity > 1 && (item.quantity--, (item.total = item.quantity * item.price));
      this.updateCartDisplay();
    } else if (e.target.classList.contains('quantity-plus')) {
      item.quantity++, (item.total = item.quantity * item.price);
      this.updateCartDisplay();
    }
  }
  handleCartPrice(e) {
    if (e.target.classList.contains('quantity-input')) {
      const index = e.target.dataset.index;
      const item = this.cartItems[index];
      const newQuantity = parseInt(e.target.value) || 1;
      item.quantity = newQuantity;
      item.total = item.quantity * item.price;
      this.updateCartDisplay();
    }
  }
  updateCartCount() {
    const cartCountNumber = this.shoppingCartButton.querySelector('.cart-count');
    const count = this.cartItems.length;
    cartCountNumber.textContent = count === 0 ? '' : count >= 99 ? '99+' : count.toString();
  }
  updateCartDisplay() {
    const cartContent = document.querySelector('#cart .cart-content');
    let total = 0;
    cartContent.innerHTML = '';

    this.cartItems.forEach((item, index) => {
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
  updateQuantity(value) {
    const quantity = parseInt(this.quantityInput.value) + value;
    if (quantity < 1) quantity = 1;
    this.quantityInput.value = quantity;
    this.updateTotalPrice();
  }
  updateTotalPrice() {
    const totalPriceElement = this.popup.querySelector('.total-price');
    const price = parseFloat(this.popup.querySelector('.popup-price-after-discount').textContent.replace(/Rp\.|\.|,/g, ''));
    const quantity = parseInt(this.quantityInput.value) || 1;
    const total = price * quantity;
    totalPriceElement.textContent = `Rp.${total.toLocaleString('id-ID')}`;
  }
  handleInputQuantity() {
    const quantity = parseInt(this.quantityInput.value);
    if (isNaN(quantity) || quantity < 1) quantity = 1;
    this.quantityInput.value = quantity;
    this.updateTotalPrice();
  }
  submitData(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', this.popup.querySelector('#popup-name').textContent);
    formData.append('price', this.popup.querySelector('.popup-price-after-discount').textContent);
    formData.append('quantity', this.quantityInput.value);
  }
}

const shoppingCart = new ShoppingCart();
