// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Personale, PersonaleController } from '../src';

describe('Personale', () => {
  let adapter: MockControllerAdapter;
  let personaleCtrl: ConvectorControllerClient<PersonaleController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    personaleCtrl = ClientFactory(PersonaleController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'PersonaleController',
        name: join(__dirname, '..')
      }
    ]);

    adapter.addUser('Test');
  });
  
  it('should create a default model', async () => {
    const modelSample = new Personale({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await personaleCtrl.$withUser('Test').create(modelSample);
  
    const justSavedModel = await adapter.getById<Personale>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});