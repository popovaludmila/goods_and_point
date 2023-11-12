const form = document.querySelector('#form');
const nameInput = form.querySelector('#name');
const surnameInput = form.querySelector('#surname');
const emailInput = form.querySelector('#email');
const phoneInput = form.querySelector('#phone');
const innInput = form.querySelector('#inn');

const nameLabel = form.querySelector('.form_label--name');
const surnameLabel = form.querySelector('.form_label--surname');
const emailLabel = form.querySelector('.form_label--email');
const phoneLabel = form.querySelector('.form_label--phone');
const innLabel = form.querySelector('.form_label--inn');

const validateForm = () => {

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        emptyValidate(nameInput, nameLabel, 'Укажите имя', 'Укажите имя');
        emptyValidate(surnameInput, surnameLabel, 'Введите фамилию', 'Введите фамилию');

        emptyValidate(emailInput, emailLabel, 'Укажите электронную почту', 'Проверьте адрес электронной почты');
        patternValidate(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/, emailInput, emailLabel, 'Укажите электронную почту', 'Проверьте адрес электронной почты');

        emptyValidate(phoneInput, phoneLabel, 'Укажите номер телефона', 'Формат: +9 999 999 99 99');
        patternValidate(/^\+[1-9]{1}\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/, phoneInput, phoneLabel, 'Укажите номер телефона', 'Формат: +9 999 999 99 99');

        emptyValidate(innInput, innLabel, 'Укажите ИНН', 'Проверьте ИНН');
        patternValidate(/^[1-9]{1}[0-9]{13}$/, innInput, innLabel, 'Укажите ИНН', 'Проверьте ИНН');

        // если есть куда отправить
        // form.submit();
    });
}


function emptyValidate(input, inputLabel, successText, errorText) {

    let value = input.value;

    if (value === '') {
        input.focus();
        inputLabel.textContent = errorText;
        inputLabel.style.opacity = "1";
        inputLabel.style.color = "#f55123";
        input.classList.add('error');
    } else {
        inputLabel.textContent = successText;
        inputLabel.style.opacity = "0";
        inputLabel.style.color = "#000000";
        input.classList.remove('error');
    }
}

function patternValidate(pattern, input, inputLabel, successText, errorText) {
    let value = input.value;
    
    if (!pattern.test(value)) {
        input.focus();
        inputLabel.textContent = errorText;
        inputLabel.style.opacity = "1";
        inputLabel.style.color = "#f55123";
        input.classList.add('error');
    } else {
        inputLabel.textContent = successText;
        inputLabel.style.opacity = "0";
        inputLabel.style.color = "#000000";
        input.classList.remove('error');
        console.log(`Вы ввелли корректное значение`);
    }
}

export { validateForm };