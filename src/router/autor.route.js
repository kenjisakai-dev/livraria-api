import express from 'express';
import autorController from '../controllers/autor.controller.js';

const router = express.Router();

router.post('/cadastrar', autorController.criarAutor);
router.get('/info/:cod_autor', autorController.obterInfoAutor);
router.patch('/atualizar', autorController.atualizarAutor);

export default router;
