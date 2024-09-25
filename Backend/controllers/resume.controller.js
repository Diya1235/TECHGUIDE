import {Resume} from "../models/resume.model.js"; // Adjust the path as needed

// Create a new resume
export const createResume = async (req, res) => {
    try {
        const resume = new Resume(req.body);
        await resume.save();
        res.status(201).send(resume);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all resumes
export const getAllResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({});
        res.status(200).send(resumes);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a specific resume by ID
export const getResumeById = async (req, res) => {
    const { id } = req.params;
    try {
        const resume = await Resume.findById(id);
        if (!resume) {
            return res.status(404).send();
        }
        res.status(200).send(resume);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a resume by ID
export const updateResumeById = async (req, res) => {
    const { id } = req.params;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'contact', 'summary', 'education', 'experience', 'projects', 'skills', 'certifications', 'languages', 'interests'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const resume = await Resume.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!resume) {
            return res.status(404).send();
        }
        res.status(200).send(resume);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a resume by ID
export const deleteResumeById = async (req, res) => {
    const { id } = req.params;
    try {
        const resume = await Resume.findByIdAndDelete(id);
        if (!resume) {
            return res.status(404).send();
        }
        res.status(200).send(resume);
    } catch (error) {
        res.status(500).send(error);
    }
};


