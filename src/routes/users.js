import express from 'express';
import { deleteUserById ,getAllUsers, getUsersById, login, signup } from '../controllers/users.controller.js';

const router = express.Router();

router.post('/signup', signup)

router.post('/login', login)

router.get('/allusers',getAllUsers )

router.get('/find/:id', getUsersById)

router.delete('/delete/:id', deleteUserById); 

export default router