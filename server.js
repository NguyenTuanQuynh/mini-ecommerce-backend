// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB(); // Kết nối MongoDB

const app = express();
app.use(cors());
app.use(express.json());
//route users
const userRouter = require('./routes/userRoutes');
app.use('/api/users', userRouter);
//route products
const productRouter = require('./routes/productRoutes');
app.use('/api/products', productRouter);
// Route test
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
