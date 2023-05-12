const express = require('express');
const { notFound } = require('./controllers/defaultCtrl');
const defaultRouter = require('./routes/defaultRouter');
const productRouter = require('./routes/productRouter');

const app = express();
// layered architecture

// http request : pipeline

// middleware 
app.use(express.json());

app.listen(3000, () => console.log('server is running on 3000'));
// small

// register router
app.use('/', defaultRouter);
app.use('/api/products', productRouter);

app.get('*', notFound);

