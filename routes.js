// 여기 파일에서 분기처리를 한다.
// 현재는 규모가 작아서 한 파일에서 가능하지만 규모가 커지면 각 파일별로 라우팅 처리를 해주는것이 훨씬 효율적이다.

const express = require('express');
const router = express.Router();
const productController = require('./controller/product');

router.get('/hello', productController.hello); // 미들웨어 부분을 controller/product 파일에서 처리
router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:productId', productController.getProductById);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
