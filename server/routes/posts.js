import express from "express";
import { getMainPost, getPost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:sectionId", verifyToken, getMainPost);
router.get("/:postId/post", verifyToken, getPost);

export default router;