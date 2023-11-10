import { toggleAccordeon } from "./accordeon.js";
import {  init, onCartClick } from "./cart.js";

document.addEventListener('DOMContentLoaded', () => {
    init();
    onCartClick();
    toggleAccordeon();
});