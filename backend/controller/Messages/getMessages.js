import Conversation from "../../models/conversation.js";
import Message from "../../models/messageModel.js";

async function getMessages(req,res){
    const { otherUserId } = req.params;
	const userId = req.user.id;
    console.log(userId)
    console.log(otherUserId)
	try {
		const conversation = await Conversation.findOne({
			participants: { $all: [userId, otherUserId] },
		});

		if (!conversation) {
			return res.status(404).json({ error: "Conversation not found" });
		}

		const messages = await Message.find({
			conversationId: conversation._id,
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	}
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal Server"})
    }

}

export default getMessages;