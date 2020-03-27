import * as yup from 'yup';
import {
  ConvectorModel, ReadOnly, Required, Validate, Default, FlatConvectorModel
} from '@worldsibu/convector-core';
export class x509Identities extends ConvectorModel<x509Identities>{
  @ReadOnly()
  public readonly type = 'io.worldsibu.examples.x509identity';

  @Validate(yup.boolean())
  @Required()
  status: boolean;
  @Validate(yup.string())
  @Required()
  fingerprint: string;
}
export class Personale extends ConvectorModel<Personale> {     // 2 tipi di personale: paziente e dottore
  @ReadOnly()
  public readonly type = 'io.worldsibu.examples.personale';

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public nome: string;

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public cognome: string;

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public username: string;

  @ReadOnly()
  @Required()
  @Validate(yup.string()
  .min(8, 'Password is too short - should be 8 chars minimum.')
  .matches(/[1-9a-zA-Z]/, 'Password can only contain Latin letters and numbers.')
  )
  public password: string;

  @ReadOnly()
  @Validate(yup.string())
  public msp: string;

  
  @Default(['USER'])
  @Validate(yup.array().of(yup.string()))
  public roles: Array<String>;


  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;
}


/*export class Dottore extends Personale {
  //@ReadOnly()
  public type = 'io.worldsibu.examples.dottore';

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public specializzazione: string;
}
*/
/*export class Paziente extends Personale {
  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public patologia: string;
}*/