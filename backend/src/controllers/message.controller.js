import Message from "../models/message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
}   catch (error) {
    console.log("Error in getAllContacts:", error);
    res.status(500).json({ message: "Server Error" });
}
};

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user.id;
        const {id:userToChatId} = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })
        .populate("senderId", "username profilePicture")
        .populate("receiverId", "username profilePicture")
         .sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error im getMessages controller:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user.id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        const receiverSocketId = getRecieverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getChatHistory = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        });

        const chatHistory = [...new Set(messages.map(msg => msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()))];

        const chatContacts = await User.find({ _id: { $in: chatHistory } }).select("-password");
        res.status(200).json(chatContacts);
} catch (error) {
    console.log("Error in getChatHistory controller:", error.message);
    res.status(500).json({ message: "Server Error" });
}
};