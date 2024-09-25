import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startDate: Date,
    endDate: Date,
    description: String
});

const experienceSchema = new mongoose.Schema({
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    responsibilities: [String]
});

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String,
    technologies: [String]
});

const skillSchema = new mongoose.Schema({
    name: String,
    level: String // Beginner, Intermediate, Advanced
});

const resumeSchema = new mongoose.Schema({
    name: String,
    contact: {
        email: String,
        phone: String,
        address: String,
        linkedin: String,
        github: String
    },
    summary: String,
    education: [educationSchema],
    experience: [experienceSchema],
    projects: [projectSchema],
    skills: [skillSchema],
    certifications: [String],
    languages: [String],
    interests: [String]
});

export const Resume = mongoose.model('Resume', resumeSchema);


