const mongoose = require('mongoose');
const express = require('express');
const { resolve } = require('path');

const app = express();

app.use(express.static('static'));

require('dotenv').config();

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;

if (!port || !mongoUri) {
  console.error('Missing PORT or MONGO_URI in environment variables');
  process.exit(1);
}

mongoose.connect(mongoUri)
    .then(() => console.log('Connected to database'))
    .catch((err) => console.error('Error connecting to database', err));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
