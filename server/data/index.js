import mongoose from "mongoose";

const spaceIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const spaces = [
    {
        _id: spaceIds[0],
        name: "Health",
        description: "This space is intended for health professionals, discuss anything here!",
        picturePath: "dab.jpg",
    },
    {
        _id: spaceIds[1],
        name: "Internships",
        description: "Find your next internship here!",
        picturePath: "dab.jpg",
    },
    {
        _id: spaceIds[2],
        name: "Higher Education",
        description: "Don't worry! This space can help you plan for the future.",
        picturePath: "dab.jpg",
    },
    {
        _id: spaceIds[3],
        name: "Sports",
        description: "Get active! Find your sport partners here!",
        picturePath: "dab.jpg",
    },
    {
        _id: spaceIds[4],
        name: "Food",
        description: "Tell us your favorite food in Singapore!",
        picturePath: "dab.jpg",
    },
];

const sectionIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];

export const sections = [
    {
        _id: sectionIds[0],
        spaceId: spaceIds[0],
        name: "Covid",
        description: "Let's talk about covid!",
    },
    {
        _id: sectionIds[1],
        spaceId: spaceIds[0],
        name: "Cancer",
        description: "Let's talk about cancer!",
    },
    {
        _id: sectionIds[2],
        spaceId: spaceIds[1],
        name: "Silicon Valley",
        description: "Anything about Silicon Valley Internships!",
    },
    {
        _id: sectionIds[3],
        spaceId: spaceIds[1],
        name: "Work-Life Balance",
        description: "Let's talk about work-life balance!",
    },
    {
        _id: sectionIds[4],
        spaceId: spaceIds[2],
        name: "NUS",
        description: "Let's talk about NUS Admissions!",
    },
    {
        _id: sectionIds[5],
        spaceId: spaceIds[2],
        name: "NTU",
        description: "Let's talk about NTU Admissions!",
    },
    {
        _id: sectionIds[6],
        spaceId: spaceIds[3],
        name: "Tennis",
        description: "Let's talk about Tennis!",
    },
    {
        _id: sectionIds[7],
        spaceId: spaceIds[3],
        name: "Football",
        description: "Let's talk about Football!",
    },
    {
        _id: sectionIds[8],
        spaceId: spaceIds[4],
        name: "Hawker Centre",
        description: "Share with us your favorite hawker centres!",
    },
    {
        _id: sectionIds[9],
        spaceId: spaceIds[4],
        name: "Fine Dining",
        description: "Feeling fancy! Let's have a nice dinner.",
    },
];