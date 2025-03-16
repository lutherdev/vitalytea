// Sidebar Functionality
function showSidebar() {
    document.querySelector('.sidebar').style.display = 'flex';
}

function hideSidebar() {
    document.querySelector('.sidebar').style.display = 'none';
}


// Active Tab Highlighting
function highlightActiveLink() {
    const currentUrl = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a, .footer-container .links a');

    navLinks.forEach(link => {
        const linkUrl = link.getAttribute('href').split('/').pop();
        link.innerHTML = link.textContent;

        if (currentUrl === 'index.html' && linkUrl === 'index.html') {
            link.innerHTML = `<span>${link.textContent}</span>`;
        } else if (currentUrl === linkUrl) {
            link.innerHTML = `<span>${link.textContent}</span>`;
        }
    });
}

window.addEventListener('DOMContentLoaded', highlightActiveLink);


// Menu and Cart Functionality
let cart = [];

function addToCart(item, price) {
    let itemExists = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === item) {
            cart[i].quantity++;
            itemExists = true;
            break;
        }
    }
    if (!itemExists) {
        cart.push({ name: item, price: price, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart-items");
    let totalElement = document.getElementById("total");
    let cartContainer = document.getElementById("cart-container");

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        let li = document.createElement("li");
        li.innerHTML = `${item.name} (x${item.quantity}) - ₱${(item.price * item.quantity).toFixed(2)} 
                            <button class="remove-btn" onclick="removeFromCart(${index})">×</button>`;
        cartList.appendChild(li);
    });

    totalElement.textContent = total.toFixed(2);

    cartContainer.style.display = cart.length > 0 ? "block" : "none";
}

function checkout() {
    // Store the cart data in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirect to order.html
    window.location.href = '../html/order.html';
}

// Services Section Functionality
document.addEventListener("DOMContentLoaded", function () {
    const serviceData = {
        "digital-printing": {
            title: "Digital Printing",
            images: [
                { src: "../Picture/Digital-Printing.png", text: "Glossy Print" },
                { src: "../Picture/Digital-Printing.png", text: "Matte Print" },
                { src: "../Picture/Digital-Printing.png", text: "Textured Print" }
            ],
            desc: `<h3>Digital Printing</h3>
                   <h4>Paper Stock</h4>
                   <ul>
                       <li><strong>Glossy:</strong> Provides a shiny, reflective finish, enhancing color vibrancy and contrast.</li>
                       <li><strong>Matte:</strong> Offers a non-reflective, smooth surface, reducing glare.</li>
                       <li><strong>Textured:</strong> Adds a unique, tactile feel, perfect for invitations.</li>
                   </ul>`
        },
        "binding": {
            title: "Binding",
            images: [
                { src: "../Picture/Binding.jpeg", text: "Saddle Stitch" },
                { src: "../Picture/Binding.jpeg", text: "Heated Spine" },
                { src: "../Picture/Binding.jpeg", text: "Wire Binding" }
            ],
            desc: `<h3>Binding</h3>
                   <p>Our professional binding services ensure that your documents are securely fastened.</p>`
        },
        "laminating": {
            title: "Laminating",
            images: [
                { src: "../Picture/Laminate1.jpg", text: "Glossy Lamination" },
                { src: "../Picture/Laminate2.jpg", text: "Matte Lamination" },
                { src: "../Picture/Laminate3.jpg", text: "Textured Lamination" }
            ],
            desc: `<h3>Laminating</h3>
                   <p>Protect and enhance your documents with high-quality lamination.</p>`
        },
        "cutting": {
            title: "Cutting",
            images: [
                { src: "../Picture/Cut1.jpg", text: "Precision Cutting" },
                { src: "../Picture/Cut2.jpg", text: "Custom Shapes" },
                { src: "../Picture/Cut3.jpg", text: "Bulk Cutting" }
            ],
            desc: `<h3>Cutting</h3>
                   <p>Our precision cutting services ensure clean, sharp edges.</p>`
        }
    };

    const servicesGrid = document.getElementById("servicesGrid");
    const expandedView = document.getElementById("expandedView");
    const expandedTitle = document.getElementById("expandedTitle");
    const expandedImagesContainer = document.getElementById("expandedImagesContainer");
    const expandedText = document.getElementById("expandedText");
    const backBtn = document.getElementById("backBtn");

    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", function () {
            const serviceKey = this.closest(".service-box").getAttribute("data-service");
            const serviceInfo = serviceData[serviceKey];

            expandedTitle.textContent = serviceInfo.title;
            expandedText.innerHTML = serviceInfo.desc;

            // Clear previous images
            expandedImagesContainer.innerHTML = "";

            // Populate images dynamically
            serviceInfo.images.forEach(img => {
                const card = document.createElement("div");
                card.classList.add("card");

                const image = document.createElement("img");
                image.src = img.src;
                image.alt = img.text;

                const text = document.createElement("p");
                text.classList.add("text5");
                text.textContent = img.text;

                card.appendChild(image);
                card.appendChild(text);
                expandedImagesContainer.appendChild(card);
            });

            servicesGrid.style.opacity = "0";

            setTimeout(() => {
                servicesGrid.style.display = "none";
                expandedView.style.display = "block";
                setTimeout(() => {
                    expandedView.classList.add("active");
                }, 50);
            }, 500);
        });
    });

    backBtn.addEventListener("click", function () {
        expandedView.classList.remove("active");

        setTimeout(() => {
            expandedView.style.display = "none";
            servicesGrid.style.display = "grid";

            setTimeout(() => {
                servicesGrid.style.opacity = "1";
            }, 50);
        }, 500);
    });
});


//loading screen
document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById("loading-screen");
    const startTime = performance.now();

    loadingScreen.style.display = "flex";

    window.addEventListener("load", function () {
        const loadTime = performance.now() - startTime; 

        if (loadTime < 500) {
            loadingScreen.style.display = "none";
        } else {
            setTimeout(() => {
                loadingScreen.style.opacity = "0";
                setTimeout(() => {
                    loadingScreen.style.display = "none";
                }, 500); 
            }, 500);
        }
    });
});
