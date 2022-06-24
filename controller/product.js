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
