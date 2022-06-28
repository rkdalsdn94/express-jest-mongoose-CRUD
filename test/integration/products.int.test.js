// 통합 테스트를 위한 공간.
const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json');

let firstProduct;

it('POST /api/products', async () => {
  const response = await request(app).post('/api/products').send(newProduct);

  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
});

it('should return 500 on POST /api/products', async () => {
  const response = await request(app)
    .post('/api/products')
    .send({ name: 'phone' });

  expect(response.statusCode).toBe(500);

  // 아래 상태로 했을 때 에러가 나오는 이유는 에러 핸들러가 없어서 그렇다. 미들웨어로 에러 핸들러를 등록해야 된다. server.js에 핸들러 등록하기
  // expect(response.body).toStrictEqual({ message: '' });
  expect(response.body).toStrictEqual({
    message:
      'Product validation failed: description: Path `description` is required.',
  });
});

it('GET /api/products', async () => {
  const response = await request(app).get('/api/products');

  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0];
});

it('GET /api/product/:productId', async () => {
  const response = await request(app).get('/api/products/' + firstProduct._id);

  // console.log(
  //   response.statusCode,
  //   response.body.name,
  //   response.body.description
  // );

  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
});

it("Get id doesn't exist /api/products/:productId", async () => {
  const response = await request(app).get(
    '/api/products/62b591e8e6594ed2c51bc023'
  );

  expect(response.statusCode).toBe(404);
});
