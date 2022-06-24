// 단위 테스트를 위한 공간.

describe('Calculation', () => {
  test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
  });

  test('two plus two is not five', () => {
    expect(2 + 2).not.toBe(5);
  });
});

// 3. controller/product.js 안에 함수를 불러온다.
const productController = require('../../controller/product');

// 1. 먼저 테스트 코드를 만든다. -> controller/product.js 파일로 이동
describe('Product Controller Create', () => {
  it('should have a createProduct function', () => {
    expect(typeof productController.createProduct).toBe('function');
  });
});
