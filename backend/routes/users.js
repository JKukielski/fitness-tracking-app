import express from 'express';
import { updateUser, getUserData } from '../controllers/users.js';

const router = express.Router();

router.patch('/:id', updateUser);
router.get('/:id', getUserData);

export default router;
