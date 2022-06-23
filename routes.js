// 여기 파일에서 분기처리를 한다.
// 현재는 규모가 작아서 한 파일에서 가능하지만 규모가 커지면 각 파일별로 라우팅 처리를 해주는것이 훨씬 효율적이다.

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('안녕하세요');
});

app.post('/products', (req, res) => {
  console.log('req.body : ', req.body); // 미들웨어 등록을 해야 여기와 json형식의 파일을 읽을 수 있음
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/products', (req, res) => {
  console.log('req.body : ', req.body); // 미들웨어 등록을 해야 여기와 json형식의 파일을 읽을 수 있음
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = router;
