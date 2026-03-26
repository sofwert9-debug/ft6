// Дожидаемся полной загрузки документа
document.addEventListener('DOMContentLoaded', () => {
    
    // Находим все кнопки "В корзину" и счетчик корзины
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.getElementById('cart-count');
    
    let cartItemCount = 0; // Изначальное количество товаров в корзине

    // Добавляем обработчик клика на каждую кнопку
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            
            // Увеличиваем счетчик
            cartItemCount++;
            cartCountElement.textContent = cartItemCount;

            // Получаем название товара из атрибута data-product
            const productName = event.target.getAttribute('data-product');

            // Создаем небольшую анимацию кнопки
            const originalText = button.textContent;
            button.textContent = 'Добавлено ✓';
            button.style.background = '#4CAF50'; // Меняем цвет на зеленый
            button.style.color = '#FFF';
            button.style.borderColor = '#4CAF50';

            // Возвращаем кнопку в исходное состояние через 2 секунды
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'transparent';
                button.style.color = '#111111';
                button.style.borderColor = '#111111';
            }, 2000);

            // Выводим системное уведомление (в реальном проекте здесь красивый попап)
            console.log(`Товар "${productName}" добавлен в корзину!`);
        });
    });
});