const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const jobRoute = require('./routes/jobRoute');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', userRoute);
app.use('/', jobRoute);

app.get('/', (req, res) => {
  let time = new Date().toLocaleTimeString();
  res.json({ time: time, app: 'Job-Listing-server', state: 'active' });
});

app.listen(process.env.PORT, (res, req) => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected Successfully'))
    .catch((error) => console.log('error'));
  console.log('Server listening on port ' + process.env.PORT);
});
