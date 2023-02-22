import express from "express";
import { getSectionPosts, getPost, likePost, getStructuredMainPost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:sectionId", verifyToken, getSectionPosts);
router.get("/:sectionId/structured", verifyToken, getStructuredMainPost);

router.patch("/:id/like", verifyToken, likePost);

export default router;