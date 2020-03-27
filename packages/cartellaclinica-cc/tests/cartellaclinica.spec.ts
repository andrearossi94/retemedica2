// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Cartellaclinica, CartellaclinicaController } from '../src';

describe('Cartellaclinica', () => {
  let adapter: MockControllerAdapter;
  let cartellaclinicaCtrl: ConvectorControllerClient<CartellaclinicaController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    cartellaclinicaCtrl = ClientFactory(CartellaclinicaController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'CartellaclinicaController',
        name: join(__dirname, '..')
      }
    ]);

    adapter.addUser('Test');
  });
  
  it('should create a default model', async () => {
    const modelSample = new Cartellaclinica({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await cartellaclinicaCtrl.$withUser('Test').create(modelSample);
  
    const justSavedModel = await adapter.getById<Cartellaclinica>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});