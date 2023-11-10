const decreaseGoodCount = () => {
    let count = inputCountElement.value;
    let priceWithoutDiscount = priceWithoutDiscountElement.textContent;
    let discount = discountPriceElement.textContent;
    let bayerDiscount = discountBayerPriceElement.textContent;
    let price = goodPriceElement.textContent;

    if (evt.target.classList.contains('btn-minus-js')) {
        console.log('ninus');

        checkDecrement(count); 
        console.log("check count");

        count--;          

        priceWithoutDiscount = calculatePriceWithoutDiscount(count);
        console.log('priceWithoutDiscount', priceWithoutDiscount);

        discount = calculateDiscount(priceWithoutDiscount, 55);
        console.log('discount', discount);

        bayerDiscount = calculateDiscount(priceWithoutDiscount, 10);
        console.log('bayerDiscount', bayerDiscount);

        price = calculatePrice(priceWithoutDiscount, discount, bayerDiscount);
        console.log('price', price);

        checkPlaceNumber(price);
        console.log('check class')
    }
};

const increaseGoodCount = () => {
    let count = inputCountElement.value;
    let priceWithoutDiscount = priceWithoutDiscountElement.textContent;
    let discount = discountPriceElement.textContent;
    let bayerDiscount = discountBayerPriceElement.textContent;
    let price = goodPriceElement.textContent;

    if (evt.target.classList.contains('btn-plus-js')) {
        console.log('plus');

        checkIncrement(count); 
        console.log("check count");

        count++;          

        priceWithoutDiscount = calculatePriceWithoutDiscount(count);
        console.log('priceWithoutDiscount', priceWithoutDiscount);

        discount = calculateDiscount(priceWithoutDiscount, 55);
        console.log('discount', discount);

        bayerDiscount = calculateDiscount(priceWithoutDiscount, 10);
        console.log('bayerDiscount', bayerDiscount);

        price = calculatePrice(priceWithoutDiscount, discount, bayerDiscount);
        console.log('price', price);

        checkPlaceNumber(price);
        console.log('check class')
    }
};