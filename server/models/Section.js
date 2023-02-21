import mongoose from "mongoose";

const sectionSchema = mongoose.Schema(
    {
        spaceId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Section = mongoose.model("Section", sectionSchema);

export default Section;