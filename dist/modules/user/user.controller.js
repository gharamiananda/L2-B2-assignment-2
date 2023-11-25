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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalPrice = exports.getOrdersUser = exports.updateOrderUser = exports.updateUser = exports.deleteUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = require("zod");
const user_service_1 = require("./user.service");
const config_1 = __importDefault(require("../../app/config"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    try {
        const studentValidationSchema = zod_1.z.object({
            userId: zod_1.z.number(),
            username: zod_1.z.string(),
            password: zod_1.z.string(),
            fullName: zod_1.z.object({
                firstName: zod_1.z
                    .string()
                    .max(20, { message: 'First Name is less than 20 characters' }),
                lastName: zod_1.z
                    .string()
                    .max(20, { message: 'Last Name is less than 20 characters' }),
            }),
            hobbies: zod_1.z.array(zod_1.z.string()),
            age: zod_1.z.number(),
            email: zod_1.z.string(),
            isActive: zod_1.z.boolean(),
            address: zod_1.z.object({
                street: zod_1.z.string(),
                city: zod_1.z.string(),
                country: zod_1.z.string(),
            }),
        });
        const userInfo = studentValidationSchema.parse(userData);
        const data = yield (0, user_service_1.createUserIntoDB)(userInfo);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _a = data.toObject(), { password } = _a, userDataWithoutPassword = __rest(_a, ["password"]);
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: userDataWithoutPassword,
        });
    }
    catch (error) {
        if (error == 'Error: User not exists') {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error,
            });
        }
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, user_service_1.getUsersFromDB)();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data,
        });
    }
    catch (error) {
        if (error == 'Error: User not exists') {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error,
            });
        }
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, user_service_1.getUserFromDB)(req.params.userId);
        if (!data) {
            res.status(400).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, user_service_1.deleteUserFromDB)(req.params.userId);
        if (!data) {
            res.status(400).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'User Deleted successfully!',
            data: null,
        });
    }
    catch (error) {
        if (error == 'Error: User not exists') {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error,
            });
        }
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        if (userData.password) {
            userData.password = yield bcryptjs_1.default.hash(userData.password, Number(config_1.default.bcrypt_solt_rounds));
        }
        const studentValidationSchema = zod_1.z.object({
            userId: zod_1.z.number(),
            username: zod_1.z.string(),
            password: zod_1.z.string(),
            fullName: zod_1.z.object({
                firstName: zod_1.z
                    .string()
                    .max(20, { message: 'First Name is less than 20 characters' }),
                lastName: zod_1.z
                    .string()
                    .max(20, { message: 'First Name is less than 20 characters' }),
            }),
            hobbies: zod_1.z.array(zod_1.z.string()),
            age: zod_1.z.number(),
            email: zod_1.z.string(),
            isActive: zod_1.z.boolean(),
            address: zod_1.z.object({
                street: zod_1.z.string(),
                city: zod_1.z.string(),
                country: zod_1.z.string(),
            }),
        });
        const userInfo = studentValidationSchema.parse(userData);
        const data = yield (0, user_service_1.updatedUserFromDB)(req.params.userId, userInfo);
        if (!data) {
            res.status(400).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: data,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        if (error.code === 11000) {
            const keyPattern = error.keyPattern;
            const keyValue = error.keyValue;
            return res.status(400).json({
                success: false,
                message: 'Unique constraint violation',
                error: {
                    code: 400,
                    description: 'Duplicate key error',
                    keyPattern,
                    keyValue,
                },
            });
        }
        if (error == 'Error: User not exists') {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error,
            });
        }
    }
});
exports.updateUser = updateUser;
const updateOrderUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        yield (0, user_service_1.updatedOrderUserFromDB)(req.params.userId, orderData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error,
        });
    }
});
exports.updateOrderUser = updateOrderUser;
const getOrdersUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const data = yield (0, user_service_1.geOrdersUserFromDB)(req.params.userId);
        if (!((_b = data === null || data === void 0 ? void 0 : data.orders) === null || _b === void 0 ? void 0 : _b.length)) {
            res.status(200).json({
                success: true,
                message: 'You have no order information',
                data,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'User Order updated successfully!',
            data: data,
        });
    }
    catch (error) {
        if (error == 'Error: User not exists') {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error,
            });
        }
    }
});
exports.getOrdersUser = getOrdersUser;
const getTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [data] = yield (0, user_service_1.geOrdersTotalUserFromDB)(req.params.userId);
        if (!data) {
            res.status(200).json({
                success: true,
                message: 'You have no order information',
                data,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data,
        });
    }
    catch (error) {
        if (error == 'Error: User not exists') {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error,
            });
        }
    }
});
exports.getTotalPrice = getTotalPrice;
