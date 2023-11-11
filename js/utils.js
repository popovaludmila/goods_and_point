const setRandomId = () => {
    return Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
};

const setPriceWithoutSpaces = (str) => {
    return str.replace('сом', '').replace(/\s+/g, '');
};

const setNormalPrice = (str) => {
    return String(str).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');;
};

const getPluralWord = (number, one, two, multiple) => {
    switch (true) {
        case ((number % 100) >= 10 && (number % 100) <= 20):
            return multiple;
        case ((number % 10) >= 2 && (number % 10) <= 4):
            return two;
        case ((number % 10) === 1):
            return one;
        default:
            return multiple;
    }
};


export { setRandomId, setPriceWithoutSpaces, setNormalPrice, getPluralWord };