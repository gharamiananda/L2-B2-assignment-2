"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/:userId', user_controller_1.getUser);
router.get('/', user_controller_1.getUsers);
router.post('/', user_controller_1.createUser);
router.put('/:userId/orders', user_controller_1.updateOrderUser);
router.get('/:userId/orders', user_controller_1.getOrdersUser);
router.delete('/:userId', user_controller_1.deleteUser);
router.put('/:userId', user_controller_1.updateUser);
router.get('/:userId/orders/total-price', user_controller_1.getTotalPrice);
exports.default = router;
