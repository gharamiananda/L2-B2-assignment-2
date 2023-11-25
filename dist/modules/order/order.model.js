"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("../user/user.model");
exports.orderSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, 'UserId is required'],
    },
    product: user_model_1.productSchema,
});
const Order = (0, mongoose_1.model)('Order', exports.orderSchema);
exports.default = Order;
