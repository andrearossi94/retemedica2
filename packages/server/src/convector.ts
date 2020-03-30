import { join, resolve } from "path";
import { keyStore, identityName, channel, chaincode, networkProfile, identityId } from './env';
import * as fs from 'fs';
import { FabricControllerAdapter } from '@worldsibu/convector-adapter-fabric';
import { ClientFactory } from '@worldsibu/convector-core';
import { PersonaleController, Personale } from 'personale-cc';
import { CartellaclinicaController } from 'cartellaclinica-cc';


export async function getAdapter(identityName, identityOrg){
    const keystorePath = keyStore;
    const networkProfilePath = networkProfile;


    let adapter = new FabricControllerAdapter({
        txTimeout: 300000,
        user: identityName,
        channel: channel ,
        chaincode: chaincode,
        keyStore: resolve(__dirname, keystorePath),
        networkProfile: resolve(__dirname, networkProfilePath),
        userMspPath: resolve(__dirname, identityOrg)
    });

    await adapter.init();

    return adapter;
}
//export const initAdapter = adapter.init();


export const PersonaleControllerBackEnd = 
    ClientFactory(PersonaleController, adapter);

export const CartellaclinicaControllerBackEnd = 
    ClientFactory(CartellaclinicaController, adapter);



    /**
 * Check if the identity has been initialized in the chaincode.
 */
export async function InitServerIdentity() {
    await initAdapter;
    const res = await PersonaleControllerBackEnd.get(identityId);
    try {
        const serverIdentity = new Personale(res).toJSON();

        if (!serverIdentity || !serverIdentity.id) {
            throw new Error('Server identity does not exists, make sure to enroll it or seed data');
        } else {
            console.log('Server identity exists');
        }
    } catch (ex) {
        console.log(JSON.stringify(ex));
        throw new Error('Server identity does not exists, make sure to enroll it or seed data');
    }
}

const contextPath = join(keyStore + '/' + identityName);
fs.readFile(contextPath, 'utf8', async function (err, data) {
    if (err) {
        throw new Error('Context in ' + contextPath 
        + ' does not exist. Make sure that path resolves to your key stores folder');
    } else {
        console.log('Context path with cryptographic materials exists');
    }
});

    