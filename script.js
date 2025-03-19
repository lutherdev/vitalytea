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

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("paperStock").addEventListener("change", updateLivePrice);
    document.getElementById("inkBrand").addEventListener("change", updateLivePrice);
    document.getElementById("numPages").addEventListener("input", updateLivePrice);
    document.getElementById("bindingType").addEventListener("change", updateBindingPrice);
});

//Digital Printing Live Price Update
function updateLivePrice() {
    let paperOption = document.querySelector("#paperStock option:checked");
    let inkOption = document.querySelector("#inkBrand option:checked");
    let numPages = parseInt(document.getElementById("numPages").value) || 1;

    if (!paperOption || !inkOption || numPages < 1) {
        document.getElementById("totalPrice").textContent = "₱0.00";
        return;
    }

    let basePricePerPage = parseFloat(paperOption.getAttribute("data-price")) || 0;
    let inkMultiplier = parseFloat(inkOption.getAttribute("data-multiplier")) || 1;
    let finalPrice = basePricePerPage * inkMultiplier * numPages;

    document.getElementById("totalPrice").textContent = `₱${finalPrice.toFixed(2)}`;
}

//Binding Service Live Price Update
function updateBindingPrice() {
    let bindingOption = document.querySelector("#bindingType option:checked");
    
    if (!bindingOption || bindingOption.value === "") {
        document.getElementById("bindingPrice").textContent = "₱0.00";
        return;
    }

    let price = parseFloat(bindingOption.getAttribute("data-price")) || 0;
    document.getElementById("bindingPrice").textContent = `₱${price.toFixed(2)}`;
}

//Add to Cart Function
function addToCart(item, price, category = "default") {
    let itemExists = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === item && cart[i].category === category) {
            cart[i].quantity++;
            itemExists = true;
            break;
        }
    }

    if (!itemExists) {
        cart.push({ name: item, price: price, quantity: 1, category: category });
    }

    updateCart();
    showOrderSummary(); // Show the order summary when an item is added
}

function showOrderSummary() {
    const orderSummary = document.querySelector('.order-summary');
    orderSummary.style.display = 'block'; // Ensure the order summary is visible
    orderSummary.scrollIntoView({ behavior: 'smooth' }); // Smoothly scroll to the order summary
}

//Digital Printing Service Function
function addDigitalPrintingToCart() {
    let paperStock = document.getElementById("paperStock").value;
    let inkBrand = document.getElementById("inkBrand").value;
    let numPages = parseInt(document.getElementById("numPages").value) || 1;
    let paperOption = document.querySelector("#paperStock option:checked");
    let inkOption = document.querySelector("#inkBrand option:checked");

    if (!paperStock || !inkBrand || numPages < 1) {
        alert("Please select paper type, ink brand, and enter a valid number of pages.");
        return;
    }

    let basePricePerPage = parseFloat(paperOption.getAttribute("data-price"));
    let inkMultiplier = parseFloat(inkOption.getAttribute("data-multiplier"));
    let finalPrice = basePricePerPage * inkMultiplier * numPages;

    let serviceName = `Printing (${paperStock} + ${inkBrand}) - ${numPages} pages`;

    addToCart(serviceName, finalPrice, "service");
}

//Laminating Service Function
function addLaminatingToCart() {
    let fileInput = document.getElementById("laminateFile");

    if (!fileInput.files.length) {
        alert("Please upload a file for laminating.");
        return;
    }

    let serviceName = "Laminating Service";
    let price = 50.00; // Fixed price

    addToCart(serviceName, price, "service");
}

//Binding Service Function
function addBindingToCart() {
    let bindingType = document.getElementById("bindingType").value;
    let bindingOption = document.querySelector("#bindingType option:checked");
    let fileInput = document.getElementById("bindingFile");

    if (!bindingType || !fileInput.files.length) {
        alert("Please select a binding type and upload a file.");
        return;
    }

    let price = parseFloat(bindingOption.getAttribute("data-price"));
    let serviceName = `Binding (${bindingType})`;

    addToCart(serviceName, price, "service");
}

