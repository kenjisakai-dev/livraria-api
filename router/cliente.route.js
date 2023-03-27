import express from 'express';
import ClienteController from '../controllers/cliente.controller.js';

const router = express.Router();

router.post('/', ClienteController.createCliente);
router.get('/', ClienteController.getClientes);
router.get('/:id', ClienteController.getCliente);
router.put('/', ClienteController.updateCliente);
router.delete('/:id', ClienteController.deleteCliente);

export default router;
