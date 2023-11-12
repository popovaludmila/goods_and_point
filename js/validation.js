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

const namePrompt = form.querySelector('.prompt-name');
const surname = form.querySelector('.prompt-surname');
const emailPrompt = form.querySelector('.prompt-email');
const phonePrompt = form.querySelector('.prompt-phone');
const innPrompt = form.querySelector('.prompt-inn');



const validateForm = () => {
    nameInput.onfocus = () => namePrompt.classList.add('active');

    console.log(12312);

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        console.log(222);

        if (!emailPrompt.checkValidity()) {
            alert("неверная почта");
        }

        if (!inputCheck(nameInput)) {
            nameInput.classList.add('error');
            nameLabel.textContent = 'Укажите имя';
            nameLabel.classList.add('error-text');
        } else {
            nameInput.classList.remove('error');
            nameLabel.textContent = 'Укажите имя'
        }

        form.submit();
    });
}

function inputCheck(el) {
    const inputValue = el.value;
    const inputPattern = el.getAttribute("pattern");
    const pattern = new RegExp(inputPattern);

    pattern.test(inputValue);
};
export { validateForm };