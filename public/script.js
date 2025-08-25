const bar = document.getElementById('bar');
const navbar = document.getElementById('nav');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        navbar.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
}

const mainImg = document.getElementById("mainImg");
const smallImg = document.getElementsByClassName("small-img");

// for thumbnails inside details section
for (let i = 0; i < smallImg.length; i++) {
    smallImg[i].onclick = function () {
        mainImg.src = this.src;
        document.getElementById("title-product").textContent = this.alt;
        document.getElementById("price-product").textContent = this.dataset.price;
        document.getElementById("desc-product").textContent = this.dataset.description;
    };
}

// for product cards
const changeImg = document.getElementsByClassName("card");

for (let i = 0; i < changeImg.length; i++) {
    changeImg[i].onclick = function () {
        const img = this.querySelector("img");

        if (img) {
            // update main product details
            mainImg.src = img.src;
            document.getElementById("title-product").textContent = img.alt;
            document.getElementById("price-product").textContent = img.dataset.price;
            document.getElementById("desc-product").textContent = img.dataset.description;

            // smooth scroll to details section
            document.getElementById("details-product")
                .scrollIntoView({ behavior: "smooth" });
        }
    };
}

// shop section product
const shopImg = document.getElementsByClassName("shop-card");
for (let i = 0; i < shopImg.length; i++) {
    shopImg[i].onclick = function () {
        const img = this.querySelector("img");
        if (img) {
            // Get relative path instead of full URL
            const relativeSrc = img.getAttribute("src");

            localStorage.setItem("product", JSON.stringify({
                src: relativeSrc, // <-- relative path (no http://127.0.0.1)
                title: img.alt,
                price: img.dataset.price,
                desc: img.dataset.description
            }));

            window.location.href = "sproduct.html";
        }
    };
}

const homeImg = document.getElementsByClassName("home-card");
for (let i = 0; i < homeImg.length; i++) {
    homeImg[i].onclick = function () {
        const img = this.querySelector("img");
        if (img) {
            const relativeSrc = img.getAttribute("src");

            localStorage.setItem("product", JSON.stringify({
                src: relativeSrc,
                title: img.alt,
                price: img.dataset.price,
                desc: img.dataset.description
            }));

            window.location.href = "sproduct.html";
        }
    };
}


// FOR ADDING CART FUNCTION
function addToCart(title, price, img) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // keep property names consistent (use "image" everywhere)
  cart.push({ title: title, price: price, img: img });
  

  sessionStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  
}

function displayCart() {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  let cartItemsDiv = document.getElementById("cart-items");

  if (!cartItemsDiv) return; // skip if not on cart.html

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let html = "";
  cart.slice().reverse().forEach((item, index) => {
    html += `
      <div class="cart grid grid-cols-1 md:grid-cols-5 gap-4 justify-center">
        <div class="images md:col-span-1 justify-center items-center flex">
          <img src="${item.img}" alt="${item.title}" class="w-full h-auto">
        </div>
        <div class="product-des md:col-span-3 ps-6 pt-6">
          <h1 class="font-bold">${item.title}</h1>
          <p class="text-sm font-semibold">Qty: 1</p>
          <button onclick="removeFromCart(${index})" class="text-sm text-gray-500 underline">Remove</button>
        </div>
        <div class="price md:col-span-1 flex justify-center md:justify-end items-start pt-6">
           ${item.price}
        </div>
      </div>
      <div class="border-t border-gray-300 my-2"></div>
    `;
  });

  cartItemsDiv.innerHTML = html;
}

function removeFromCart(index) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}



// Run automatically when on cart.html
if (document.getElementById("cart-items")) {
    displayCart();
    updateCartCount();
}




// FOR REMOVING CART FUNCTION
// const removeCart = document.getElementById("removeCart");
// const removeElement = document.getElementById("cart");
// removeCart.addEventListener('click', () => {
//     // Remove the element when the button is clicked
//     removeElement.remove();
// });
