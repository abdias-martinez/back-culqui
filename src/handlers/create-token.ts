import { APIGatewayProxyEvent } from 'aws-lambda'
import mongoConnect from '../db/mongo'
import Card from '../models/credits-cards'
import { validateTokenCommerce, isValidCreditCard } from '../utilities/validators'
import { MessageUtil } from '../utilities/message'
import { generateToken } from '../utilities/generate-token'

export const lambda_handler = async (event: APIGatewayProxyEvent) => {
    try {
        const tokenCommerce = event.headers['Authorization'] || '';
        const body: any = event.body;

        // valida el comercio
        if(!validateTokenCommerce(tokenCommerce)) {
            return MessageUtil.badRequestResponse(
                'PK Invalido! Comercio no permitido.'
              );
        }

        //validar tarjeta de crédito
        const validCredit = isValidCreditCard(body)
        if( !validCredit.valid) {
            return MessageUtil.badRequestResponse(validCredit.message);
        }
        await mongoConnect()
        
        const tokenCard = generateToken()
        const newCard = new Card({ token: tokenCard, ...body});

        await newCard.save();
        console.log('llega')

        return MessageUtil.successfulResponse('Registrado correctamente', tokenCard);
    } catch (error) {
        return MessageUtil.badRequestResponse('Error', error);
    }
}