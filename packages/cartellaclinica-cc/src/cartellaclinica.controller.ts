import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';

import { Cartellaclinica } from './cartellaclinica.model';
import { Personale } from 'personale-cc';
//import { getPersonaByIdentity} from './utils';

@Controller('cartellaclinica')
export class CartellaclinicaController extends ConvectorController {
  @Invokable()
  public async create(
    @Param(Cartellaclinica)
    cartellaclinica: Cartellaclinica,
    @Param(yup.string())
    username: string,
    @Param(yup.string())
    password: string
  ) {
    // query to fetch username and password related to username in the parameters    
    const exists = await Personale.query(Personale, {
      selector: {
        type: 'io.worldsibu.personale',
        ['username']: username
      }
    });
    // if i find nothing throw an error else that person's model is inside exist[0]
    if ((exists as Personale[]).length <= 0) {
      throw new Error('There isn\'t a person registered with that id');
    }
    // get the fingerprint of the person queried 
    const realdoctor = exists[0].identities.filter(identity => identity.status === true)[0];
    //check if the credential are correct and the fingerprint is the same as the one who calls the function 
    if(exists[0].username === username && exists[0].password === password && realdoctor.fingerprint === this.sender){
      // check if the medical record already exists
      let cc = await Cartellaclinica.getOne(cartellaclinica.id);      
      if (cc.id) {
        throw new Error(`Cartellaclinica with id ${cartellaclinica.id} does already exist`);
      }
      // check if the doctor exists 
      let dottore = await Personale.getOne(cartellaclinica.dottoreID);        
      if (!dottore || !dottore.identities) {
        throw new Error('Referenced owner personale does not exist in the ledger');
      }
      // get the fingerprint of that doctor 
      const dottoreCurrentIdentity = dottore.identities.filter(identity => identity.status === true)[0];
      //check if the doctor is the same as the one who call the function
      if (dottoreCurrentIdentity.fingerprint === this.sender) {    
        cartellaclinica.msp = this.tx.identity.getMSPID();
        //the medical record is created and stored in the ledger
        await cartellaclinica.save();
      } else {
        throw new Error(`Identity ${this.sender} is not allowed to update ${dottoreCurrentIdentity} cartellaclinica just can`);
      }
    }else{
      throw new Error(`401 Unauthorized ${username} should be ${exists[0].username} or ${password} should be ${exists[0].password} or ${this.sender} should be ${realdoctor.fingerprint}`);
    }
  }

  @Invokable()
  public async degenza( //cambio stato cartellaclinica : guarito o no
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    username: string,
    @Param(yup.string())
    password: string,
  ){
    /*let realuser= this.tx.identity.getAttributeValue('username');
    let realpass = this.tx.identity.getAttributeValue('password');*/

    const exists = await Personale.query(Personale, {
      selector: {
        type: 'io.worldsibu.personale',
        ['username']: username
      }
    });
    if ((exists as Personale[]).length <= 0) {
      throw new Error('There isn\'t a person registered with that id');
    }
    const realdoctor = exists[0].identities.filter(identity => identity.status === true)[0];

    if(exists[0].username === username && exists[0].password === password && realdoctor.fingerprint === this.sender){
      let cartellaclinica = await Cartellaclinica.getOne(id);
    
      if (!cartellaclinica || !cartellaclinica.id) {
        throw new Error(`Cartellaclinica with id ${id} does not exist`);
      }
      //const dottoreID = cartellaclinica.dottoreID;
      let dottore = await Personale.getOne(cartellaclinica.dottoreID);
      
      if (!dottore || !dottore.identities) {
        throw new Error('Referenced owner personale does not exist in the ledger');
      }

      const dottoreCurrentIdentity = dottore.identities.filter(identity => identity.status === true)[0];
    
      if (dottoreCurrentIdentity.fingerprint === this.sender) {
        
        cartellaclinica.stato = !cartellaclinica.stato;
        await cartellaclinica.save();
      } else {
        throw new Error(`Identity ${this.sender} is not allowed to update ${dottoreCurrentIdentity} cartellaclinica just can`);
      }
    }else{
      throw new Error(`401 Unauthorized ${username} should be ${exists[0].username} or ${password} should be ${exists[0].password} or ${this.sender} should be ${realdoctor.fingerprint}`);
    }

  }

