import { isEscapeKey } from "./utils.js";

const bodyElement = document.querySelector('body');

const payModalTemplateElement = document.querySelector('#modal-pay').content.querySelector('.overlay');
const payModalElement = payModalTemplateElement.cloneNode(true);
const closeBtnPayModalElement = payModalElement.querySelector('.close');
const selectBtnPayModalElement = payModalElement.querySelector('.bottom_btn');

const deliveryModalTemplateElement = document.querySelector('#modal-delivery').content.querySelector('.overlay');
const deliveryModalElement = deliveryModalTemplateElement.cloneNode(true);
const closeBtndeliveryModalElement = deliveryModalElement.querySelector('.close');
const selectBtndeliveryModalElement = deliveryModalElement.querySelector('.bottom_btn');

const onPayModalEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
        evt.preventDefault();
        closePayModal();
    }
};

const onDeliveryModalEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
        evt.preventDefault();
        closeDeliveryModal();
    }
};

const onPayBackDropClick = (evt) => {
    if (evt.target === payModalElement) {
        closePayModal();
    }
  };
  
  const onDeliveryBackDropClick = (evt) => {
    if (evt.target === deliveryModalElement) {
        closeDeliveryModal();
    }
  };

  function closePayModal () {
    document.removeEventListener('keydown', onPayModalEscKeydown);
    document.removeEventListener('click', onPayBackDropClick );
    payModalElement.remove();
  }
  
  function closeDeliveryModal () {
    document.removeEventListener('keydown', onDeliveryModalEscKeydown);
    document.removeEventListener('click', onDeliveryBackDropClick);
  
    deliveryModalElement.remove();
  }
  
  const showPayModal = () => {
  
    bodyElement.append(payModalElement);
  
    document.addEventListener('keydown', onPayModalEscKeydown);
    document.addEventListener('click', onPayBackDropClick);
    closeBtnPayModalElement.addEventListener('click', closePayModal);
    selectBtnPayModalElement.addEventListener('click', closePayModal);
  };
  
  const showDeliveryModal = () => {
  
    bodyElement.append(deliveryModalElement);
  
    document.addEventListener('keydown', onDeliveryModalEscKeydown);
    document.addEventListener('click', onDeliveryBackDropClick);
    closeBtndeliveryModalElement.addEventListener('click', closeDeliveryModal);
    selectBtndeliveryModalElement.addEventListener('click', closeDeliveryModal);
  };
  
  export {showPayModal, showDeliveryModal, payModalElement, deliveryModalElement};