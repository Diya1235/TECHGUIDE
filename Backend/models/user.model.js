import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        required:true
    },
    profile:{
        bio:{type:String},
        createdResume:[{type:String}],
        createdCL:[{type:String}],
        savedProjects:[{type:mongoose.Schema.Types.ObjectId,ref:'projects'}],
        profilepic:{
            type:String,
            default:""
        }
    }
},{timestamps:true});

export const User = mongoose.model('User',UserSchema);