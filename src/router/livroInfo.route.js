import express from 'express';
import livroInfoController from '../controllers/livroInfo.controller.js';

const router = express.Router();

router.post('/cadastrar', livroInfoController.criarLivroInfo);
router.get('/:cod_livro', livroInfoController.obterLivroInfo);
router.patch('/atualizar', livroInfoController.atualizarLivroInfo);

router.post('/avaliacao/cadastrar', livroInfoController.criarAvaliacao);

export default router;
