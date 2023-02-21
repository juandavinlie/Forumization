import mongoose from "mongoose";

const spaceSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        description: {
            type: String,
            required: true
        },
        picturePath: String,
    },
    { timestamps: true }
);

const Space = mongoose.model("Space", spaceSchema);

export default Space;