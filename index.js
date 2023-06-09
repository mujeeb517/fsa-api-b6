const express = require('express');
const mongoose = require('mongoose');
const { notFound } = require('./controllers/defaultCtrl');
const defaultRouter = require('./routes/defaultRouter');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const morgan = require('morgan');
const fs = require('fs');
const authUtils = require('./utils/authUtils');
const cors = require('cors');

const app = express();

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

const requestLogFile = fs.createWriteStream('./logs/request.log',
    { flags: 'a' });

app.use(morgan('combined', { stream: requestLogFile }));
app.use(morgan('dev'));

app.use(cors());
app.use(express.json());
app.use(express.static('uploads/'));

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`server is running on ${PORT}`));

const connectionStr = process.env.dbConStr;
mongoose.connect(connectionStr);
console.log('db connected');




app.use('/', defaultRouter);
app.use('/api/users', userRouter);

app.use(authUtils.authenticate);

app.use('/api/products', productRouter);

app.get('*', notFound);