  @Invokable()
  public async cambiaconsenso(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    username: string,
    @Param(yup.string())
    password: string
  ){
    const exists = await Personale.query(Personale, {
      selector: {
        type: 'io.worldsibu.personale',
        ['username']: username
      }
    });
    if ((exists as Personale[]).length <= 0) {
      throw new Error('There isn\'t a person registered with that id');
    }
    const realpatie = exists[0].identities.filter(identity => identity.status === true)[0];

    if(exists[0].username === username && exists[0].password === password && realpatie.fingerprint === this.sender){
      let cartellaclinica = await Cartellaclinica.getOne(id); //prende una cartella 
      
      if (!cartellaclinica || !cartellaclinica.id) {
        throw new Error(`Cartellaclinica with id ${id} does not exist`);
      }
      
      let paziente = await Personale.getOne(cartellaclinica.pazienteID); //estrapolo id del paziente
      
      if (!paziente || !paziente.identities) {
        throw new Error('Referenced owner personale does not exist in the ledger');
      }

      const pazienteCurrentIdentity = paziente.identities.filter(identity => identity.status === true)[0]; 
    
      if (pazienteCurrentIdentity.fingerprint === this.sender) { // se è la stessa persona posso revocare consenso alla cartella
        
        cartellaclinica.consenso = !cartellaclinica.consenso;
        await cartellaclinica.save();
        
      } else {
        throw new Error(`Identity ${this.sender} is not allowed to update ${pazienteCurrentIdentity} cartellaclinica just can`);
      }
    }else{
      throw new Error(`401 Unauthorized ${username} should be ${exists[0].username} or ${password} should be ${exists[0].password} or ${this.sender} should be ${realpatie.fingerprint}`);
    }
  }
  
  @Invokable()
  public async get(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    username: string,
    @Param(yup.string())
    password: string
  ) {

    const exists = await Personale.query(Personale, {
      selector: {
        type: 'io.worldsibu.personale',
        ['username']: username
      }
    });
    if ((exists as Personale[]).length <= 0) {
      throw new Error('There isn\'t a person registered with that id');
    }
    const realperson = exists[0].identities.filter(identity => identity.status === true)[0];

    if(exists[0].username === username && exists[0].password === password && realperson.fingerprint === this.sender){

      let cartellaclinica = await Cartellaclinica.getOne(id);
      let dottore = await Personale.getOne(cartellaclinica.dottoreID);
      let paziente = await Personale.getOne(cartellaclinica.pazienteID);


      const dotActiveIdentity = dottore.identities.filter(identity => identity.status === true)[0];
      const pazActiveIdentity = paziente.identities.filter(identity => identity.status === true)[0]

      if((dotActiveIdentity.fingerprint === this.sender && cartellaclinica.consenso) || pazActiveIdentity.fingerprint === this.sender){
        return cartellaclinica;
      }else{
        throw new Error(`Identity ${this.sender} is not allowed to views this certificate`);
      }
    }else{
      throw new Error(`401 Unauthorized ${username} should be ${exists[0].username} or ${password} should be ${exists[0].password} or ${this.sender} should be ${realperson.fingerprint}`);
    }
  }

  @Invokable()
  public async getByUsername(
    @Param(yup.string())
    pazienteid: string,
    @Param(yup.string())
    username: string,
    @Param(yup.string())
    password: string
  ) {

    const exists = await Personale.query(Personale, {
      selector: {
        type: 'io.worldsibu.personale',
        ['username']: username
      }
    });
    if ((exists as Personale[]).length <= 0) {
      throw new Error('There isn\'t a person registered with that id');
    }
    const realperson = exists[0].identities.filter(identity => identity.status === true)[0];

    if(exists[0].username === username && exists[0].password === password && realperson.fingerprint === this.sender){

      const exists = await Cartellaclinica.query(Cartellaclinica, {
        selector: {
          type: 'io.worldsibu.cartellaclinica',
          ['pazienteID']: pazienteid,
        }
      });
      if ((exists as Cartellaclinica[]).length <= 0) {
        throw new Error('There isn\'t a person registered with that id');
      }
      let dottore = await Personale.getOne(exists[0].dottoreID);
      let paziente = await Personale.getOne(exists[0].pazienteID);


      const dotActiveIdentity = dottore.identities.filter(identity => identity.status === true)[0];
      const pazActiveIdentity = paziente.identities.filter(identity => identity.status === true)[0]

      if((dotActiveIdentity.fingerprint === this.sender && exists[0].consenso) || pazActiveIdentity.fingerprint === this.sender){
        return exists[0];
      }else{
        throw new Error(`Identity ${this.sender} is not allowed to views this certificate`);
      }    
    }else{
      throw new Error(`401 Unauthorized ${username} should be ${exists[0].username} or ${password} should be ${exists[0].password} or ${this.sender} should be ${realperson.fingerprint}`);
    }
  }
}
