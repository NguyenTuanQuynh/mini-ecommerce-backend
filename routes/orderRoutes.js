const express = require('express');
const router = express.Router();
const {addOrderItems, getMyOrders, getAllOrders, updateOrderToPaid, updateOrderToDelivered} = require('../controllers/orderController');
const {protect, admin} = require('../middleware/authMiddleware');

router.post('/', protect, addOrderItems);
router.get('/:id', protect, getMyOrders);
router.put('/', protect, admin, getAllOrders);
router.put('/:id/pay', protect, admin, updateOrderToDelivered);
router.put('/:id/deliver', protect, admin, updateOrderToPaid);


module.exports = router;