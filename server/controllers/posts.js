import Post from "../models/Post.js";

/* CREATE */
export const createReplyForPost = async (req, res) => {
    try {
        const { sectionId } = req.params;
        const { userId, description, picturePath, postId } = req.body;
        const newReplyPost = new Post({
            userId,
            sectionId,
            type: "reply",
            description,
            postReplies: [],
            likes: {},
            picturePath,
        });
        await newReplyPost.save();

        const post = await Post.findById(postId);
        post.postReplies.push(newReplyPost._id);
        await post.save();

        const sectionPosts = await Post.find({ sectionId });
        res.status(201).json(sectionPosts);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

/* READ */
export const getMainPost = async (req, res) => {
    try {
        const { sectionId } = req.params;
        // const mainPost = await Post.findOne({ sectionId, type: "main" });
        // res.status(200).json(mainPost);
        const sectionPosts = await Post.find({ sectionId });
        res.status(200).json(sectionPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findOne({ postId });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/* PATCH */
