import Space from "../models/Space.js";

/* CREATE */
export const createSpace = async (req, res) => {
    try {
        const { name, description, picturePath } = req.body;
        const newSpace = new Space({
            name,
            description,
            picturePath,
        });
        await newSpace.save();

        const spaces = await Space.find();
        res.status(201).json(spaces);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

/* READ */
export const getSpaces = async (req, res) => {
    try {
        const spaces = await Space.find();
        res.status(200).json(spaces);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}