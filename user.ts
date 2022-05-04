import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import  config  from "../config/config";
import jwt from 'jsonwebtoken';
import User from "../models/user";
import mongoose from "mongoose";


const login = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({username}).exec();
    if(!user){
        return res.status(400).json({
            error: 'Invalidad password or username'
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword){
        return res.status(400).json({
            error: 'Invalidad password or username'
        })
    }

    const token = jwt.sign({ username, id: user.id }, config.secrets.token)

    return res.status(200).json({
        message: "Login Succesfull",
        token
    });
}

const register = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password; 
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt)



    const userExists = await User.findOne({username}).exec();
    if(userExists){
        return res.status(400).json({
            error: 'Username already exists'
        });
    }

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username,
        password: passwordHash
    });

    const result = await user.save();

    return res.status(200).json({
        message: 'Register Success',
        user: {
            id: result._id,
            username: result.username 
        }
    });
}
 
export default { register, login };