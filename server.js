const express = require('express');

const PORT = 5001;
const app = express();

// 미들웨어 등록
app.use(express.json()); // express 내장 미들웨어 - bodyParser랑 동일함

app.post('/products', (req, res) => {
  console.log('req.body : ', req.body); // 미들웨어 등록을 해야 여기와 json형식의 파일을 읽을 수 있음
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);
