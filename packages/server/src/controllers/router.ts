import * as express from 'express';
import { 
    PersonaleController_register_post,
    PersonaleController_get_get,
    PersonaleController_getAll_get,
    CartellaclinicaController_create_post,
    CartellaclinicaController_degenza_post,
    CartellaclinicaController_cambiaconsenso_post,
    CartellaclinicaController_get_get,
    CartellaclinicaController_getByUsername_get } from './controllers'
export default express.Router()
.post('/personale/register', PersonaleController_register_post)
.get('/personale/get/:id', PersonaleController_get_get)
.get('/personale/getAll', PersonaleController_getAll_get)
.post('/cartellaclinica/create', CartellaclinicaController_create_post)
.post('/cartellaclinica/degenza', CartellaclinicaController_degenza_post)
.post('/cartellaclinica/cambiaconsenso', CartellaclinicaController_cambiaconsenso_post)
.get('/cartellaclinica/get/:id', CartellaclinicaController_get_get)
.get('/cartellaclinica/getByUsername/:pazienteid', CartellaclinicaController_getByUsername_get)
