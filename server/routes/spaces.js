import express from "express";
import { getSpaces } from "../controllers/spaces.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getSpaces);

export default router;