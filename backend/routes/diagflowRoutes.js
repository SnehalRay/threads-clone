// routes/dialogflowRoutes.js
import express from 'express';
import dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';

const dialogflowRoutes = express.Router();

dialogflowRoutes.post('/', async (req, res) => {
  const { message } = req.body;

  // Create a new session
  const sessionId = uuidv4();
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(process.env.DIALOGFLOW_PROJECT_ID, sessionId);

  // The text query request
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.json({ fulfillmentText: result.fulfillmentText });
  } catch (error) {
    console.error('Error connecting to Dialogflow', error);
    res.status(500).send('Error connecting to Dialogflow');
  }
});

export default dialogflowRoutes;
