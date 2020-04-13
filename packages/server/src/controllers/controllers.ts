import { Request, Response } from 'express';
import { getAdapter } from '../convector';
import { resolve } from "path";
import { ClientFactory, Param } from '@worldsibu/convector-core';

import { networkProfile } from "../env";
import { CartellaclinicaController } from "cartellaclinica-cc";
import { PersonaleController } from "personale-cc";
import { atob } from 'bytebuffer';
import { getPackedSettings } from 'http2';



function parseError(errMess) {
    let startErr = '"message":"';
    return errMess.substring(
        errMess.lastIndexOf(startErr) + startErr.length,
        errMess.lastIndexOf('"}')
    );
}


/*export async function ParticipantController_register_post(req: Request, res: Response): Promise<void>{
    try {
        let params = req.body;
        let query = req.query;
        let adp = await getAdapter(query.user, query.org);
        let fact = await ClientFactory(ParticipantController, adp)
            .register(params.id, params.name, params.msp, params.certificate);
        res.status(200).send(fact);
    } catch(ex) {
        console.log(ex.message);
        res.statusMessage = parseError(ex.message);
        res.status(500).end();
    }
}*/




export async function PersonaleController_register_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
        let query = req.query;
        let adp = await getAdapter(query.user, query.org);
        let fact = await ClientFactory(PersonaleController, adp)
            .register(params.personale);
        res.status(200).send(fact);   
    } catch(ex) {
        console.log(ex.message);
        res.statusMessage = parseError(ex.message);
        res.status(500).end;
    }
}

/*export async function ParticipantController_get_get(req: Request, res: Response): Promise<void>{
    try {
        let params = req.params;
        let query = req.query;
        let adp = await getAdapter(query.user, query.org);
        res.status(200).send(await ClientFactory(ParticipantController, adp).get(params.id));
    } catch (ex) {
        console.log(ex.message);
        res.statusMessage = parseError(ex.message);
        res.status(500).end();
    }
}*/



export async function PersonaleController_get_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        let query = req.query;
        let adp = await getAdapter(query.user, query.org);
        res.status(200).send(await ClientFactory(PersonaleController, adp).get(params.id));
        
    } catch(ex) {
        console.log(ex.message);
        res.statusMessage = parseError(ex.message);
        res.status(500).end;
    }
}
export async function PersonaleController_getAll_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        let query = req.query;
        let adp = await getAdapter(query.user, query.org);
        res.status(200).send(await ClientFactory(PersonaleController, adp).getAll());
        
    } catch(ex) {
        console.log(ex.message);
        res.statusMessage = parseError(ex.message);
        res.status(500).end;
    }
}

export async function CartellaclinicaController_create_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
        let query = req.query;
        let adp = await getAdapter(query.user, query.org);
            res.status(200).send(await ClientFactory(CartellaclinicaController, adp)
                .create(params.cartellaclinica));
            
    } catch(ex) {
        console.log(ex.message);
        res.statusMessage = parseError(ex.message);
        res.status(500).end;
    }
}
export async function CartellaclinicaController_degenza_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
        let query = req.query;
        let adp = await getAdapter(query.user, query.org);
            res.status(200).send(await ClientFactory(CartellaclinicaController, adp)
                .degenza(params.id));
            
    } catch(ex) {
        console.log(ex.message);
        res.statusMessage = parseError(ex.message);
        res.status(500).end;
    }
}
export async function CartellaclinicaController_cambiaconsenso_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
        let query = req.query;
        let adp = await getAdapter(query.user, query.org);
            res.status(200).send(await ClientFactory(CartellaclinicaController, adp)
                .cambiaconsenso(params.id));
            
    } catch(ex) {
        console.log(ex.message);
        res.statusMessage = parseError(ex.message);
        res.status(500).end;
    }
}


export async function CartellaclinicaController_get_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
        let query = req.query;
        let adp = await getAdapter(query.user, query.org);
        res.status(200).send(await ClientFactory(CartellaclinicaController, adp).get(params.id));
        
    } catch(ex) {
        console.log(ex.message);
        res.statusMessage = parseError(ex.message);
        res.status(500).end;
    }
}
export async function CartellaclinicaController_getByUsername_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
        let query = req.query;
        let adp = await getAdapter(query.user, query.org);
        res.status(200).send(await ClientFactory(CartellaclinicaController, adp)
            .getByUsername(params.pazienteid));
        
    } catch(ex) {
        console.log(ex.message);
        res.statusMessage = parseError(ex.message);
        res.status(500).end;
    }
}