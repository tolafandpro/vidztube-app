import { mongoose } from 'mongoose';
import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from './../utils/error.js';

export const signUp = async (req, res, next) => {
        try {
            const user = await User.findOne({username: req.body.username});
            if (user) return next(createError(400, "Username has been used by another user"));
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newUser = new User({...req.body, password: hash})
            
            await newUser.save();
            res.status(200).json("User has been created");
        } catch (err) {
            next(err)
        };
};
export const signIn = async (req, res, next) => {
        const user = await User.findOne({username: req.body.username})
        if (!user) return next(createError(404, "Invalid Username!"));
    try {
        
            const isCorrect = await bcrypt.compare(req.body.password, user.password);
            if (!isCorrect) return next(createError(400, "Invalid Password"));

            const token = jwt.sign({id: user._id}, process.env.JWT);

            const {password, ...others} = user._doc;
            res.cookie("access_token", token, {httpOnly: true}).status(200).json({...others});
        } catch (err) {
            next(err)
        };
};

export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(user) {
            const token = jwt.sign({id: user._id}, process.env.JWT);
            res.cookie("access_token", token, {httpOnly: true}).status(200).json(user._doc);
        }else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            })
            const savedUser = await newUser.save();
            const token = jwt.sign({id: savedUser._id}, process.env.JWT);
            res.cookie("access_token", token, {httpOnly: true}).status(200).json(savedUser._doc);
        }
    } catch (err) {
        next(err);
    }
};