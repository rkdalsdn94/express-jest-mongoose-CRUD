// 단위 테스트를 위한 공간.

const productController = require('../../controller/product');
const productModel = require('../../models/product.model');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');
const allProducts = require('../data/all-products.json');

productModel.create = jest.fn();
productModel.find = jest.fn();
productModel.findById = jest.fn();
productModel.findByIdAndUpdate = jest.fn();
productModel.findByIdAndDelete = jest.fn();

const productId = 'testProductId';
const updatedProduct = {
  name: 'update name',
  description: 'update description',
};
let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('Product Controller Create', () => {
  beforeEach(() => {
    req.body = newProduct;
  });

  it('should have a createProduct function', () => {
    expect(typeof productController.createProduct).toBe('function');
  });

  it('should call ProductModel.create 프로덕트 모델의 create함수 호출 테스트', () => {
    productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  });

  it('should return 201 response code', async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return json body in response', async () => {
    productModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: '필수 값이 없습니다.' };
    const rejectedPromise = Promise.reject(errorMessage);

    productModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });
});

describe('Product Controller Get', () => {
  it('should have a getProducts function', () => {
    expect(typeof productController.getProducts).toBe('function');
  });

  it('should call ProductModel.find({})', async () => {
    await productController.getProducts(req, res, next);
    expect(productModel.find).toHaveBeenCalledWith({});
  });

  it('should return 200 response', async () => {
    await productController.getProducts(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
  });

  it('should return json body in response', async () => {
    productModel.find.mockReturnValue(allProducts);
    await productController.getProducts(req, res, next);

    expect(res._getJSONData()).toStrictEqual(allProducts);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Error finding product data' };
    const rejectedPromise = Promise.reject(errorMessage);

    productModel.find.mockReturnValue(rejectedPromise);
    await productController.getProducts(req, res, next);

    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe('Product Controller GetByID', () => {
  it('Should have a ProductById', () => {
    expect(typeof productController.getProductById).toBe('function');
  });

  it('Should call productMode.findById', async () => {
    req.params.productId = productId;
    await productController.getProductById(req, res, next);
    expect(productModel.findById);
  });

  it('should return json boyd and response code 200', async () => {
    productModel.findById.mockReturnValue(newProduct);
    await productController.getProductById(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newProduct);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return 404 when item doesn't exist", async () => {
    productModel.findById.mockReturnValue(null);
    await productController.getProductById(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'error' };
    const rejectedPromise = Promise.reject(errorMessage);

    productModel.findById.mockReturnValue(rejectedPromise);
    await productController.getProductById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe('Product Controller Update', () => {
  it('should have an updateProduct function', () => {
    expect(typeof productController.updateProduct).toBe('function');
  });

  it('should call productModel.findByIdAndUpdate', async () => {
    req.params.productId = productId;
    req.body = updatedProduct;
    await productController.updateProduct(req, res, next);

    // expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith( // 몽고DB에선 아래와 같은 값이 필요하다
    //   req.params.productId,
    //   req.body,
    //   { new: true });

    expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
      productId,
      updatedProduct,
      { new: true }
    );
  });

  it('should return json body and response code 200', async () => {
    req.params.productId = productId;
    req.body = updatedProduct;
    productModel.findByIdAndUpdate.mockReturnValue(updatedProduct);

    await productController.updateProduct(req, res, next);

    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(updatedProduct);
  });

  it("should handle 404 when item doesn't  exist", async () => {
    productModel.findByIdAndUpdate.mockReturnValue(null);
    await productController.updateProduct(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'error' };
    const rejectedPromise = Promise.reject(errorMessage);

    productModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await productController.updateProduct(req, res, next);

    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe('Product Controller Delete', () => {
  it('deleteProduct 메소드가 함수인지?', () => {
    expect(typeof productController.deleteProduct).toBe('function');
  });

  it('ProductModel.findByIdAndDelete 호출', async () => {
    req.params.productId = productId;

    await productController.deleteProduct(req, res, next);

    expect(productModel.findByIdAndDelete);
  });

  it('ProductModel.findByIdAndDelete 성공시 상태값 200 리턴받기', async () => {
    let deletedProduct = {
      name: 'deletedProduct',
      description: 'it is deleted',
    };

    productModel.findByIdAndDelete.mockReturnValue(deletedProduct);
    await productController.deleteProduct(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(deletedProduct);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('삭제할 제품이 없으면 404 리턴', async () => {
    productModel.findByIdAndDelete.mockReturnValue(null);
    await productController.deleteProduct(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('데이터를 삭제할 때 에러가 날 경우 500 리턴', async () => {
    const errorMessage = { message: 'Error delete' };
    const rejectedPromise = Promise.reject(errorMessage);

    productModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
    await productController.deleteProduct(req, res, next);

    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