//Cutting Service Function
function addCuttingToCart() {
    let fileInput = document.getElementById("cuttingFile");

    if (!fileInput.files.length) {
        alert("Please upload a file for cutting.");
        return;
    }

    let serviceName = "Cutting Service";
    let price = 5.00; // Fixed price

    addToCart(serviceName, price, "service");
}

//Remove Item from Cart
function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

// Update Cart Display
function updateCart() {
    let cartList = document.getElementById("cart-items");
    let totalElement = document.getElementById("total");
    let cartContainer = document.getElementById("cart-container");
    const orderSummary = document.querySelector('.order-summary');

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

    // Hide the order summary if the cart is empty
    if (cart.length === 0) {
        orderSummary.style.display = 'none';
    }
}

//Checkout Function
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before proceeding to checkout.");
        return; // Prevent navigation if the cart is empty
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = '../html/order.html';
}
// Services Section Functionality
document.addEventListener("DOMContentLoaded", function () {
    const serviceData = {
        "digital-printing": {
            title: "Digital Printing",
            images: [
                { src: "../Picture/Glossy_Print.jpg", text: "Glossy Print" },
                { src: "../Picture/Matte_Print.jpg", text: "Matte Print" },
                { src: "../Picture/Textured_Print.jpg", text: "Textured Print" },
                { src: "../Picture/HP.png", text: "Hewlett Packard" },
                { src: "../Picture/epson-logo.png", text: "Epson" },
                { src: "../Picture/Canon-logo.png", text: "Canon" }
            ],
            desc: `
                   <h4>Paper Stock</h4>
                   <ul>
                       <li><strong>Glossy:</strong> Provides a shiny, reflective finish, enhancing color vibrancy and contrast.</li>
                       <li><strong>Matte:</strong> Offers a non-reflective, smooth surface, reducing glare.</li>
                       <li><strong>Textured:</strong> Adds a unique, tactile feel, perfect for invitations.</li>
                   </ul>
                   <h4>Ink</h4>Another important element of printing  is  ink. We will guarantee that our ink does not run, smear, blotch. It also does not stick to other printed pages unlike the result in other digital printing presses.
                   <h4>Our Brands:</h4>
                   <ul>
                       <li><strong>Hewlett Packard: </strong>Known for reliable, high-quality ink that delivers sharp text and vibrant colors, ideal for both home and office printing.</li>
                       <li><strong>Epson: </strong>Features advanced pigment and dye-based inks designed for long-lasting prints with rich color depth, often used for photography and professional documents.</li>
                       <li><strong>Canon: </strong>Offers specialized ink technology for crisp text and true-to-life colors, making it a favorite for photo printing and creative projects.</li>
                   </ul>`      
        },
        "binding": {
            title: "Binding",
            images: [
                { src: "../Picture/Saddle.jpg", text: "Saddle Stitch" },
                { src: "../Picture/Heated_Spine.jpg", text: "Heated Spine" },
                { src: "../Picture/wire.jpg", text: "Wire Binding" }
            ],
            desc: `
                   <p>Our professional binding services ensure that your documents are securely fastened.</p>`
        },
        "laminating": {
            title: "Laminating",
            images: [
                { src: "../Picture/Laminating.jpg", text: "Lamination" },
            ],
            desc: `
                   <p>Protect and enhance your documents with high-quality lamination.</p>`
        },
        "cutting": {
            title: "Cutting",
            images: [
                { src: "../Picture/Cutting.jpg", text: "Cutting" },
            ],
            desc: `
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

document.addEventListener("DOMContentLoaded", () => {
    const aboutSections = document.querySelectorAll(".about-content");
    if (aboutSections.length > 0) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
        });
    }, { threshold: 0.1 });
    aboutSections.forEach(section => observer.observe(section));
}
});
