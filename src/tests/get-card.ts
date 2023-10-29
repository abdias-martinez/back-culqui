import { lambda_handler } from '../handlers/get-card'; // Asegúrate de especificar la ruta correcta
import mongoConnect from '../db/mongo';
import Card from '../models/credits-cards';
import { MessageUtil } from '../utilities/message';
import { validateTokenCommerce } from '../utilities/validators';
import { Model } from 'mongoose';

jest.mock('../db/mongo');
jest.mock('../models/credits-cards');
jest.mock('../utilities/message');
jest.mock('../utilities/validators');

describe('lambda_handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return "PK Invalido! Comercio no permitido." when invalid tokenCommerce', async () => {
    const mockEvent: any = {
      headers: {
        'c-token': 'invalidToken',
        'x-token': 'validToken',
      },
    };

    (validateTokenCommerce as jest.Mock).mockReturnValue(false);

    const result = await lambda_handler(mockEvent);

    expect(MessageUtil.badRequestResponse).toHaveBeenCalledWith('PK Invalido! Comercio no permitido.');
    expect(result).toEqual(MessageUtil.badRequestResponse('PK Invalido! Comercio no permitido.'));
  });
});