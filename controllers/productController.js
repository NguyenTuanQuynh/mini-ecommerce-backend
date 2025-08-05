const Product = require('../models/Product');

//GET /api/products

const getProducts = async (req, res) => {
    const Products = await Product.find({});
    res.json(Products);
}

// GET /api/products/:id
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (product) res.json(product);
        else res.status(404).json({message: 'Product not found'});
    } catch (error) {
        res.status(500).json({message: 'Invalid product ID'});
    }
}

//POST /api/products
const createProduct = async (req, res) => {
    const product = new Product({
        name: 'Sample Product',
        price: 0,
        user: req.user._id,
        image: 'a',
        brand: 'b',
        category: 'c',
        countInStock: 0,
        description: 'd',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
}

//PUT /api/products/:id
const updateProduct = async (req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({message: 'Product not found'});
    }
}

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({message: 'Product removed'});
    } else {
        res.status(404).json({message: 'Product not found'});
    }
}
module.exports = {getProducts, getProductById, createProduct, updateProduct, deleteProduct};