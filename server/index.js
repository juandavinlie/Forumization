import express, { application } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import { createSpace } from "./controllers/spaces.js";
import { createSectionForSpace } from "./controllers/sections.js";
import { createReplyForPost } from "./controllers/posts.js";
import authRoutes from "./routes/auth.js";
import spaceRoutes from "./routes/spaces.js";
import sectionRoutes from "./routes/sections.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import { verifyToken } from "./middleware/auth.js";
import Space from "./models/Space.js";
import { spaces, sections } from "./data/index.js";
import Section from "./models/Section.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/spaces", verifyToken, upload.single("picture"), createSpace);
app.post("/:spaceId/sections", verifyToken, upload.single("picture"), createSectionForSpace);
app.post("/:sectionId/posts", verifyToken, upload.single("picture"), createReplyForPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/spaces", spaceRoutes);
app.use("/sections", sectionRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // Space.insertMany(spaces);
    // Section.insertMany(sections);
}).catch((error) => console.log(`${error} did not connect`));