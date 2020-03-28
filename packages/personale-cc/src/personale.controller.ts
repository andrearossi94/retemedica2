import * as yup from 'yup';

import {
  Controller,
  ConvectorController,
  Invokable,
  Param,
  BaseStorage
} from '@worldsibu/convector-core';

import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';

import { Personale } from './personale.model';
import { ClientIdentity } from 'fabric-shim';

@Controller('personale')
export class PersonaleController extends ConvectorController<ChaincodeTx> {
  

  @Invokable()
  public async register(
    @Param(Personale)
    personale: Personale

   /* @Param(yup.string())
    id: string,
    @Param(yup.string())
    nome: string,
    @Param(yup.string())
    cognome: string,
    @Param(yup.string())
    cognome: string,*/
    /*@Param(yup.string())
    pato: string*/
  ) {
    // Retrieve to see if exists
    const existing = await Personale.getOne(personale.id);  //si dovrebbe lasciare a personale e non dottore

    if (!existing || !existing.id) {
      //let personale = new Personale();
      /*personale.id = id;
      personale.nome = nome;
      personale.cognome = cognome;*/
      //personale.patologia = pato
      
      /*const existsUsername = await Personale.query(Personale, {
        selector: {
          type: 'io.worldsibu.examples.personale',
          username: personale.username,
          /*personale: {
            id: personale.id
          }
        }
      });
      if (existsUsername /*|| !existing.id ) {
        throw new Error('There is a person registered with that username already');
      }*/

      personale.msp = this.tx.identity.getMSPID();
      // Create a new identity
      personale.identities = [{
        fingerprint: this.sender,
        status: true
      }];
      console.log(JSON.stringify(personale));
      await personale.save();
    } else {
      throw new Error('this paziente exists already');
    }
  }


  @Invokable()
  public async get(
    @Param(yup.string())
    id: string
  ) {
    //let personale = await Personale.getOne(id);    
    let persona = await Personale.getOne(id);
    if(!!persona){
      return persona;
    }else{
      throw new Error(`Identity does not exist`);
    }
    //return await Cartellaclinica.getOne(id);
  }
}
