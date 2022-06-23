require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const PORT = 5001;
const app = express();
const productRoutes = require('./routes'); // 라우팅 처리

mongoose
  .connect(process.env.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

// 미들웨어 등록
app.use(express.json()); // express 내장 미들웨어 - bodyParser랑 동일함
app.use('/api/products', productRoutes); // '/api/products' 라우팅 미들웨어 등록

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);
