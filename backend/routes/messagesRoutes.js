import express from 'express'
import authenticateToken from '../middleware/authenticateToken.js';
import sendMessage from '../controller/Messages/sendMessage.js';
import getMessages from '../controller/Messages/getMessages.js';

const messageRouter = express.Router();

messageRouter.post("/sendMessage",authenticateToken,sendMessage);
messageRouter.get("/getMessage/:otherUserId",authenticateToken,getMessages)



export default messageRouter;