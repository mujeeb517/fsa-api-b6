const express = require('express');
const mongoose = require('mongoose');
const { notFound } = require('./controllers/defaultCtrl');
const defaultRouter = require('./routes/defaultRouter');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

const requestLogFile = fs.createWriteStream('./logs/request.log',
    { flags: 'a' });

app.use(morgan('combined', { stream: requestLogFile }));
app.use(morgan('dev'));

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
