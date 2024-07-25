import express from 'express'
import authenticateToken from '../middleware/authenticateToken.js';
import sendMessage from '../controller/Messages/sendMessage.js';
import getMessages from '../controller/Messages/getMessages.js';
import getConversation from '../controller/Messages/getConversation.js';

const messageRouter = express.Router();

messageRouter.post("/sendMessage",authenticateToken,sendMessage);
messageRouter.get("/getMessage/:otherUserId",authenticateToken,getMessages)
messageRouter.get("/getConversation",authenticateToken,getConversation)



export default messageRouter;