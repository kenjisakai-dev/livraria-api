import Livro from '../model/livro.model.js';
import livroInfoSchema from '../schemas/livroInfo.schema.js';
import { connect } from './mongo.db.js';

async function createLivroInfo(livroInfo) {
  try {
    const mongoose = await connect();
    const LivroInfo = mongoose.model('livroInfo', livroInfoSchema);
    livroInfo = new LivroInfo(livroInfo);
    return await livroInfo.save();
  } catch (err) {
    throw err;
  }
}

async function getLivrosInfo() {
  try {
    const mongoose = await connect();
    const LivroInfo = mongoose.model('livroInfo', livroInfoSchema);
    const query = LivroInfo.find({});
    return await query.exec();
  } catch (err) {
    throw err;
  }
}

async function getLivroInfo(livroInfoId) {
  try {
    const mongoose = await connect();
    const LivroInfo = mongoose.model('livroInfo', livroInfoSchema);
    const query = LivroInfo.findOne({ livroId: livroInfoId });
    return await query.exec();
  } catch (err) {
    throw err;
  }
}

async function updateLivroInfo(livroInfo) {
  try {
    const mongoose = await connect();
    const LivroInfo = mongoose.model('livroInfo', livroInfoSchema);
    return await LivroInfo.findOneAndUpdate({ livroId: livroInfo.livroId }, livroInfo);
    // retornar para o controller a resposta
  } catch (err) {
    throw err;
  }
}

async function deleteLivroInfo(livroInfoId) {
  try {
    const livroInfo = await getLivroInfo(livroInfoId);
    const mongoose = await connect();
    const LivroInfo = mongoose.model('livroInfo', livroInfoSchema);
    await LivroInfo.deleteOne({ livroId: livroInfoId });
    return livroInfo;
  } catch (err) {
    throw err;
  }
}

async function createAvaliacoes(livro) {
  try {
    const livroInfo = await getLivroInfo(livro.livroId);
    livroInfo.avaliacoes.push(livro.avaliacoes);
    await updateLivroInfo(livroInfo);
    return livro;
  } catch (err) {
    throw err;
  }
}

async function deleteAvaliacoes(livroId, index) {
  try {
    const livroInfo = await getLivroInfo(livroId);
    livroInfo.avaliacoes.splice(index, 1);
    await updateLivroInfo(livroInfo);
    return livroInfo.avaliacoes[index];
  } catch (err) {
    throw err;
  }
}

export default {
  createLivroInfo,
  getLivrosInfo,
  getLivroInfo,
  updateLivroInfo,
  deleteLivroInfo,
  createAvaliacoes,
  deleteAvaliacoes,
};
