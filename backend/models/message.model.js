import mongoose from "mongoose";

//using timestamps function. Mongoose will automatically create the createdat fields for us so we can show when message has been sent.

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message:{
        type: String,
        required: true
    }
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

export default Message;