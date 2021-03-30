// jshint esversion:8
import express from 'express';
import mongoose from 'mongoose';

import api from './routes/api.route.js';

const app = express();

const PORT = process.env.PORT || 3000;


// App configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api());

// initialize mongoose
mongoose.connect(process.env.MONGO_DB_URI || 'mongodb://localhost:27017/AdManagerDB', {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((db) => {
  console.log('DB connected successfully');
}).catch((err) => {
  console.log('Could not connect to DB', err);
});

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    response: 'Hello world'
  });
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
