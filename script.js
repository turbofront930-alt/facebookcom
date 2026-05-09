// دالة لجلب المنتجات وعرضها
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('خطأ في تحميل المنتجات:', error);
    }
}

function displayProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // مسح المحتوى القديم

    products.forEach(product => {
        const productCard = `
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-transform hover:scale-[1.02]">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover" 
                     onerror="this.src='https://via.placeholder.com/400x300?text=Image+Not+Found'">
                <div class="p-4 text-right">
                    <span class="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-bold">${product.category}</span>
                    <h3 class="text-lg font-bold mt-2 dark:text-white">${product.name}</h3>
                    <p class="text-xs text-gray-500 mt-1 dark:text-gray-400 line-clamp-2">${product.description}</p>
                    <div class="flex justify-between items-center mt-4 border-t pt-4">
                        <div>
                            <span class="text-blue-600 font-bold text-xl">${product.price} ج.م</span>
                            <span class="text-gray-400 line-through text-[10px] mr-2">${product.oldPrice} ج.م</span>
                        </div>
                        <button onclick="orderViaWhatsApp('${product.name}')" class="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-700 transition">
                             اطلب الآن
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', productCard);
    });
}

// دالة الفلترة (عشان تشتغل مع الأزرار اللي في الـ HTML)
async function filterProducts(category) {
    const response = await fetch('products.json');
    const products = await response.json();
    
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

// دالة الطلب عبر الواتساب
function orderViaWhatsApp(productName) {
    const message = `أهلاً بشمهندس إبراهيم، محتاج استفسر عن خدمة: ${productName}`;
    window.open(`https://wa.me/201101475409?text=${encodeURIComponent(message)}`, '_blank');
}

// تحميل المنتجات عند فتح الصفحة
document.addEventListener('DOMContentLoaded', loadProducts);
