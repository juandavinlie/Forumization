import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        sectionId: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        postReplies: {
            type: Array,
            default: [],
        },
        likes: {
            type: Map,
            of: Boolean,
        },
        picturePath: String,
        userPicturePath: String,
    },
    { timestamps: true }
)

const Post = mongoose.model("Post", postSchema);

export default Post;