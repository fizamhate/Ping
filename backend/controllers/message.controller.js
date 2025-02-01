import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

export const sendMessage = async (req,res) =>{
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params; //renamed to receiverid

        const senderId = req.user._id; //who is sending the message

        const conversation = await Conversation.findOne({
            participants:{$all: [senderId, receiverId]}, //give us convos between these two users
        })

        //Maybe if they are sending message for the first time, convo will be null
        if(!conversation){
            //create convo
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        

        // await conversation.save();
        // await newMessage.save();

        //This will run both together.
        await Promise.all([conversation.save(),newMessage.save()]);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({error:"Internal server error"});
    }
};

export const getMessages = async (req, res) =>{
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId, userToChatId]},
        }).populate("messages");

        //populate doesnt give the messages array rather gives each message one by one. not reference but message itself

        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
        
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({error:"Internal server error"});  
    }
}

