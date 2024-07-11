import Post from '../../models/postModel.js';

export const handleMostLikedPost = async (req, res) => {
    try {
        const mostLikedPost = await Post.aggregate([
            {
                $addFields: {
                    likesCount: { $size: "$likesPeople" }
                }
            },
            {
                $sort: { likesCount: -1 }
            },
            {
                $limit: 1
            }
        ]);

        if (mostLikedPost.length > 0) {
            const post = mostLikedPost[0];
            const responseText = `The most liked post is "${post.text}" with ${post.likesPeople.length} likes.`;
            res.json({ fulfillmentText: responseText });
        } else {
            res.json({ fulfillmentText: 'There are no posts available.' });
        }

    } catch (error) {
        console.error('Error handling most_liked_post intent:', error);
        res.status(500).json({ fulfillmentText: 'An error occurred while handling the request.' });
    }
}
