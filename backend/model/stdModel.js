import mongoose from "mongoose";

const stdSchema = mongoose.Schema(
    {
        StudentName:
        {
            type:String,
            unique:true,
            required:true
        },
        RegNum:
        {
            type:String,
            unique:true,
            required:true
        },
        Email:
        {
            type:String,
            unique:true,
            required:true
        },
        PhoneNum:
        {
            type:String,
            unique:true,
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

const stdModel = new mongoose.model("student",stdSchema);

export default stdModel;