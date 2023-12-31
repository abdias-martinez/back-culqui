import { Schema, model } from 'mongoose'
import { isValidCardNumber } from '../utilities/validators'

export interface Card extends Document {
    card_number: string;
    cvv: string;
    expiration_month: number;
    expiration_year: number;
    email: string;
    token: string;
}

const CURRENT_YEAR = new Date().getFullYear();

const CardSchema = new Schema({
    card_number: {
        type: String,
        required: [true, 'El número de tarjeta es obligatorio.'],
        maxlength: [16, 'El número de tarjeta no puede tener más de 16 caracteres'],
        validate: {
            validator: function(value: string) {
                return isValidCardNumber(value);
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
            validator: function(value: number) {
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
            validator: function(value: number) {
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
            validator: function(value: string) {
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
},{
    timestamps: true,
    versionKey: false,
})

CardSchema.methods.toJSON = function() {
    const { __v, _id,...object }: any = this.toObject();
    const uid = _id;
    const card = {...object, uid};
    return card;
}

export default model<Card>('Card', CardSchema);