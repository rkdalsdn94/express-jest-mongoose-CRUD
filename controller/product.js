exports.hello = (req, res) => {
  res.send('안녕하세요');
};

const productModel = require('../models/product.model');

exports.createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);
    // console.log(createdProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const allProducts = await productModel.find({});
    res.status(200).json(allProducts);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.productId);

    if (!product) {
      return res.status(404).send();
    }
    return res.status(200).json(product);
  } catch (error) {
    // console.log(error);
    next(error);
  }
};
