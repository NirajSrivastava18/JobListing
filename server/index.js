const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const jobRoute = require('./routes/jobRoute');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'https://job-listing-eta-tawny.vercel.app' }));
app.use('/', userRoute);
app.use('/', jobRoute);

app.get('/', (req, res) => {
  let time = new Date().toLocaleTimeString();
  res.json({ time: time, app: 'Job-Listing-server', state: 'active' });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, cd, ' ../client/build/index.html'));
  });
}

app.listen(process.env.PORT, (res, req) => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected Successfully'))
    .catch((error) => console.log('error'));
  console.log('Server listening on port ' + process.env.PORT);
});
