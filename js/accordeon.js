const accordionBtnsElement = document.querySelectorAll('.accordion_button'); // кнопка аккордеона

const toggleAccordeon = () => {
    [...accordionBtnsElement].forEach(el => {
        el.addEventListener('click', (e) => {
            const self = e.currentTarget;
            const cartContainer = self.closest('.cart');

            const cartList = cartContainer.querySelector('.cart_list');
            const openedEl = cartContainer.querySelector('.title_opened');
            const closedEl = cartContainer.querySelector('.checkbox_closed');

            if (openedEl) {
                if (cartList.classList.contains('cart_list--close')) {
                    openedEl.classList.add('visually-hidden');
                } else {
                    openedEl.classList.remove('visually-hidden');
                }
            }

            if (closedEl) {
                if (cartList.classList.contains('cart_list--close')) {
                    closedEl.classList.remove('visually-hidden');
                } else {
                    closedEl.classList.add('visually-hidden');
                }
            }

            if (cartList.classList.contains('cart_list--close')) {
                cartList.classList.remove('cart_list--close');
                self.classList.remove('accordion_button--rotate');
            } else {
                cartList.classList.add('cart_list--close');
                self.classList.add('accordion_button--rotate');
            }
        })
    });
}

export {toggleAccordeon};


