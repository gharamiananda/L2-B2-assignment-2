"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const app = (0, express_1.default)();
//perser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/users', user_route_1.default);
app.get('/', (req, res) => {
    res.send(`welcome world to next level  assgement -2`);
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// app.use((error: any, req: Request, res: Response) => {
//   if (error) {
//     if (error.name == 'ZodError') {
//       res.status(500).json({
//         success: false,
//         message: 'ZOD Error',
//         error,
//       });
//       return;
//     } else if (error.name == 'CastError') {
//       res.status(500).json({
//         success: false,
//         message: 'CastError hhhh',
//         error,
//       });
//       return;
//     }
//   } else {
//     res.status(500).json({
//       success: false,
//       message: 'Something went wrong',
//       error,
//     });
//   }
// });
app.all('*', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'Route not found',
    });
});
exports.default = app;
