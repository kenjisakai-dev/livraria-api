import mongoose from 'mongoose';

const AvaliacoesSchema = new mongoose.Schema(
  {
    nome: String,
    nota: Number,
    avaliacoes: String,
  },
  { collection: 'livroInfo' }
);

export default AvaliacoesSchema;
