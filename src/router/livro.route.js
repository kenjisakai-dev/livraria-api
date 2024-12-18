import express from 'express';
import livroController from '../controllers/livro.controller.js';

const router = express.Router();

router.post('/cadastrar', livroController.criarLivro);
router.get('/info/:cod_livro', livroController.obterInfoLivro);
router.patch('/atualizar', livroController.atualizarLivro);

export default router;
