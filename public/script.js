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
        localStorage.setItem("product", JSON.stringify({
            src: img.src,
            title: img.alt,
            price: img.dataset.price,
            desc: img.dataset.description
        }));

        window.location.href = "sproduct.html";
    }
};

    };

const homeImg = document.getElementsByClassName("home-card");
for (let i = 0; i < homeImg.length; i++) {
    homeImg[i].onclick = function () {
    const img = this.querySelector("img");
    if (img) {
        localStorage.setItem("product", JSON.stringify({
            src: img.src,
            title: img.alt,
            price: img.dataset.price,
            desc: img.dataset.description
        }));

        window.location.href = "sproduct.html";
    }
};

    };


const removeCart = document.getElementById("removeCart");
const removeElement = document.getElementById("cart");
removeCart.addEventListener('click', () => {
    // Remove the element when the button is clicked
    removeElement.remove();
});
