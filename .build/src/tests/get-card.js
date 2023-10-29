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
Object.defineProperty(exports, "__esModule", { value: true });
const get_card_1 = require("../handlers/get-card"); // Asegúrate de especificar la ruta correcta
const message_1 = require("../utilities/message");
const validators_1 = require("../utilities/validators");
jest.mock('../db/mongo');
jest.mock('../models/credits-cards');
jest.mock('../utilities/message');
jest.mock('../utilities/validators');
describe('lambda_handler', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return "PK Invalido! Comercio no permitido." when invalid tokenCommerce', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockEvent = {
            headers: {
                'c-token': 'invalidToken',
                'x-token': 'validToken',
            },
        };
        validators_1.validateTokenCommerce.mockReturnValue(false);
        const result = yield (0, get_card_1.lambda_handler)(mockEvent);
        expect(message_1.MessageUtil.badRequestResponse).toHaveBeenCalledWith('PK Invalido! Comercio no permitido.');
        expect(result).toEqual(message_1.MessageUtil.badRequestResponse('PK Invalido! Comercio no permitido.'));
    }));
});
