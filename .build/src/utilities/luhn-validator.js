"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCardNumber = void 0;
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
