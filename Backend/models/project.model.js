import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: false // Assuming the video is optional
    },
    images: [
        {
            type: String,
            required: false // Assuming images are optional
        }
    ],
    technology: [
        {
            type: String,
            required: true
        }
    ],
    prerequisites: [
        {
            type: String,
            required: false // Assuming prerequisites are optional
        }
    ],
    positions: 
        {
            type: String,
            required: true
        }
    ,
    
    
    
});

export const Project = mongoose.model('Project', projectSchema);


