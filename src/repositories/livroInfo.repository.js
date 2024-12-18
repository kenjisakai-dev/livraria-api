import connect from './mongo.db.js';
import LivroInfoSchema from '../schemas/livroInfo.schema.js';

const mongoose = await connect();
const LivroInfo = mongoose.model('livroInfo', LivroInfoSchema);

async function criarInfoLivro(livroInfo) {
    try {
        return await new LivroInfo(livroInfo).save();
    } catch (erro) {
        throw new Error(erro.message);
    }
}

async function obterLivroInfo(cod_livro) {
    try {
        return LivroInfo.findOne({ cod_livro }).exec();
    } catch (erro) {
        throw new Error(erro.message);
    }
}

async function atualizarLivroInfo(livroInfo) {
    try {
        await LivroInfo.findOneAndUpdate(
            { cod_livro: livroInfo.cod_livro },
            livroInfo,
        );

        return await obterLivroInfo(livroInfo.cod_livro);
    } catch (erro) {
        throw new Error(erro.message);
    }
}

export default {
    criarInfoLivro,
    obterLivroInfo,
    atualizarLivroInfo,
};
