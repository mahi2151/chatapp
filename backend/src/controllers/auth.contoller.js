import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { generateToken } from "../utils/token.util.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";
export const signup = async (req,res)=>{
    console.log(req.body); // <--- check what you are receiving
    const { username, email, password } = req.body;

    
    try {
        if(!username || !email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }
        if(password.length < 8){
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({ email });
        if(user) return res.status(400).json({ message: "Email already exists" }); 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            try {
                await sendWelcomeEmail(email, username, ENV.CLIENT_URL);
            } catch (error) {
                console.error('Error sending welcome email:', error);
            }
            return res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            });
            
        }else{
            return res.status(400).json({ message: "Invalid user data" });}


    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req,res)=>{
    const { email, password } = req.body;
    try {
       const user = await User.findOne({ email });
       if(!user)
        return res.status(400).json({ message: "Invalid email or password" });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({ message: "Invalid email or password" });
        }
        generateToken(user._id,res);
        return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
       };

export const logout =  (_,res)=>{
    try{
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const updateProfile = async (req, res) => {
    try{
        const {profilePicture} = req.body;
        if(!profilePicture){
            return res.status(400).json({ message: "Profile picture is required" });
        }
        const userId = req.user._id;
        
        const uploadResponse = await cloudinary.uploader.upload(profilePicture)

        const updatedUser = await User.findByIdAndUpdate(userId, {
            profilePicture: uploadResponse.secure_url,
        }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
} 