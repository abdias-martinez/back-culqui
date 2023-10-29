"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_token_1 = require("../handlers/create-token");
const validators_1 = require("../utilities/validators");
const mongo_1 = __importDefault(require("../db/mongo"));
jest.mock('../utilities/validators');
jest.mock('../utilities/generate-token');
jest.mock('../db/mongo');
jest.mock('../models/credits-cards');
jest.mock('mongoose', () => {
    const actualMongoose = jest.requireActual('mongoose');
    return Object.assign(Object.assign({}, actualMongoose), { model: jest.fn() });
});
describe('lambda_handler', () => {
    const mockEvent = { headers: { 'c-token': 'dfgsgf' }, body: {} };
    it('should return bad request response if token commerce is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        validators_1.validateTokenCommerce.mockReturnValue(false);
        const result = yield (0, create_token_1.lambda_handler)(mockEvent);
        expect(result).toEqual({
            statusCode: 400,
            body: JSON.stringify({ ok: false, message: 'PK Invalido! Comercio no permitido.' }),
        });
    }));
    it('should return bad request response if credit card is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        validators_1.validateTokenCommerce.mockReturnValue(true);
        validators_1.isValidCreditCard.mockReturnValue({ ok: false, message: 'Invalid credit card' });
        const result = yield (0, create_token_1.lambda_handler)(mockEvent);
        expect(result).toEqual({
            statusCode: 400,
            body: JSON.stringify({ ok: false, message: 'Invalid credit card' }),
        });
    }));
    it('should return bad request response on error', () => __awaiter(void 0, void 0, void 0, function* () {
        validators_1.validateTokenCommerce.mockReturnValue(true);
        validators_1.isValidCreditCard.mockReturnValue({ valid: true });
        mongo_1.default.mockRejectedValue(new Error('Database error'));
        const result = yield (0, create_token_1.lambda_handler)(mockEvent);
        expect(result).toEqual({
            statusCode: 400,
            body: JSON.stringify({ ok: false, message: 'Error', data: {} }),
        });
    }));
});
