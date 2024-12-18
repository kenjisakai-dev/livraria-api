import express from 'express';
import clienteController from '../controllers/cliente.controller.js';

const router = express.Router();

router.post('/cadastrar', clienteController.criarCliente);
router.get('/info/:cod_cliente', clienteController.obterInfoCliente);
router.patch('/atualizar', clienteController.atualizarCliente);

export default router;
