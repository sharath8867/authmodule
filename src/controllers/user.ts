import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../model/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function signin(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
if (!user) throw "User not found";
      const isMatch = await user.authenticate(password);
if (isMatch) throw "Invalid password";
        const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
          expiresIn: "3d",
        });
        res.status(200).json({
          message: "User is signed in successfully",
          body: { token, user:{
          _id: user._id,
          email: user.email,
          role: user.role,}, },
        });
      } catch (error) {
    res.status(400).json({
      message: "Signin error",
      error,
    });
  }
}

export async function signup(req: Request, res: Response) {
  const {
    employeeName,
    gender,
    designation,
    contactNumber,
    role,
    email,
    password,
  } = req.body;
try {
    const existingUser = await User.findOne({ email });
if (existingUser) 
      throw "User is already present in the database with this email address";
const userName = email.split("@")[0] + Date.now();
const hash_password = await bcrypt.hash(password, 10);
const _user = new User({
     employeeName,
      gender,
      designation,
      contactNumber,
      role: role ?? "user",
      email,
      hash_password,
      userName,
    });
const savedUser = await _user.save();
res.status(200).json({
      message: "User is signed up successfully",
      body: { User: savedUser },
    });
  } catch (error) {
    res.status(400).json({
      message: "Error while saving the user",
      error,
    });
  }
}
export async function getAllUser(req: any, res: Response) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;
const userList = await User.find({}).skip(skip).limit(limit);
const totalUsers = await User.countDocuments();
  
res.status(200).json({
      message: "List of available users",
      users: userList,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (error) {
    res.status(400).json({
      message:"Error fetching users",
      error,
    });
  }
}
export async function getUserByID(req: Request, res: Response) {
  try {
    const{ _id }= req.params ;
    
const userList = await User.find({ _id });
    res.status(200).json({
      message: "User is available",
      users: userList,
    });
  } catch (error) {
    res.status(400).json({
      message: "User is not available",
      error,
    });
  }
}