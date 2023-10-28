"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenCommerce = void 0;
const validateTokenCommerce = (token) => {
    const REGEX = /^pk_test_[a-zA-Z0-9]{16}$/;
    const isCorrect = REGEX.test(token);
    return isCorrect;
};
exports.validateTokenCommerce = validateTokenCommerce;
