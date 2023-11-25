import express, { Application } from 'express';
import cors from 'cors';
import userRoute from './modules/user/user.route';

const app: Application = express();

//perser

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoute);

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

export default app;
