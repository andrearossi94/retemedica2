/*import * as bcrypt from 'bcrypt';
import { appConstants as c } from '@convector-sample/common';*/
import { Personale } from 'personale-cc';

/*const bcryptSaltRounds: number = 10;

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, bcryptSaltRounds);
};*/

/**
 * get Persona by Identity/Fingerprint
 */
export const getPersonaByIdentity = async (fingerprint: string): Promise<Personale> => {
  const personale: Personale| Personale[] = await Personale.query(Personale, {
    selector: {
      type: 'io.worldsibu.examples.personale',
      identities: {
        $elemMatch: {
          fingerprint,
          status: true
        }
      }
    }
  });

  if (!!personale && !personale[0].id) {
    throw new Error('Cant find a persona with that fingerprint');
  }
  return personale[0];
}
