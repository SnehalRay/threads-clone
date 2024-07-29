import Conversation from "../../models/conversation.js";
import Message from "../../models/messageModel.js";

async function getConversation(req,res){
    const userId = req.user.id;

    try{
        const conversations = await Conversation.find({ participants: userId }).populate({
			path: "participants",
			select: "username profilePic",
		});

		conversations.forEach((conversation) => {
			conversation.participants = conversation.participants.filter(
				(participant) => participant._id.toString() !== userId.toString()
			);
		});
		res.status(200).json(conversations);



    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export default getConversation;