import Post from "../models/Post.js";
import Section from "../models/Section.js";

/* CREATE SECTION */
export const createSectionForSpace = async (req, res) => {
    try {
        const { spaceId } = req.params;
        const { name, description, userId, mainPostDescription, picturePath, userName, userPicturePath } = req.body;

        const newSection = new Section({
            spaceId,
            name,
            description,
        });
        await newSection.save();

        const newMainPost = new Post({
            userId,
            userName,
            sectionId: newSection._id,
            type: "main",
            description: mainPostDescription,
            postReplies: [],
            likes: {},
            picturePath,
            userPicturePath,
        })
        await newMainPost.save();

        const sections = await Section.find({ spaceId });
        res.status(201).json(sections);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

/* READ */
export const getSectionsForSpace = async (req, res) => {
    try {
        const { spaceId } = req.params;
        const sections = await Section.find({ spaceId });
        res.status(200).json(sections);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}