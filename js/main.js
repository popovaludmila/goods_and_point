import { toggleAccordeon } from "./accordeon.js";
import { showDeliveryModal, showPayModal } from "./modal.js";
import { getPluralWord, setNormalPrice, setPriceWithoutSpaces, setRandomId } from "./utils.js";
import { validateForm } from "./validation.js";

document.addEventListener('DOMContentLoaded', () => {
    const cartListElement = document.querySelector('.cart_list--on'); // список товаров в наличие
    const cartListOffElement = document.querySelector('.cart_list--off'); // список отсутствующих товаров
    const orderElement = document.querySelector('.order'); // блок "Итого"
    const cartItemElement = cartListElement.querySelectorAll('.cart_item'); // товары в корзине
    const cartItemOffElement = cartListOffElement.querySelectorAll('.cart_item'); // отсутствующие товары
    const totalPriceElement = orderElement.querySelector('.total-price-js'); //общая стоимость со скидкой выбранных товаров
    const totalCountElement = orderElement.querySelector('.total-count-js'); // общее количество
    const accordeonCountElement = document.querySelector('.accordeon-count-js'); //общее количество в шапке
    const accordeonPriceElement = document.querySelector('.accordeon-price-js'); // общая стоимость в шапке
    const allSelectedElement = document.getElementById('all'); // чекбокс "выбрать все"
    const checkboxesElement = cartListElement.querySelectorAll('.checkbox-js'); // чекбоксы у карточек товаров
    const totalPriceWithoutDiscountElement = orderElement.querySelector('.order-price-js'); // общая стоимость товаров без скидки
    const totalDiscountElement = orderElement.querySelector('.total-discount-js'); // общая скидка
    const headerCountElement = document.querySelector('.header-count-js'); // количество товаров в корзине в шапке
    const footerCountElement = document.querySelector('.footer-count-js'); // количество товаров в корзине в футере
    const countOffElement = document.querySelector('.count-off-js'); // количество отсутствующих товаров
    const cartOffTitleElement = document.querySelector('.cart_subtitle--off'); // текст "Отсутствуют _ товаров"
    const orderBtn = orderElement.querySelector('.order_button'); // кнопка для заказа
    const orderChexbox = orderElement.querySelector('#payment-immediately'); // чекбокс "списать оплату сразу"
    const changeBtnDeliveryElement = document.querySelectorAll('.delivery-btn-js'); // кнопки изменения доставки
    const changeBtnPaymentElement = document.querySelectorAll('.payment-btn-js'); // кнопки изменения оплаты

    const update = () => {
        let totalPrice = 0; // общая стоимость выбранных товаров со скидкой
        let totalCount = 0; // общее количество выбранных товаров
        let totalDiscount = 0; // общая скидка выбранных товаров
        let totalPriceWithoutDiscount = 0; // общая стоимость выбранных товаров без скидки

        let price = 0; // общая стоимость в шапке
        let count = 0; // общее количество в шапке


        [...cartListElement.querySelectorAll('.cart_item')].forEach(cartItem => {
            const cartItemChecked = cartItem.querySelector('.checkbox-js').checked;
            const cartItemPrice = Number(setPriceWithoutSpaces(cartItem.querySelector('.item-price-js').textContent));
            const cartItemCount = Number(cartItem.querySelector('.counter_input').value);
            const cartPriceWithoutDiscount = Number(setPriceWithoutSpaces(cartItem.querySelector('.item-total-price-js').textContent));


            if (cartItemChecked) {
                totalPrice += cartItemPrice;
                totalCount += cartItemCount;
                totalPriceWithoutDiscount += cartPriceWithoutDiscount;
            }

            count += cartItemCount;
            price += cartItemPrice;
        });

        totalDiscount = totalPriceWithoutDiscount - totalPrice;

        totalCountElement.textContent = `${setNormalPrice(totalCount)} ${getPluralWord(totalCount, 'товар', 'товара', 'товаров')}`;;
        totalPriceElement.textContent = `${setNormalPrice(totalPrice)} сом`;
        accordeonCountElement.textContent = `${setNormalPrice(count)} ${getPluralWord(price, 'товар', 'товара', 'товаров')}`;
        accordeonPriceElement.textContent = `${setNormalPrice(price)} сом`;
        totalPriceWithoutDiscountElement.textContent = `${setNormalPrice(totalPriceWithoutDiscount)} сом`;
        totalDiscountElement.textContent = `−${setNormalPrice(totalDiscount)} сом`;
        headerCountElement.textContent = setNormalPrice(totalCount);
        footerCountElement.textContent = setNormalPrice(totalCount);

        if (orderChexbox.checked) {
            orderBtn.textContent = `Оплатить ${totalPriceElement.textContent}`;
        }
    }
    update();

    toggleAccordeon();

    // Изменить способ доставки
    const changeDelivery = () => {
        changeBtnDeliveryElement.forEach(btn => {

            btn.addEventListener('click', showDeliveryModal)
        })
    };
    changeDelivery();

    // Изменить способ оплаты
    const changePayment = () => {
        changeBtnPaymentElement.forEach(btn => {

            btn.addEventListener('click', showPayModal)
        })
    };
    changePayment();

    // Функция выбора товара в корзине
    const selectGood = () => {

        [...cartItemElement].forEach(good => {
            const chexboxElement = good.querySelector('.checkbox-js');

            chexboxElement.onclick = () => {
                if (!chexboxElement.checked) {
                    if (allSelectedElement.checked) {
                        allSelectedElement.checked = false;
                    }
                }
                update();
            }
        });
    };
    selectGood();

    // Выбрать все 
    const selectAllGoods = () => {
        allSelectedElement.onclick = () => {
            allSelectedElement.toggleAttribute('checked', '');

            if (allSelectedElement.checked) {
                checkboxesElement.forEach(item => {
                    if (!item.checked) {
                        item.checked = true
                    }
                });
            } else {
                checkboxesElement.forEach(item => {
                    if (item.checked) {
                        item.checked = false;
                    }
                });
            }
            update();
        }
    }
    selectAllGoods();


    // Функция удаления товаров в корзине
    const removeGood = () => {
        [...cartItemElement].forEach(good => {

            const removeBtn = good.querySelector('.btn-delete-js');
            const chexboxElement = good.querySelector('.checkbox-js');

            removeBtn.addEventListener('click', (e) => {
                e.preventDefault();

                good.remove();
                chexboxElement.checked = false;
                update();
            })
        });
    }
    removeGood();

    // Функция удаления отсутсвующих товаров в корзине
    const removeGoodOff = () => {
        let count = Number(setPriceWithoutSpaces(countOffElement.textContent));

        [...cartItemOffElement].forEach(good => {

            const removeBtn = good.querySelector('.btn-delete-js');

            removeBtn.addEventListener('click', (e) => {
                e.preventDefault();

                good.remove();
                count--;
                cartOffTitleElement.textContent = `${getPluralWord(count, 'Отсутствует', 'Отсутствуют', 'Отсутствуют')} ${setNormalPrice(count)} ${getPluralWord(count, 'товар', 'товара', 'товаров')}`;
            })
        });
    };
    removeGoodOff();

    // Функция измениния количества товаров в корзине
    const changeCount = () => {
        [...cartItemElement].forEach(good => {

            const goodPriceElement = good.querySelector('.item-price-js'); // стоимость товара со скидками
            const oneGoodPriceElement = good.querySelector('.counter_input').dataset.price; // цена одного товара
            const inputCountElement = good.querySelector('.counter_input'); // инпут
            const countBalanceElement = good.querySelector('.balance_count'); // количество доступных товаров
            const minusBtnElement = good.querySelector('.btn-minus-js'); // кнопка -
            const plusBtnElement = good.querySelector('.btn-plus-js'); // кнопка +
            const priceWithoutDiscountElement = good.querySelector('.item-total-price-js'); //стоимость без скидок
            const discountPriceElement = good.querySelector('.discount-js'); // скидка обычная
            const discountBayerPriceElement = good.querySelector('.bayer-discount-js'); // скидка продавца

            // Рассчет стоимости товара без скидки
            const calculatePriceWithoutDiscount = (value) => {
                return `${setNormalPrice(parseInt(Number(value) * Number(oneGoodPriceElement)))} сом`
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

    // Функция выбора оплаты сразу
    const selectOrderPayment = () => {
        orderChexbox.onclick = () => {
            if (orderChexbox.checked) {
                update();
                orderBtn.textContent = `Оплатить ${totalPriceElement.textContent}`;
            } else {
                orderBtn.textContent = `Заказать`;
            }
        };
    };
    selectOrderPayment();

    validateForm();

});