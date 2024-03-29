// database/dbs.js

import mongoose from 'mongoose';

export function connectToDatabase() {
  const dbURI = 'mongodb://127.0.0.1:27017/blog';

  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;

  db.on('error', (error) => console.error(error));
  db.once('open', () => console.log('Connected successfully'));
}
