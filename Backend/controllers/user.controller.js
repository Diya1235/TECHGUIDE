import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
//signup logic
export const register = async (req, res) => {
    try {
        const { fullname, email, password, phone, role } = req.body;
        if (!fullname || !email || !password || !phone || !role) {
            return res.status(400).json({
                message: "Some fields are missing",
                success: false
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            })
        }
        const hashedpassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            password: hashedpassword,
            phone,
            role,



        });
        newUser.save();
        return res.status(200).json({
            message: "Account created successfully",
            success: true
        })

    }
    catch (error) {
        console.log("Error:" + error);
    }
}

//login logic

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Some fields are missing",
                success: false
            });
        }
        const admin = "techguide@gmail.com";
        const pass = "TechGuide";

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email/password",
                success: false
            })
        }
        const ispasswordmatched = await bcrypt.compare(password, user.password);
        if (!ispasswordmatched) {
            return res.status(400).json({
                message: "Incorrect email/password",
                success: false
            })
        }

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile,
            bio: user.bio
        }
        //storing token in cookies

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 1000, httpsOnly: true, sameSite: 'strict' })
            .json({
                message: `Welcome back ${user.fullname}`,
                success: true
            })

    }
    catch (err) {
        console.log(err);
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout successfully",
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}
export const updateprofile = async (req, res) => {
    try {
        const { fullname, email, phone, bio, profilepic } = req.body;
        if (!fullname || !email || !phone || !bio || !profilepic) {
            return res.status(400).json({
                message: "Some fields are missing",
                success: false
            });
        };
        //cloudinary 


        const userId = req.id; //middleware authentication
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }
        //updating data
        user.fullname = fullname,
            user.email = email,
            user.phone = phone,
            user.profilepic = profilepic,
            user.bio = bio

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile,
            bio: user.bio
        }
        return res.status(200).json({
            message: "Profile updated",
            user
        })
    }
    catch (err) {
        console.log(err);
    }
}