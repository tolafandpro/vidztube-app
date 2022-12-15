import express from "express";
import { addVideo, deleteVideo, getBySearch, getByTags, getVideo, randVideos, subscribeVideos, trendVideos, updateVideo, viewVideos } from "../controllers/videoController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//Create a video
router.post("/", verifyToken, addVideo);

//Get a video
router.get("/find/:id", getVideo);

//Update a video
router.put("/:id", verifyToken, updateVideo );

//Delete a video
router.delete("/:id", verifyToken, deleteVideo );

router.put("/view/:id", viewVideos );

//Get trending videos
router.get("/trend", trendVideos );
//Get random videos
router.get("/random", randVideos );
//Get subscribed videos
router.get("/sub", verifyToken, subscribeVideos );
//Get videos by tags
router.get("/tags", getByTags );
//Get Searching videos
router.get("/search", getBySearch );

export default router;

