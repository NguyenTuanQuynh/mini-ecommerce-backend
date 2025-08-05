const Order = require('../models/order');

// tạo đơn hàng mới
const addOrderItems = async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice} = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({message: 'No order items'});
    }

    const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice
    })

    const createOrder = await order.save();
    res.status(201).json(createdOrder);

}

//lấy đơn hàng của người dùng hiện tại
const getMyOrders = async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.json(orders);
}

// [admin] lấy tất cả đơn hàng
const getAllOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'name email');
    res.json(orders);
}

// [admin] cập nhật đơn hàng hoàn thành ĐÃ THANH TOÁN
const updateOrderToPaid = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({message: 'Order not found'});
    }
}

// [admin] cập nhật đơn hàng hoàn thành ĐÃ GIAO HÀNG
const updateOrderToDelivered = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({message: 'Order not found'});
    }
}

module.exports = {addOrderItems, getMyOrders, getAllOrders, updateOrderToPaid, updateOrderToDelivered}