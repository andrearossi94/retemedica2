import * as express from 'express';
import { 
    CartellaclinicaController_create_post,
    CartellaclinicaController_get_get,
    CartellaclinicaController_degenza_post,
    CartellaclinicaController_cambiaconsenso_post } from './controllers'
export default express.Router()
.post('/cartellaclinica/create', CartellaclinicaController_create_post)
.get('/cartellaclinica/get/:id', CartellaclinicaController_get_get)
.post('/cartellaclinica/degenza', CartellaclinicaController_degenza_post)
.post('/cartellaclinica/cambiaconsenso', CartellaclinicaController_cambiaconsenso_post)
