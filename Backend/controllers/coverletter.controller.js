import {CoverLetter} from '../models/coverletter.model.js'; // Adjust the path as needed

// Create a new cover letter
export const createCoverLetter = async (req, res) => {
    try {
        const coverLetter = new CoverLetter(req.body);
        await coverLetter.save();
        res.status(201).send(coverLetter);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all cover letters for a user
export const getAllCoverLetters = async (req, res) => {
    const { userId } = req.params;
    try {
        const coverLetters = await CoverLetter.find({ userId });
        res.status(200).send(coverLetters);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a specific cover letter by ID
export const getCoverLetterById = async (req, res) => {
    const { id } = req.params;
    try {
        const coverLetter = await CoverLetter.findById(id);
        if (!coverLetter) {
            return res.status(404).send();
        }
        res.status(200).send(coverLetter);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a cover letter by ID
export const updateCoverLetterById = async (req, res) => {
    const { id } = req.params;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['recipientName', 'recipientTitle', 'company', 'salutation', 'introduction', 'body', 'closing', 'signOff', 'senderName', 'senderContact'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const coverLetter = await CoverLetter.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!coverLetter) {
            return res.status(404).send();
        }
        res.status(200).send(coverLetter);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a cover letter by ID
export const deleteCoverLetterById = async (req, res) => {
    const { id } = req.params;
    try {
        const coverLetter = await CoverLetter.findByIdAndDelete(id);
        if (!coverLetter) {
            return res.status(404).send();
        }
        res.status(200).send(coverLetter);
    } catch (error) {
        res.status(500).send(error);
    }
};


