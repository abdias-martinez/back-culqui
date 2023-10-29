"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenCommerce = exports.isValidCardNumber = exports.isValidCreditCard = void 0;
const CURRENT_YEAR = new Date().getFullYear();
const isValidCreditCard = ({ card_number, cvv, expiration_month, expiration_year, email }) => {
    let valid = true;
    let message = '';
    const validateCvv = /^\d{3,4}$/.test(cvv);
    const validateMonth = !isNaN(expiration_month) && expiration_month >= 1 && expiration_month <= 12;
    const validateYear = !isNaN(expiration_year) && expiration_year >= CURRENT_YEAR && expiration_year <= CURRENT_YEAR + 5;
    const validateEmail = /^[^\s@]+@(gmail\.com|hotmail\.com|yahoo\.es)$/.test(email);
    if (!(0, exports.isValidCardNumber)(card_number)) {
        valid = false;
        message = 'Número de tarjeta no válida';
    }
    if (!validateCvv) {
        valid = false;
        message = 'cvv no válida';
    }
    if (!validateMonth) {
        valid = false;
        message = 'Mes de expiración no válida';
    }
    if (!validateYear) {
        valid = false;
        message = 'Año de expiración no válida';
    }
    if (!validateEmail) {
        valid = false;
        message = 'Email no válida';
    }
    return { valid, message };
};
exports.isValidCreditCard = isValidCreditCard;
const isValidCardNumber = (cardNumber) => {
    if (cardNumber.length < 13 || cardNumber.length > 16)
        return false;
    if (/^\d$/.test(cardNumber))
        return false;
    let sum = 0;
    let doubleUp = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);
        if (doubleUp) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        doubleUp = !doubleUp;
    }
    return sum % 10 === 0;
};
exports.isValidCardNumber = isValidCardNumber;
const validateTokenCommerce = (token) => {
    const REGEX = /^pk_test_[a-zA-Z0-9]{16}$/;
    const isCorrect = REGEX.test(token);
    return isCorrect;
};
exports.validateTokenCommerce = validateTokenCommerce;
