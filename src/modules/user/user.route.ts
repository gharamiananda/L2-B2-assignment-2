import express from 'express';
import {
  createUser,
  deleteUser,
  getOrdersUser,
  getTotalPrice,
  getUser,
  getUsers,
  updateOrderUser,
  updateUser,
} from './user.controller';

const router = express.Router();

router.get('/:userId', getUser);
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:userId/orders', updateOrderUser);
router.get('/:userId/orders', getOrdersUser);

router.delete('/:userId', deleteUser);
router.put('/:userId', updateUser);
router.get('/:userId/orders/total-price', getTotalPrice);

export default router;
