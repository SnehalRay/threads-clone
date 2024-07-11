import User from '../../models/userModel.js';

export const handleMostFollowedPerson = async (req, res) => {
  try {
    const mostFollowedUser = await User.aggregate([
      {
        $addFields: {
          followersCount: { $size: "$followers" }
        }
      },
      {
        $sort: { followersCount: -1 }
      },
      {
        $limit: 1
      }
    ]);

    if (mostFollowedUser.length > 0) {
      const user = mostFollowedUser[0];
      const responseText = `The most followed person is ${user.username} with ${user.followers.length} followers.`;
      res.json({ fulfillmentText: responseText });
    } else {
      res.json({ fulfillmentText: 'There are no users available.' });
    }
  } catch (error) {
    console.error('Error handling most_followed_person intent:', error);
    res.status(500).json({ fulfillmentText: 'An error occurred while handling the request.' });
  }
};
