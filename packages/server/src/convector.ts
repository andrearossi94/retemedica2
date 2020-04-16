import { join, resolve } from "path";
import { keyStore, channel, chaincode, networkProfile } from './env';
//import * as fs from 'fs';
import { FabricControllerAdapter } from '@worldsibu/convector-adapter-fabric';
/*import { ClientFactory } from '@worldsibu/convector-core';
import { PersonaleController } from 'personale-cc';
import { CartellaclinicaController } from 'cartellaclinica-cc'; */


export async function getAdapter(identityName, identityOrg) {
    const keystorePath = keyStore(identityOrg);
    const networkProfilePath = networkProfile(identityOrg);

    let adapter = new FabricControllerAdapter({
        txTimeout: 300000,
        user: identityName,
        channel: channel,
        chaincode: chaincode,
        keyStore: resolve(__dirname, keystorePath),
        networkProfile: resolve(__dirname, networkProfilePath),
        userMspPath: resolve(__dirname, keystorePath)
    });

    await adapter.init();

    return adapter;
}

/*export const PersonaleControllerBackEnd = 
    ClientFactory(PersonaleController, adapter);
export const CartellaclinicaControllerBackEnd = 
    ClientFactory(CartellaclinicaController, adapter);
const contextPath = join(keyStore + '/' + identityName);
fs.readFile(contextPath, 'utf8', async function (err, data) {
    if (err) {
        throw new Error('Context in ' + contextPath 
        + ' does not exist. Make sure that path resolves to your key stores folder');
    } else {
        console.log('Context path with cryptographic materials exists');
    }
});*/