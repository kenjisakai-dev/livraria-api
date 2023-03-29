import mongoose from 'mongoose';

async function connect() {
  const uri =
    'mongodb+srv://root:123@clusternode.nliduqy.mongodb.net/bookstore-api';
  return await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export { connect };
