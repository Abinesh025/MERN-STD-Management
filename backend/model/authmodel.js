import mongoose from "mongoose";

const autherSchema = mongoose.Schema(
    {
        User:
        {
            type:String,
            required:true,
            unique:true
        },
        Dept:
        {
            type:String,
            required:true
        },
        Password:
        {
            type:String,
            required:true
        },
        ProfileImage:
        {
            type:String,
            default:""
        }
    },
    {timestamps:true}
);

const autherModel = new mongoose.model("user",autherSchema);

export default autherModel;