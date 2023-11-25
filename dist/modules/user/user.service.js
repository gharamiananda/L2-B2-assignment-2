"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geOrdersTotalUserFromDB = exports.geOrdersUserFromDB = exports.updatedOrderUserFromDB = exports.updatedUserFromDB = exports.deleteUserFromDB = exports.getUserFromDB = exports.getUsersFromDB = exports.createUserIntoDB = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(user.userId);
    if (yield user_model_1.default.isUserExists(userId)) {
        throw new Error('User already exists with this userId');
    }
    const data = yield user_model_1.default.create(user);
    return data;
});
exports.createUserIntoDB = createUserIntoDB;
const getUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.default.find({}, { password: 0, orders: 0, _id: 0 });
    return data;
});
exports.getUsersFromDB = getUsersFromDB;
const getUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.default.findOne({ userId }, { password: 0, orders: 0, _id: 0 });
    return data;
});
exports.getUserFromDB = getUserFromDB;
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(Number(userId)))) {
        throw new Error('User not exists');
    }
    const data = yield user_model_1.default.findOneAndDelete({ userId }, { password: 0 });
    return data;
});
exports.deleteUserFromDB = deleteUserFromDB;
const updatedUserFromDB = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.default.isUserExists(Number(userId));
    if (!isUserExists) {
        throw new Error('User not exists');
    }
    const data = yield user_model_1.default.findOneAndUpdate({ userId: Number(userId) }, Object.assign({}, userData), {
        new: true,
        projection: {
            // fullName: 1,
            // email: 1,
            orders: 0,
            password: 0,
        },
    });
    return data;
});
exports.updatedUserFromDB = updatedUserFromDB;
const updatedOrderUserFromDB = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(Number(userId)))) {
        throw new Error('User not exists');
    }
    const orderInfo = yield user_model_1.default.findOneAndUpdate({ userId: Number(userId) }, { $push: { orders: orderData } }, { new: true, projection: { fullName: 0 } });
    return orderInfo;
});
exports.updatedOrderUserFromDB = updatedOrderUserFromDB;
const geOrdersUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(Number(userId)))) {
        throw new Error('User not exists');
    }
    const data = yield user_model_1.default.findOne({ userId: Number(userId) }, { orders: 1 });
    return data;
});
exports.geOrdersUserFromDB = geOrdersUserFromDB;
const geOrdersTotalUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.default.isUserExists(Number(userId)))) {
        throw new Error('User not exists');
    }
    const data = yield user_model_1.default.aggregate([
        { $match: { userId: Number(userId) } },
        { $unwind: '$orders' },
        {
            $group: {
                _id: '$_id',
                totalPrice: {
                    $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
                },
            },
        },
        { $project: { _id: 0 } },
    ]);
    return data;
});
exports.geOrdersTotalUserFromDB = geOrdersTotalUserFromDB;
