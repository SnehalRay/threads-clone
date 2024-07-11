import User from '../../models/userModel.js';
import mongoose from 'mongoose';

export const handleSuggestUser = async (req, res) => {
  try {
    // Find any random user
    const suggestedUsers = await User.aggregate([
      { $sample: { size: 1 } } // Randomly select one user
    ]);

    if (suggestedUsers.length > 0) {
      const suggestedUser = suggestedUsers[0];
      const responseText = `Drumrolls.... the random user is ${suggestedUser.username}.`;
      res.json({ fulfillmentText: responseText });
    } else {
      res.json({ fulfillmentText: 'There are no users to suggest.' });
    }
  } catch (error) {
    console.error('Error handling suggest_user intent:', error);
    res.status(500).json({ fulfillmentText: 'An error occurred while handling the request.' });
  }
};
