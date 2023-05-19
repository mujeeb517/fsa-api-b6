const express = require('express');
const mongoose = require('mongoose');
const { notFound } = require('./controllers/defaultCtrl');
const defaultRouter = require('./routes/defaultRouter');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');

const app = express();
// layered architecture

// http request : pipeline

// middleware 
app.use(express.json());

const PORT = process.env.PORT || 3002;


app.listen(PORT, () => console.log(`server is running on ${PORT}`));
// small


const connectionStr = 'mongodb://127.0.0.1:27017/fsa-b6';
mongoose.connect(connectionStr);
console.log('db connected');

// register router
app.use('/', defaultRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.get('*', notFound);
