// 여기 파일에서 분기처리를 한다.
// 현재는 규모가 작아서 한 파일에서 가능하지만 규모가 커지면 각 파일별로 라우팅 처리를 해주는것이 훨씬 효율적이다.

const express = require('express');
const router = express.Router();
const productController = require('./controller/product');

router.get('/', productController.hello); // 미들웨어 부분을 따로 별도로 처리하는 부분

module.exports = router;
