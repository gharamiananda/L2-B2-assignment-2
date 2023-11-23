import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();

//perser

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(`welcome world to next level  assgement -2`);
});

export default app;
