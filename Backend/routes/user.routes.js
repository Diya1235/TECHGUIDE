import express from 'express';
import { login, logout, register, updateprofile } from '../controllers/user.controller.js';
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { addProject } from '../controllers/project.controller.js';
import {createResume,getAllResumes,getResumeById,updateResumeById,deleteResumeById} from "../controllers/resume.controller.js";
import  {createCoverLetter,getAllCoverLetters,getCoverLetterById,updateCoverLetterById,deleteCoverLetterById} from "../controllers/coverletter.controller.js";
import { singleUpload } from '../middlewares/multer.js';
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,updateprofile);
router.route("/addProject").post(addProject);
router.route("/resumes").post(createResume);
router.route("/getresumes").get(getAllResumes);
router.route("/resumes/:id").get(getResumeById);
router.route("/resumes/:id").patch(updateResumeById);
router.route("/resumes/:id").delete(deleteResumeById);
router.route("/coverLetters").post(createCoverLetter);
router.route("/coverLetters/user/:userId").post(getAllCoverLetters);
router.route("//coverLetters/:id").post(getCoverLetterById);
router.route("/coverLetters/:id").post(updateCoverLetterById);
router.route("/coverLetters/:id").post(deleteCoverLetterById);
export default router;