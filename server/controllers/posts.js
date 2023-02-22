import Post from "../models/Post.js";

/* CREATE */
export const createReplyForPost = async (req, res) => {
    try {
        const { sectionId } = req.params;
        const { userId, description, picturePath, postId, userName, userPicturePath } = req.body;
        const newReplyPost = new Post({
            userId,
            userName,
            sectionId,
            type: "reply",
            description,
            postReplies: [],
            likes: {},
            picturePath,
            userPicturePath
        });
        await newReplyPost.save();

        const post = await Post.findById(postId);
        post.postReplies.push(newReplyPost._id);
        await post.save();

        // const sectionPosts = await Post.find({ sectionId });
        // res.status(201).json(sectionPosts);
        const mainPost = await Post.findOne({ sectionId, type: "main" });
        const formattedMainPost = await generateFormattedStructuredPosts(mainPost);
        res.status(201).json(formattedMainPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

/* READ */
export const getSectionPosts = async (req, res) => {
    try {
        const { sectionId } = req.params;
        const sectionPosts = await Post.find({ sectionId });
        res.status(200).json(sectionPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getStructuredMainPost = async (req, res) => {
    try {
        const { sectionId } = req.params;

        const mainPost = await Post.findOne({ sectionId, type: "main" });
        const formattedMainPost = await generateFormattedStructuredPosts(mainPost);
        res.status(200).json(formattedMainPost);
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

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, sectionId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }
        
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        const mainPost = await Post.findOne({ sectionId, type: "main" });
        const formattedMainPost = await generateFormattedStructuredPosts(mainPost);
        res.status(200).json(formattedMainPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/* HELPERS */
const generateFormattedStructuredPosts = async (post) => {
    if (post && post.postReplies.length == 0) {
        return post
    }

    const formattedPostReplies = await Promise.all(post.postReplies.map(async (postId) => {
        const reply = await Post.findById(postId);
        const formattedReply = await generateFormattedStructuredPosts(reply);
        return formattedReply;
    }));
    post.postReplies = formattedPostReplies;
    return post;
}