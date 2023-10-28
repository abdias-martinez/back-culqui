"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validators_1 = require("../utilities/validators");
const CURRENT_YEAR = new Date().getFullYear();
const CardSchema = new mongoose_1.Schema({
    card_number: {
        type: String,
        required: [true, 'El número de tarjeta es obligatorio.'],
        maxlength: [16, 'El número de tarjeta no puede tener más de 16 caracteres'],
        validate: {
            validator: function (value) {
                return (0, validators_1.isValidCardNumber)(value);
            },
            message: 'El número de tarjeta no es válida.'
        }
    },
    cvv: {
        type: String,
        required: [true, 'El cvv es obligatorio.'],
        maxlength: [4, 'El CVV no puede tener más de 4 caracteres']
    },
    expiration_month: {
        type: Number,
        required: [true, 'El mes es obligatorio.'],
        maxlength: [2, 'El mes de expiración no puede tener más de 2 caracteres'],
        validate: {
            validator: function (value) {
                return !isNaN(value) && value >= 1 && value <= 12;
            },
            message: 'El mes de expiración debe estar entre 1 y 12.'
        }
    },
    expiration_year: {
        type: Number,
        required: [true, 'El año es obligatorio.'],
        maxlength: [4, 'El año de expiración no puede tener más de 4 caracteres'],
        validate: {
            validator: function (value) {
                return !isNaN(value) && value >= CURRENT_YEAR && value <= CURRENT_YEAR + 5;
            },
            message: 'El año de expiración debe ser el año actual o hasta 5 años posteriores.'
        }
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio.'],
        maxlength: [100, 'El email no puede tener más de 50 caracteres'],
        validate: {
            validator: function (value) {
                const EMAIL_REGEX = /^[^\s@]+@(gmail\.com|hotmail\.com|yahoo\.es)$/;
                return EMAIL_REGEX.test(value);
            },
            message: 'El correo electrónico no es válido o no pertenece a los dominios permitidos: gmail.com, hotmail.com, yahoo.es'
        }
    },
    token: {
        type: String,
        required: [true, 'El token es obligatorio.'],
    }
}, {
    timestamps: true,
    versionKey: false,
});
CardSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, object = __rest(_a, ["__v", "_id"]);
    const uid = _id;
    const card = Object.assign(Object.assign({}, object), { uid });
    return card;
};
exports.default = (0, mongoose_1.model)('Card', CardSchema);
