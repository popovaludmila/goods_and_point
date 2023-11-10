import { toggleAccordeon } from "./accordeon.js";
import { getPluralWord, setNormalPrice, setPriceWithoutSpaces, setRandomId } from "./utils.js";

document.addEventListener('DOMContentLoaded', () => {
    toggleAccordeon();

    const cartListElement = document.querySelector('.cart_list--on'); // список товаров в наличие
    const cartItemElement = cartListElement.querySelectorAll('.cart_item'); // товары
    const totalPriceElement = document.querySelector('.total-price-js');
    const totalCountElement = document.querySelector('.total-count-js');
    const accordeonCountElement = document.querySelector('.accordeon-count-js');
    const accordeonPriceElement = document.querySelector('.accordeon-price-js');
    const allSelectedElement = document.getElementById('all');
    const checkboxesElement = cartListElement.querySelectorAll('.checkbox-js');

    [...cartItemElement].forEach(item => {
        return item.setAttribute('data-id', setRandomId());
    });

    const update = () => {
        let totalPrice = 0;
        let totalCount = 0;
        let price = 0;
        let count = 0;

        [...cartItemElement].forEach(cartItem => {
            const cartItemChecked = cartItem.querySelector('.checkbox-js').checked;
            const cartItemPrice = Number(setPriceWithoutSpaces(cartItem.querySelector('.item-price-js').textContent));
            const cartItemCount = Number(cartItem.querySelector('.counter_input').value);

            if (cartItemChecked) {
                totalPrice += cartItemPrice;
                totalCount += cartItemCount;
            }

            count += cartItemCount;
            price += cartItemPrice;
        });

        totalCountElement.textContent = `${setNormalPrice(totalCount)} ${getPluralWord(totalCount, 'товар', 'товара', 'товаров')}`;;
        totalPriceElement.textContent = `${setNormalPrice(totalPrice)} сом`;
        accordeonCountElement.textContent = `${setNormalPrice(count)} ${getPluralWord(price, 'товар', 'товара', 'товаров')}`;
        accordeonPriceElement.textContent = `${setNormalPrice(price)} сом`
    }

    update();

    const selectGood = () => {
        [...cartItemElement].forEach(good => {
            const chexboxElement = good.querySelector('.checkbox-js');

            chexboxElement.onclick = () => {

                if (chexboxElement.checked) {
                    chexboxElement.removeAttribute('checked');
                    update();
                    return;
                } else {
                    chexboxElement.setAttribute('checked', '');
                    update();
                    return;
                }
            }
        });
    };

    selectGood();

    const selectAllGoods = () => {
        allSelectedElement.onclick = () => {
            allSelectedElement.setAttribute('checked', '');
            if (!allSelectedElement.checked) {
                checkboxesElement.forEach(item => {
                    item.setAttribute('checked', '');
                });
              
                update();
                return;
            } else {
                checkboxesElement.forEach(item => {
                    item.removeAttribute('checked');
                });
                update();
                return;
            }

        }
    }

    selectAllGoods();

    const changeCount = () => {
        [...cartItemElement].forEach(good => {

            const goodPriceElement = good.querySelector('.item-price-js'); // стоимость товара со скидками
            const oneGoodPrice = good.querySelector('.counter_input').dataset.price; // цена одного товара
            const inputCountElement = good.querySelector('.counter_input'); // инпут
            const countBalanceElement = good.querySelector('.balance_count'); // количество доступных товаров
            const minusBtnElement = good.querySelector('.btn-minus-js'); // кнопка -
            const plusBtnElement = good.querySelector('.btn-plus-js'); // кнопка +
            const priceWithoutDiscountElement = good.querySelector('.item-total-price-js'); //стоимость без скидок
            const discountPriceElement = good.querySelector('.discount-js'); // скидка обычная
            const discountBayerPriceElement = good.querySelector('.bayer-discount-js'); // скидка продавца

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

                if (String(number).length > 3) {
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

            minusBtnElement.addEventListener('click', (evt) => {
                evt.preventDefault();

                plusBtnElement.classList.remove('disabled');
                plusBtnElement.removeAttribute('disabled');

                if (Number(inputCountElement.value) === 1) {
                    minusBtnElement.classList.add('disabled');
                    minusBtnElement.setAttribute('disabled', '');

                    update();

                    return;
                } else {
                    minusBtnElement.classList.remove('disabled');
                    minusBtnElement.removeAttribute('disabled');
                    inputCountElement.value--;
                }


                priceWithoutDiscountElement.textContent = calculatePriceWithoutDiscount(inputCountElement.value);

                discountPriceElement.textContent = calculateDiscount(priceWithoutDiscountElement.textContent, 55);

                discountBayerPriceElement.textContent = calculateDiscount(priceWithoutDiscountElement.textContent, 10);

                goodPriceElement.textContent = calculatePrice(priceWithoutDiscountElement.textContent, discountPriceElement.textContent, discountBayerPriceElement.textContent);

                checkPlaceNumber(goodPriceElement.textContent);

                update();
            });

            plusBtnElement.addEventListener('click', (evt) => {
                evt.preventDefault();

                minusBtnElement.classList.remove('disabled');
                minusBtnElement.removeAttribute('disabled');

                if ((countBalanceElement.textContent !== '') && (Number(inputCountElement.value) === Number(countBalanceElement.textContent))) {
                    plusBtnElement.classList.add('disabled');
                    plusBtnElement.setAttribute('disabled', '');

                    update();
                    return;
                } else {
                    plusBtnElement.classList.remove('disabled');
                    plusBtnElement.removeAttribute('disabled');
                    inputCountElement.value++;
                }

                priceWithoutDiscountElement.textContent = calculatePriceWithoutDiscount(inputCountElement.value);

                discountPriceElement.textContent = calculateDiscount(priceWithoutDiscountElement.textContent, 55);

                discountBayerPriceElement.textContent = calculateDiscount(priceWithoutDiscountElement.textContent, 10);

                goodPriceElement.textContent = calculatePrice(priceWithoutDiscountElement.textContent, discountPriceElement.textContent, discountBayerPriceElement.textContent);

                checkPlaceNumber(goodPriceElement.textContent);

                update();
            });
        });
    };
    changeCount();

});