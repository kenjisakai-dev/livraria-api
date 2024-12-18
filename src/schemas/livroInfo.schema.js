import mongoose from 'mongoose';
import AvaliacoesSchema from './avaliacoes.schema.js';

const LivroInfoSchema = new mongoose.Schema(
    {
        cod_livro: Number,
        descricao: String,
        paginas: Number,
        editora: String,
        avaliacoes: [AvaliacoesSchema],
    },
    { collection: 'livroInfo' },
);

export default LivroInfoSchema;
