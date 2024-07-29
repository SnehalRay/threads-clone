import Conversation from "../../models/conversation.js";
import Message from "../../models/messageModel.js";

async function startConversation(req, res) {
    try{
        const senderId = req.user.id;
        const { participantId } = req.body;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, participantId] }
        });

        if (!conversation) {
            // Create a new conversation
            conversation = new Conversation({
                participants: [senderId, participantId]
            });
            await conversation.save();
        }

        res.status(200).json(conversation);

    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal Server"})
    }
}

export default startConversation;