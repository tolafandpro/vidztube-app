import { createError } from './../utils/error.js';
import Video from '../model/Video.js';
import User from '../model/User.js';

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({userId: req.data.id, ...req.body});
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (err) {
        next(err);
    }
}
export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if(!video) return(createError(404, "Video not found"));
        if(req.data.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate( req.params.id, {$set: req.body},{new: true});
            res.status(200).json(updatedVideo);
        } else{
            return next(createError(403, "You can only update your uploaded videos"))
        }
    } catch (err) {
        next(err);
    }
}
export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if(!video) return(createError(404, "Video not found"));
        if(req.user.id === req.data.id) {
          await Video.findByIdAndDelete( req.params.id);
            res.status(200).json("Video delete Successfully");
        } else{
            return next(createError(403, "You can delete only your uploaded videos"))
        }
    } catch (err) {
        next(err);
    }
}
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
}
export const viewVideos = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {$inc:{viwes: 1}})
        res.status(200).json("Viwe added");
    } catch (err) {
        next(err);
    }
}
export const trendVideos = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({viwes:-1});
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}
export const randVideos = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{$sample:{size:40}}])
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}
export const subscribeVideos = async (req, res, next) => {
    try {
        const user = await User.findById(req.data.id);
        const subscribedChannels = await user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map((channelId) => {
                return Video.find({ userId: channelId});
            })
        )
        res.status(200).json(list.flat().sort((a, b)=>b.createdAt - a.createdAt));
    } catch (err) {
        next(err);
    }
};
export const getByTags = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
        const videos = await Video.find({ tags: {$in: tags}}).limit(20);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};
export const getBySearch = async (req, res, next) => {
    const query = req.query.q
    try {
        const videos = await Video.find({title: { $regex: query, $options: "i"}}).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}