const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URI);


app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.post('/api/register', async (req,res) => {
  const {img,name,addr} = req.body;
  try{
    const userDoc = await User.create({
      image:img,
      name:name,
      address:addr
    });
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post('/api/login', async (req,res) => {
  const {address} = req.body;
  const userDoc = await User.findOne({address:address});
  if(userDoc == null){
    res.status(404).json("error")}
    else {
      res.json({userDoc});
    }
  
   
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
