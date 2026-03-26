document.addEventListener('DOMContentLoaded', () => {
    // Элементы DOM
    const productList = document.getElementById('product-list');
    const cartBtn = document.getElementById('cart-btn');
    const cart = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const total = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const sidebar = document.getElementById('sidebar');
    const openSidebarBtn = document.getElementById('open-sidebar-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const homeBtn = document.querySelector('.navbar-brand');

    // Данные корзины
    let cartItemsArray = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

    // Элементы DOM для избранного
    const favoritesBtn = document.querySelectorAll('.add-to-favorites');
    let favoritesArray = JSON.parse(localStorage.getItem('favorites')) || [];

    // Функция для плавной прокрутки вверх
    document.getElementById('logo-link').addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Товары
    const products = [
        {
            id: 1,
            name: 'Плакаты с фото на заказ для дочки',
            price: 500,
            image: 'https://sun9-20.userapi.com/s/v1/ig2/9wtMCSRX-6MD97ZjbZd_ff6yeJ7kBSANTNronFvFxarpLernZiRZ4DF9uWJ6DOR4eGYQZgv5cniBxPq1iFRb4KuX.jpg?quality=95&as=32x23,48x34,72x51,108x76,160x113,240x170,360x255,480x339,540x382,640x452,720x509,1000x707&from=bu&u=D6DsvWXBNtMbx0Kw3Rl_oj60eJrM_mbiTIRTqr86rnc&cs=807x571',
            description: 'Простой плакат в минималистичном стиле.'
        },
        {
            id: 2,
            name: 'Плакаты на День Учителя',
            price: 800,
            image: 'https://sun9-24.userapi.com/s/v1/if1/3DB4UsyerpoasJ4NVWDkxVGiw6GXTAk3kKjaWfbOGN-9UwaOh_B4Imnnjhk6TU8b5aJ3uEwe.jpg?quality=96&as=32x23,48x34,72x51,108x76,160x113,240x170,360x255,480x339,540x382,640x452,720x509,1000x707&from=bu&u=L8oRDxSoH63ZTEVvKiYNqjiTJBdMzW97Vhhr8TyDbDw&cs=807x571',
            description: 'Плакат с безупречными поздравлениями.'
        },
        {
            id: 3,
            name: 'Плакат на День рождения сыну:',
            price: 1000,
            image: 'https://sun9-3.userapi.com/s/v1/ig2/jFxGuiEfVkqcnKrxG9H8aXOPGAkwrS6Yp3_lLQ0pfHdStQkTU43V6F5atO4JWvFcGMrCkB9rKyeaUZ219W7wlB84.jpg?quality=95&as=32x23,48x34,72x51,108x76,160x113,240x170,360x255,480x339,540x382,640x452,720x509,1000x707&from=bu&u=qsOQXUXYdTdKQIls1fknkondaEPoKbU4KABwqxZPIuA&cs=604x427',
            description: 'Яркий плакат на день рождения сыну.'
        },
        {
            id: 4,
            name: 'Украшение на выпускной детского сада',
            price: 1200,
            image: 'https://sun9-20.userapi.com/s/v1/ig2/xhbbU3yDvf9AXFsMDQiUsYkg5YBAQh3sOv6JKUC4Ko3S8XuPlZZBov4EkwrhDL2caR2ZDQy3KGCRdFW2ALMnwCxk.jpg?quality=95&as=32x23,48x34,72x51,108x76,160x113,240x170,360x255,480x339,540x382,640x453,700x495&from=bu&u=vQFtfzYqpizafAhGUifLFKZjxdqxJqXOecxqsqs_S3c&cs=604x427',
            description: 'Веселые и добрые поздравления для детей.'
        },
        {
            id: 5,
            name: 'Плакаты на 8 марта ',
            price: 1500,
            image: 'https://sun9-10.userapi.com/s/v1/if1/89zIMB9O7F8tdK5fuTyTSoQohArvblPr5U-xEU-l5mzDuPhL2nX88Axy5UpjHQTcJ3k_QdTn.jpg?quality=96&as=32x23,48x34,72x51,108x76,160x113,240x170,360x255,480x339,540x382,640x452,720x509,1000x707&from=bu&u=5ACNfG8qEUnJRi93NCG98ljdLSpIFm7kGCsqb1e4kZk&cs=604x427',
            description: 'Поздравительные плакаты для девочек.'
        },
        {
            id: 6,
            name: 'Плакаты на 14 лет',
            price: 1800,
            image: 'https://sun9-30.userapi.com/s/v1/ig2/he--xw6uEI8TEZyl-C-YB31h82ixE49dDAk72xq82WRt-325ep1CfFx9laBf_VkttA_l-rJ0c0cGYcQ2pZYLFYpp.jpg?quality=95&as=32x23,48x34,72x51,108x76,160x113,240x170,360x255,480x339,540x382,640x452,720x509,1000x707&from=bu&u=_b2cDP6b1wprWNCL6ZfbDWFCh9vA3rCTsOyCvP2NUqI&cs=807x571',
            description: 'Плакат с поздравлением на значимую дату.'
        }
    ];

    // Рендер товаров
    const renderProducts = (filter = '', priceRange = '') => {
        productList.innerHTML = '';
        const filteredProducts = products.filter(product =>
            (product.name.toLowerCase().includes(filter.toLowerCase()) ||
            product.description.toLowerCase().includes(filter.toLowerCase())) &&
            checkPriceRange(product.price, priceRange)
        );
        filteredProducts.forEach(product => {
            const isInCart = cartItemsArray.some(item => item.id === product.id);
            const isInFavorites = favoritesArray.some(item => item.id === product.id);
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price.toLocaleString()} ₽</p>
                <p>${product.description}</p>
                <button class="add-to-cart ${isInCart ? 'added' : ''}" data-id="${product.id}" ${isInCart ? 'disabled' : ''}>
                    ${isInCart ? 'Добавлено в корзину' : 'Добавить в корзину'}
                </button>
                <button class="add-to-favorites ${isInFavorites ? 'added' : ''}" data-id="${product.id}" ${isInFavorites ? 'disabled' : ''}>
                    ${isInFavorites ? 'В избранном' : '❤️'}
                </button>
            `;
            productList.appendChild(productDiv);
        });
    }

    // Проверка диапазона цен
    const checkPriceRange = (price, range) => {
        if (!range) return true;
        const [min, max] = range.split('-').map(Number);
        if (isNaN(min)) return price > max;
        if (isNaN(max)) return price < min;
        return price >= min && price <= max;
    }

    // Добавление товара в корзину
    const addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product && !cartItemsArray.some(item => item.id === productId)) {
            cartItemsArray.push(product);
            totalPrice += product.price;
            updateCart();
            saveCartToLocalStorage();
            updateButtonState(productId, true);
        }
    }

    // Удаление товара из корзины
    const removeFromCart = (productId) => {
        const index = cartItemsArray.findIndex(item => item.id === productId);
        if (index !== -1) {
            const removedItem = cartItemsArray.splice(index, 1)[0];
            totalPrice -= removedItem.price;
            updateCart();
            saveCartToLocalStorage();
            updateButtonState(productId, false);
        }
    }

    // Обновление состояния кнопки
    const updateButtonState = (productId, isAdded) => {
        const button = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
        if (button) {
            button.textContent = isAdded ? 'Добавлено в корзину' : 'Добавить в корзину';
            button.classList.toggle('added', isAdded);
            button.disabled = isAdded;
        }
    }

    // Обновление корзины
    const updateCart = () => {
        cartItems.innerHTML = '';
        cartItemsArray.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - ${item.price.toLocaleString()} ₽ <button class="remove-from-cart" data-id="${item.id}">Удалить</button>`;
            cartItems.appendChild(li);
        });
        total.textContent = totalPrice.toLocaleString();
        cartBtn.textContent = `Корзина (${cartItemsArray.length}) - ${totalPrice.toLocaleString()} ₽`;
    }

    // Сохранение корзины в localStorage
    const saveCartToLocalStorage = () => {
        localStorage.setItem('cartItems', JSON.stringify(cartItemsArray));
        localStorage.setItem('totalPrice', totalPrice.toFixed(2));
    }

    // Добавление товара в избранное
    const addToFavorites = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product && !favoritesArray.some(item => item.id === productId)) {
            favoritesArray.push(product);
            saveFavoritesToLocalStorage();
            updateFavoritesButtonState(productId, true);
        }
    }

    // Удаление товара из избранного
    const removeFromFavorites = (productId) => {
        const index = favoritesArray.findIndex(item => item.id === productId);
        if (index !== -1) {
            favoritesArray.splice(index, 1);
            saveFavoritesToLocalStorage();
            updateFavoritesButtonState(productId, false);
        }
    }

    // Обновление состояния кнопки избранного
    const updateFavoritesButtonState = (productId, isAdded) => {
        const button = document.querySelector(`.add-to-favorites[data-id="${productId}"]`);
        if (button) {
            button.textContent = isAdded ? 'В избранном' : 'Добавить в избранное';
            button.classList.toggle('added', isAdded);
            button.disabled = isAdded;
        }
    }

    // Сохранение избранного в localStorage
    const saveFavoritesToLocalStorage = () => {
        localStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    // Обработчики событий
    productList.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart') && !event.target.classList.contains('added')) {
            const productId = parseInt(event.target.dataset.id);
            addToCart(productId);
        }
        if (event.target.classList.contains('add-to-favorites') && !event.target.classList.contains('added')) {
            const productId = parseInt(event.target.dataset.id);
            addToFavorites(productId);
        }
        if (event.target.classList.contains('remove-from-favorites')) {
            const productId = parseInt(event.target.dataset.id);
            removeFromFavorites(productId);
            renderFavoritesPage();
        }
    });

    cartItems.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart')) {
            const productId = parseInt(event.target.dataset.id);
            removeFromCart(productId);
        }
    });

    cartBtn.addEventListener('click', () => {
        cart.classList.remove('hidden');
    });

    closeCartBtn.addEventListener('click', () => {
        cart.classList.add('hidden');
    });

    checkoutBtn.addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
        modal.show();
    });

    openSidebarBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
    });

    closeSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchInput.value.trim();
        renderProducts(query);
    });

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (event) => {
            const priceRange = event.target.getAttribute('data-price-range');
            renderProducts('', priceRange);
        });
    });

    homeBtn.addEventListener('click', () => {
        location.reload();
    });

    // Обработчик для перехода на страницу избранных товаров
    const favoritesLink = document.getElementById('favorites-link');
    favoritesLink.addEventListener('click', (event) => {
        event.preventDefault();
        renderFavoritesPage();
    });

    // Функция для отображения страницы избранных товаров
    const renderFavoritesPage = () => {
        const heroSection = document.querySelector('.hero');
        // Проверка, чтобы избежать повторного добавления заголовка
        if (!heroSection.querySelector('.favorites-title')) {
            heroSection.innerHTML = '<h2 class="favorites-title">Избранное</h2>';
        }
        productList.innerHTML = '';
        if (favoritesArray.length === 0) {
            productList.innerHTML = '<p class="empty-message">🤔Здесь пусто...🤔</p>';
            return;
        }
        favoritesArray.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price.toLocaleString()} ₽</p>
                <p>${product.description}</p>
                <button class="remove-from-favorites" data-id="${product.id}">Удалить из избранного</button>
            `;
            productList.appendChild(productDiv);
        });
    }

    // Инициализация
    renderProducts();
    updateCart();

    // Инициализация избранного
    favoritesArray.forEach(item => {
        updateFavoritesButtonState(item.id, true);
    });
});