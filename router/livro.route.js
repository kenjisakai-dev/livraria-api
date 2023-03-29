import express from 'express';
import LivroController from '../controllers/livro.controller.js';

const router = express.Router();

router.post('/', LivroController.createLivro);
router.get('/', LivroController.getLivros);
router.get('/:id', LivroController.getLivro);
router.put('/', LivroController.updateLivro);
router.delete('/:id', LivroController.deleteLivro);

export default router;
