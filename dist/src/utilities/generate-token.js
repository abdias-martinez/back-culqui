"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const generateToken = () => {
    const CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const TOKEN_LENGTH = 16;
    const UNIQUE_SET = new Set();
    let token = '';
    while (token.length < TOKEN_LENGTH) {
        const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
        const randomChar = CHARACTERS[randomIndex];
        if (!UNIQUE_SET.has(randomChar)) {
            token += randomChar;
            UNIQUE_SET.add(randomChar);
        }
    }
    return `pk_test_${token}`;
};
exports.generateToken = generateToken;
