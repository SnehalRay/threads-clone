import express from 'express';
import { handleMostFollowedPerson } from '../controller/AIChatBot/handleMostFollowedPerson.js';
import { handleMostLikedPost } from '../controller/AIChatBot/handleMostLikedPost.js';
import { handleSuggestUser } from '../controller/AIChatBot/handleSuggestUser.js';

const aiChatBotRoutes = express.Router();

aiChatBotRoutes.post('/webhook', async (req, res) => {
    try {
        const intentName = req.body.queryResult.intent.displayName;

        if (intentName === 'most_followed_person') {
            await handleMostFollowedPerson(req, res);
        } else if (intentName === 'most_liked_post') {
            await handleMostLikedPost(req, res);
        } 
        else if (intentName === 'suggest_user'){
            await handleSuggestUser(req,res)

        }
        else {
            // res.json({ fulfillmentText: 'Intent not handled by webhook.' });
        }
    } catch (error) {
        console.error('Error handling webhook request:', error);
        res.status(500).json({ fulfillmentText: 'An error occurred while handling the request.' });
    }
});

export default aiChatBotRoutes;
