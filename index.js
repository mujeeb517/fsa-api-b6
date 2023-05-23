const express = require('express');
const mongoose = require('mongoose');
const { notFound } = require('./controllers/defaultCtrl');
const defaultRouter = require('./routes/defaultRouter');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const jwt = require('jsonwebtoken');
const authUtils = require('./utils/authUtils');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`server is running on ${PORT}`));

const connectionStr = 'mongodb://127.0.0.1:27017/fsa-b6';
mongoose.connect(connectionStr);
console.log('db connected');

app.use('/', defaultRouter);
app.use('/api/users', userRouter);

// app.use(authUtils.authenticate);

app.use('/api/products', productRouter);

app.get('*', notFound);
