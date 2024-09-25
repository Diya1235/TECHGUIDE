import mongoose from "mongoose";

const coverLetterSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    recipientName: {
        type: String,
        required: true
    },
    recipientTitle: String,
    company: {
        name: String,
        address: String
    },
    salutation: {
        type: String,
        default: 'Dear Hiring Manager'
    },
    introduction: {
        type: String,
        required: true
    },
    body: [
        {
            paragraph: {
                type: String,
                required: true
            }
        }
    ],
    closing: {
        type: String,
        required: true
    },
    signOff: {
        type: String,
        default: 'Sincerely'
    },
    senderName: {
        type: String,
        required: true
    },
    senderContact: {
        email: String,
        phone: String,
        address: String
    }
});

export const CoverLetter = mongoose.model('CoverLetter', coverLetterSchema);


