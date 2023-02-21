import express from "express";
import { getSectionsForSpace } from "../controllers/sections.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:spaceId", verifyToken, getSectionsForSpace);

export default router;