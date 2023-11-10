import { setNormalPrice, setPriceWithoutSpaces, getPluralWord } from "./utils.js";

const cartListElement = document.querySelector('.cart_list--on'); // список товаров в наличие
const goodsOnElement = cartListElement.querySelectorAll('.cart_item'); // товары
const totalPriceElement = document.querySelector('.total-price-js');
const totalCountElement = document.querySelector('.total-count-js');

const onCartClick = () => {
    cartListElement.addEventListener('click', (evt) => {
        const cartElement = evt.target.closest('.cart_item'); // карточка товара
        const goodPriceElement = cartElement.querySelector('.item-price-js'); // стоимость товара со скидками
        const oneGoodPrice = cartElement.querySelector('.counter_input').dataset.price; // цена одного товара
        const inputCountElement = cartElement.querySelector('.counter_input'); // инпут
        const countBalanceElement = cartElement.querySelector('.balance_count'); // количество доступных товаров
        const minusBtnElement = cartElement.querySelector('.btn-minus-js'); // кнопка -
        const plusBtnElement = cartElement.querySelector('.btn-plus-js'); // кнопка +
        const priceWithoutDiscountElement = cartElement.querySelector('.item-total-price-js'); //стоимость без скидок
        const discountPriceElement = cartElement.querySelector('.discount-js'); // скидка обычная
        
        const discountBayerPriceElement = cartElement.querySelector('.bayer-discount-js'); // скидка продавца

        // Функция для блокировки кнопки
        const addDisabled = (el) => {
            el.classList.add('disabled');
            el.setAttribute('disabled', '');
            return;
        }


        // Функция проверки на блокировки  "минус"
        const checkDecrement = (value) => {
            if (Number(value) === 1) {
                addDisabled(minusBtnElement);
                return false;
            }
            return true;
        };

        // Функция проверки нажатия на "плюс"
        const checkIncrement = (value) => {
            const availableCount = Number(countBalanceElement.textContent);

            if ((availableCount !== '') && (Number(value) === availableCount)) {
                addDisabled(plusBtnElement);
                return false;
            }

            return true;
        }

        // Рассчет стоимости товара без скидки
        const calculatePriceWithoutDiscount = (value) => {
            return `${setNormalPrice(parseInt(Number(value) * Number(oneGoodPrice)))} сом`
        };


        // Расчет скидки на товар
        const calculateDiscount = (value, discount) => {
            const price = setPriceWithoutSpaces(value);
            return `${setNormalPrice(parseInt((price * discount) / 100))} сом`;
        }

        // Добавление класса для стоимости товара в зависимости от разряда
        const checkPlaceNumber = (value) => {
            const number = setPriceWithoutSpaces(value);
            const isContains = goodPriceElement.classList.contains('good_price-item--large');

            if (String(number).length > 3 && !isContains) {
                goodPriceElement.classList.add('good_price-item--large');
            } else {
                goodPriceElement.classList.remove('good_price-item--large');
            }
        };

        // Расчет стоимости товаров со скидкой
        const calculatePrice = (price, discountOne, discountTwo) => {
            const totalDiscount = setPriceWithoutSpaces(discountOne) - setPriceWithoutSpaces(discountTwo);
            const total = setPriceWithoutSpaces(price);

            return `${setNormalPrice(total - totalDiscount)} сом`;
        };

        const changeGoodsCount = () => {

            if (evt.target.classList.contains('btn-minus-js')) {
                console.log('minus');

                if (checkDecrement(inputCountElement.value)) {
                    inputCountElement.value--;
                }
                console.log("check inputCountElement.value");
            } else if (evt.target.classList.contains('btn-plus-js')) {
                console.log('plus');

                if (checkIncrement(inputCountElement.value)) {
                    inputCountElement.value++;
                };
                console.log("check inputCountElement");

            }

            priceWithoutDiscountElement.textContent = calculatePriceWithoutDiscount(inputCountElement.value);
            console.log('priceWithoutDiscountElement', priceWithoutDiscountElement.textContent);

            discountPriceElement.textContent = calculateDiscount(priceWithoutDiscountElement.textContent, 55);
            console.log('discountPriceElement', discountPriceElement.textContent);

            discountBayerPriceElement.textContent = calculateDiscount(priceWithoutDiscountElement.textContent, 10);
            console.log('discountBayerPriceElement', discountBayerPriceElement.textContent);

            goodPriceElement.textContent = calculatePrice(priceWithoutDiscountElement.textContent, discountPriceElement.textContent, discountBayerPriceElement.textContent);
            console.log('goodPriceElement', goodPriceElement.textContent);

            checkPlaceNumber(goodPriceElement.textContent);
            console.log('check class');
        }
        changeGoodsCount();


    });
}




const init = () => {
    let totalCount = 0;
    let totalPrice = 0;

    [...goodsOnElement].forEach(good => {
        totalCount += Number(good.querySelector('.counter_input').value);
        totalPrice += Number(setPriceWithoutSpaces(good.querySelector('.item-price-js').textContent));
    });

    totalPriceElement.textContent = `${setNormalPrice(totalPrice)} сом`;
    totalCountElement.textContent = `${setNormalPrice(totalCount)} ${getPluralWord(totalCount, 'товар', 'товара', 'товаров')}`;

};



export { init, onCartClick };




