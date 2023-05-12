const express = require('express');
const { notFound } = require('./controllers/defaultCtrl');
const defaultRouter = require('./routes/defaultRouter');
const productRouter = require('./routes/productRouter');

const app = express();
// layered architecture

// http request : pipeline

// middleware 
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
// small

// register router
app.use('/', defaultRouter);
app.use('/api/products', productRouter);

app.get('*', notFound);

