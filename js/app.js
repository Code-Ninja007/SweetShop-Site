// app.js

// Sample cart data (can be replaced with dynamic data from the server)
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [
    {
      id: 1,
      name: 'Chocolate Cake',
      price: 5.00,
      img: 'img-cart/chococake.jpg',
      quantity: 1
    },
    {
      id: 2,
      name: 'Vanilla Cupcake',
      price: 3.49,
      img: 'img-cart/vanila.jpg',
      quantity: 2
    },
    {
      id: 3,
      name: 'Fresh Doughnuts',
      price: 1.99,
      img: 'img-cart/freshdonut.jpg',
      quantity: 3
    }
  ];
  
  // Function to save cart to localStorage
  function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  
  // Function to render cart items
  function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    container.innerHTML = ''; // Clear the container
  
    if (cartItems.length === 0) {
      container.innerHTML = '<p>Your cart is empty. Please add some items to it!</p>';
      document.getElementById('total-price').textContent = '$0.00';
      return;
    }
  
    cartItems.forEach(item => {
      const itemHtml = `
        <div class="checkout-item" id="item-${item.id}">
          <img src="${item.img}" alt="${item.name}">
          <div class="checkout-item__details">
            <h5>${item.name}</h5>
            <p>$${item.price.toFixed(2)} each</p>
          </div>
          <div class="checkout-item__actions">
            <div class="quantity-selector">
              <button class="btn-quantity" data-id="${item.id}" data-change="-1">-</button>
              <input type="number" value="${item.quantity}" min="1" id="quantity-${item.id}" readonly>
              <button class="btn-quantity" data-id="${item.id}" data-change="1">+</button>
            </div>
            <button class="btn-remove" data-id="${item.id}">Remove</button>
          </div>
        </div>
      `;
      container.innerHTML += itemHtml;
    });
  
    // Add event listeners for quantity update and item removal
    document.querySelectorAll('.btn-quantity').forEach(button => {
      button.addEventListener('click', function() {
        const itemId = parseInt(this.getAttribute('data-id'));
        const change = parseInt(this.getAttribute('data-change'));
        updateQuantity(itemId, change);
      });
    });
  
    document.querySelectorAll('.btn-remove').forEach(button => {
      button.addEventListener('click', function() {
        const itemId = parseInt(this.getAttribute('data-id'));
        removeItem(itemId);
      });
    });
  
    updateTotalPrice();
  }
  
  // Function to update quantity
  function updateQuantity(itemId, change) {
    const item = cartItems.find(item => item.id === itemId);
    if (!item) return;
  
    item.quantity += change;
    if (item.quantity < 1) item.quantity = 1; // Ensure quantity doesn't go below 1
    document.getElementById(`quantity-${itemId}`).value = item.quantity;
  
    saveCartToLocalStorage(); // Save updated cart to localStorage
    updateTotalPrice();
  }
  
  // Function to remove item from cart
  function removeItem(itemId) {
    const index = cartItems.findIndex(item => item.id === itemId);
    if (index > -1) {
      cartItems.splice(index, 1);
    }
    saveCartToLocalStorage(); // Save updated cart to localStorage
    renderCartItems();
  }
  
  // Function to update the total price
  function updateTotalPrice() {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
  }
  
  // Function to initialize the cart on page load
  function initializeCart() {
    renderCartItems();
  }
  
  // Function to handle checkout
  function proceedToCheckout() {
    if (cartItems.length === 0) {
      alert('Your cart is empty! Please add items before proceeding to checkout.');
      return;
    }
    // For now, we can just redirect to another page for the checkout process.
    // If you want to add additional functionality here, you can store cart info in session storage or similar.
    alert('Proceeding to checkout...');
    // Example: window.location.href = "checkout-form.html";
  }
  
  // Call the initializeCart function when the document is ready
  document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
  });
  