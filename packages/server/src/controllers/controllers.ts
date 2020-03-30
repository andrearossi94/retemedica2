import { Request, Response } from 'express';
import { PersonaleControllerBackEnd, getAdapter } from '../convector';
import { CartellaclinicaControllerBackEnd } from '../convector';
import { ClientFactory } from '@worldsibu/convector-core';

export async function CartellaclinicaController_create_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await CartellaclinicaControllerBackEnd
                .create(params.cartellaclinica));
            
    } catch(ex) {
        console.log('Error post CartellaclinicaController_create', ex.stack);
        res.status(500).send(ex);
    }
}
export async function CartellaclinicaController_get_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        let query = req.query;
        let adp = await getAdapter(query.user, query.org);
            res.status(200).send(await ClientFactory(CartellaclinicaControllerBackEnd, adp).get(params.id));
        
    } catch(ex) {
        console.log('Error get CartellaclinicaController_get', ex.stack);
        res.status(500).send(ex);
    }
}
export async function CartellaclinicaController_degenza_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await CartellaclinicaControllerBackEnd
                .degenza(params.id));
            
    } catch(ex) {
        console.log('Error post CartellaclinicaController_degenza', ex.stack);
        res.status(500).send(ex);
    }
}
export async function CartellaclinicaController_cambiaconsenso_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await CartellaclinicaControllerBackEnd
                .cambiaconsenso(params.id));
            
    } catch(ex) {
        console.log('Error post CartellaclinicaController_cambiaconsenso', ex.stack);
        res.status(500).send(ex);
    }
}