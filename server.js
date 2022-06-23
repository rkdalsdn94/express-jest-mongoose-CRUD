const express = require('express');

const PORT = 5001;
const app = express();
const productRoutes = require('./routes'); // 라우팅 처리

// 미들웨어 등록
app.use(express.json()); // express 내장 미들웨어 - bodyParser랑 동일함
app.use('/api/products', productRoutes); // '/api/products' 라우팅 미들웨어 등록

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);
