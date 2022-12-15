import express from "express";
import { deleteUser, dislikeUser, getUser, likeUser, subscribeUser, unsubscribeUser, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();
 
// Update user
    router.put("/:id", verifyToken,  updateUser);


    // Delete user
    router.delete("/:id", verifyToken, deleteUser);


    // Get a user
    router.get("/find/:id", getUser);


    // Subscribe a user
    router.put("/sub/:id", verifyToken, subscribeUser);


    // Unsubscribe a user
    router.put("/unsub/:id", verifyToken, unsubscribeUser)

    // Like a user
    router.put("/like/:videoId", verifyToken, likeUser)

    // Dislike a user
    router.put("/dislike/:videoId", verifyToken, dislikeUser)

export default router;

