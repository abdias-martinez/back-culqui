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
exports.lambda_handler = void 0;
const mongo_1 = __importDefault(require("../db/mongo"));
const credits_cards_1 = __importDefault(require("../models/credits-cards"));
const validators_1 = require("../utilities/validators");
const message_1 = require("../utilities/message");
const generate_token_1 = require("../utilities/generate-token");
const lambda_handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenCommerce = event.headers['c-token'] || '';
        const body = event.body;
        // valida el comercio
        if (!(0, validators_1.validateTokenCommerce)(tokenCommerce)) {
            return message_1.MessageUtil.badRequestResponse('PK Invalido! Comercio no permitido.');
        }
        //validar tarjeta de crédito
        const validCredit = (0, validators_1.isValidCreditCard)(body);
        if (!validCredit.valid) {
            return message_1.MessageUtil.badRequestResponse(validCredit.message);
        }
        yield (0, mongo_1.default)();
        const tokenCard = (0, generate_token_1.generateToken)();
        const newCard = new credits_cards_1.default(Object.assign({ token: tokenCard }, body));
        yield newCard.save();
        return message_1.MessageUtil.successfulResponse('Registrado correctamente', tokenCard);
    }
    catch (error) {
        return message_1.MessageUtil.badRequestResponse('Error', error);
    }
});
exports.lambda_handler = lambda_handler;
