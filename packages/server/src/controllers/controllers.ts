import { Request, Response } from 'express';
import { PersonaleControllerBackEnd } from '../convector';
import { CartellaclinicaControllerBackEnd } from '../convector';


export async function PersonaleController_register_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await PersonaleControllerBackEnd
                .register(params.personale));
            
    } catch(ex) {
        console.log('Error post PersonaleController_register', ex.stack);
        res.status(500).send(ex);
    }
}
export async function PersonaleController_get_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await PersonaleControllerBackEnd
            .get(params.id));
        
    } catch(ex) {
        console.log('Error get PersonaleController_get', ex.stack);
        res.status(500).send(ex);
    }
}
export async function PersonaleController_getAll_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await PersonaleControllerBackEnd
            .getAll());
        
    } catch(ex) {
        console.log('Error get PersonaleController_getAll', ex.stack);
        res.status(500).send(ex);
    }
}
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
export async function CartellaclinicaController_get_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await CartellaclinicaControllerBackEnd
            .get(params.id));
        
    } catch(ex) {
        console.log('Error get CartellaclinicaController_get', ex.stack);
        res.status(500).send(ex);
    }
}
export async function CartellaclinicaController_getByUsername_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await CartellaclinicaControllerBackEnd
            .getByUsername(params.pazienteid));
        
    } catch(ex) {
        console.log('Error get CartellaclinicaController_getByUsername', ex.stack);
        res.status(500).send(ex);
    }
}