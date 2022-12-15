import Comment from "../model/Comment.js"
import Video from "../model/Video.js";
import { createError } from './../utils/error.js';


export const addComment = async (req, res, next) => {
    const newComment = new Comment({...req.body, userId: req.data.id })
        try {
            const savedComment = await newComment.save();
            res.status(200).json(savedComment);
        } catch (err) {
            next(err)
        }
}
export const deleteComment = async (req, res, next) => {
        try {
            const deleteComment = await Comment.findById(req.params.id);
            const video = await Video.findById(req.params.id)
            if(!deleteComment) return(createError(404, "Can't find your comments"))
            if(req.data.id === Comment.userId || req.data.id === video.userId) {
                await Comment.findByIdAndDelete(req.params.id);
                res.status(200).json("Comment deleted successfully")
            } else {
                return next(createError(403, "You can delete on your comment"))
            }
            res.status(200).json("")
        } catch (err) {
            next(err)
        }
}
export const getComments = async (req, res, next) => {
        try {
            const comments = await Comment.find({videoId:req.params.videoId})
            res.status(200).json(comments)
        } catch (err) {
            next(err)
        }
}