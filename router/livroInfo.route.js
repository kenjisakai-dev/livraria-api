import express from 'express';
import LivroInfoController from '../controllers/livroInfo.controller.js';

const router = express.Router();

router.post('/', LivroInfoController.createLivroInfo);
router.get('/', LivroInfoController.getLivrosInfo);
router.get('/:id', LivroInfoController.getLivroInfo);
router.put('/', LivroInfoController.updateLivroInfo);
router.delete('/:id', LivroInfoController.deleteLivroInfo);

router.post('/avaliacoes', LivroInfoController.createAvaliacoes);
router.delete('/avaliacoes/:id/:index', LivroInfoController.deleteAvaliacoes);

export default router;
