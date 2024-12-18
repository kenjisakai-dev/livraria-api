import express from 'express';
import vendaController from '../controllers/venda.controller.js';

const router = express.Router();

router.post('/cadastrar', vendaController.criarVenda);
router.get('/info/:cod_venda', vendaController.obterInfoVenda);
// router.patch('/atualizar', vendaController.atualizarVenda);

export default router;
