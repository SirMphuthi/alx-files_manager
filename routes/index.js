import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController'; // Import the new controller

const router = express.Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew); // Add the new endpoint

export default router;
