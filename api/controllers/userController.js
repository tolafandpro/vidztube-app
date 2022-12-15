import { createError } from "../utils/error.js";
import User from "../model/User.js";
import Video from "../model/Video.js";

// Update User function
export const updateUser = async (req, res, next) => {
    if (req.params.id === req.data.id) {
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set: req.body}, {new: true})
            res.status(200).json(updatedUser);
        }catch (err){
            next(err);
        }        
    }else {
        return next(createError(403, "You can update only your account"));
    }  
};
// Get a User function
export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id)
        res.send(user).status(200);
    }catch (err){
        next(err);
    }
};
// Subscribe User function
export const subscribeUser = async (req, res, next) => {
    try{
         await User.findByIdAndUpdate(req.data.id, {$push:{subscribedUsers: req.params.id}});
         await User.findByIdAndUpdate(req.params.id, {$inc:{subscribers: 1}});
        res.json("Subscription Successfull.").status(200);
    }catch (err){
        next(err);
    }
};
// Unsubscribe User function
export const unsubscribeUser = async (req, res, next) => {
    try{
        await User.findByIdAndUpdate(req.data.id, {$pull:{subscribedUsers: req.params.id}});
        await User.findByIdAndUpdate(req.params.id, {$inc:{subscribers: -1}});
       res.send("Unsubscription Successfull.").status(200);
    }catch (err){
        next(err);
    }
};
// Like User function
export const likeUser = async (req, res, next) => {
    const id = req.data.id;
    const videoId = req.params.videoId;
    try{
        await Video.findByIdAndUpdate(videoId,{ $addToSet:{likes:id}, $pull:{dislikes:id}})
        res.json("Video has been liked").status(200);
    }catch (err){
        next(err);
    }
};
// Dislike User function
export const dislikeUser = async (req, res, next) => {
        const id = req.data.id;
        const videoId = req.params.videoId;
        try{
            await Video.findByIdAndUpdate(videoId,{ $addToSet:{dislikes:id}, $pull:{likes:id}})
            res.json("Video has been disliked").status(200);
        }catch (err){
            next(err);
        }  
};


export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.data.id) {
        try{
            await User.findByIdAndDelete(req.params.id) 
            res.status(200).json("User has been deleted");
        }catch (err){
            next(err);
        }        
    }else {
        return next(createError(403, "You can only delete your account"));
    }  
}