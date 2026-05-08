let allProducts = [];

async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        allProducts = await response.json();
        displayProducts(allProducts);
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

function displayProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = ""; 

    products.forEach(product => {
        // تنسيق عرض السعر والخصم
        const priceHTML = product.oldPrice 
            ? `<div>
                <span class="text-gray-500 line-through text-xs block">${product.oldPrice} ج.م</span>
                <span class="text-xl font-bold text-green-400">${product.price} ج.م</span>
               </div>`
            : `<span class="text-xl font-bold text-blue-400">${product.price} ج.م</span>`;

        const card = `
            <div class="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition duration-300">
                <img src="${product.image}" class="w-full h-52 object-cover bg-gray-700 shadow-inner">
                <div class="p-6">
                    <h2 class="text-xl font-bold mb-2">${product.name}</h2>
                    <p class="text-gray-400 text-sm h-12 overflow-hidden mb-4">${product.description}</p>
                    <div class="flex justify-between items-center border-t border-gray-700 pt-4">
                        ${priceHTML}
                        <button onclick="sendOrder('${product.name}')" 
                                class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl font-bold text-sm transition shadow-lg shadow-blue-900/20">
                            اطلب الآن
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

function filterProducts(category) {
    if (category === 'all') {
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

function sendOrder(name) {
    const myNumber = "201101475409"; 
    const text = `أهلاً بشمهندس إبراهيم سعد، أريد الاستفسار عن خدمة: ${name}`;
    window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(text)}`, '_blank');
}

fetchProducts();