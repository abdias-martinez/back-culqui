import { APIGatewayProxyEvent } from 'aws-lambda'
import mongoConnect from '../db/mongo'
import Card from '../models/credits-cards'
import { MessageUtil } from '../utilities/message'
import { validateTokenCommerce } from '../utilities/validators'

export const lambda_handler = async (event: APIGatewayProxyEvent) => {
    try {
        const tokenCommerce = event.headers['c-token'] || '';
        const tokenCard = event.headers['x-token'] || '';

         // valida el comercio
         if(!validateTokenCommerce(tokenCommerce)) {
            return MessageUtil.badRequestResponse(
                'PK Invalido! Comercio no permitido.'
              );
        }
        await mongoConnect()

        // buscar tarjeta con token
        const findCard = await Card.findOne({ token: tokenCard }).select('card_number cvv expiration_month expiration_year email token').exec();
        if(findCard === null) {
            return MessageUtil.notFoundErrorResponse('Lo sentimos, El elemento solicitado ya no está disponible debido a su expiración.')
        }

        return MessageUtil.successfulResponse('Registro encontrado', findCard);
    } catch (error) {
        return MessageUtil.badRequestResponse('Error', error);
    }
}