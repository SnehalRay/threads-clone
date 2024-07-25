import Conversation from "../../models/conversation.js";
import Message from "../../models/messageModel.js";

async function sendMessage(req, res) {
    try {
        const { recipientId, message, img } = req.body;
        const senderId = req.user.id; // Ensure req.user is populated
        console.log("HEYYYY-----------");
        console.log(req.user); // Log req.user to check if it is populated correctly

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recipientId] },
        });

        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, recipientId],
                lastMessage: {
                    text: message,
                    sender: senderId,
                },
            });
            await conversation.save();
        }

        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderId,
            text: message,
            img: img || "",
        });

        await Promise.all([
            newMessage.save(),
            conversation.updateOne({
                lastMessage: {
                    text: message,
                    sender: senderId,
                },
            }),
        ]);

        res.status(201).json(newMessage);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default sendMessage;
