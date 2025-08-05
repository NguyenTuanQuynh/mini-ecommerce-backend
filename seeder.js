const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const products = require('./data/products');
const User = require('./models/User');
const Users = require('./data/users');
const connectDB = require('./config/db');
const users = require("./data/users");

dotenv.config();
connectDB();

//const importData = async () => {
//    try {
//        await Product.deleteMany();
//        await Product.insertMany(products);
//        console.log('Data imported!');
//        process.exit();
//    } catch (error) {
//        console.error(error);
//        process.exit(1);
//    }
//}

const importData = async () => {
    try {
        await User.deleteMany();
        await User.insertMany(users);
        console.log('Data imported!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

importData();