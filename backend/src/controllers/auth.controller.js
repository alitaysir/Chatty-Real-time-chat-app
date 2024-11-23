import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    // Check for missing details
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "Missing details" });
    }

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save the user and generate a token
    await newUser.save();
    generateToken(newUser._id, res);

    res.status(201).json({
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing details
    if (!email || !password) {
      return res.status(400).json({ message: "Missing details" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    // Verify password
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token and respond
    generateToken(user._id, res);

    res.status(200).json({
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const logout=(req,res)=>{
  try {
    res.cookie("jwt","")
    res.status(201).json({message:"Logged out successfully"})
    
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateprofile= async(req,res)=>{
  try {
    const {profilePic}= req.body
    const userId=req.user._id

    if(!profilePic){
      return res.status(400).json({ message: "Missing details" });
    }

    const uploadresponse= await cloudinary.uploader.upload(profilePic)
    const updatedUser= await User.findByIdAndUpdate(userId,
      {profilePic: uploadresponse.secure_url},
      {new:true}
    )

    res.status(200).json({updatedUser})

    
  } catch (error) {
    console.log("Error in prfoile-update controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const checkAuth= async(req,res)=>{
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
