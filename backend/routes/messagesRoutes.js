import express from 'express'
import authenticateToken from '../middleware/authenticateToken.js';
import sendMessage from '../controller/Messages/sendMessage.js';

const messageRouter = express.Router();

messageRouter.post("/sendMessage",authenticateToken,sendMessage);



export default messageRouter;