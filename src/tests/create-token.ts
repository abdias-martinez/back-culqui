import { lambda_handler } from '../handlers/create-token';
import { validateTokenCommerce, isValidCreditCard } from '../utilities/validators';
import mongoConnect from '../db/mongo';

jest.mock('../utilities/validators');
jest.mock('../utilities/generate-token');
jest.mock('../db/mongo');
jest.mock('../models/credits-cards');

jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    model: jest.fn(),
  };
});

describe('lambda_handler', () => {
    const mockEvent: any = { headers: { 'c-token': 'dfgsgf' }, body: {} };

    it('should return bad request response if token commerce is invalid', async () => {
        (validateTokenCommerce as jest.Mock).mockReturnValue(false);

        const result = await lambda_handler(mockEvent);

        expect(result).toEqual({
            statusCode: 400,
            body: JSON.stringify({ok: false, message: 'PK Invalido! Comercio no permitido.'}),
        });
    });

    it('should return bad request response if credit card is invalid', async () => {
        (validateTokenCommerce as jest.Mock).mockReturnValue(true);
        (isValidCreditCard as jest.Mock).mockReturnValue({ ok: false, message: 'Invalid credit card' });

        const result = await lambda_handler(mockEvent);

        expect(result).toEqual({
            statusCode: 400,
            body: JSON.stringify({ok: false, message: 'Invalid credit card'}),
        });
    });

    it('should return bad request response on error', async () => {
        (validateTokenCommerce as jest.Mock).mockReturnValue(true);
        (isValidCreditCard as jest.Mock).mockReturnValue({ valid: true });
        (mongoConnect as jest.Mock).mockRejectedValue(new Error('Database error'));

        const result = await lambda_handler(mockEvent);

        expect(result).toEqual({
            statusCode: 400,
            body: JSON.stringify({ok: false, message: 'Error', data: {}}),
        });
    });
});