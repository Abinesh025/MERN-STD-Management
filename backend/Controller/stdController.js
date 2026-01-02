import stdModel from "../model/stdModel.js";
import { v2 as cloudinary } from "cloudinary";
// <-----------Create Student------------>

export const getStudent = async(req,res)=>{
    try
    {
        const {StudentName,RegNum,Email,PhoneNum} = req.body;

        console.log(StudentName)

        // < ----------Regex For RegNum  ---------- >

        const regexofReg =  /^8208E(2[3-9]|[3-9][0-9])(CSR|ITR|MER|ADR|BSR|BER|EER|ECR'|CER)[0-9]{3}$/;

        const regNumcheck = regexofReg.test(RegNum);

        if(!regNumcheck){
            return res.status(400).json({error : "Please enter Valid ReGNum Format "});
        }

         // < ----------Regex For Email  ---------- >

        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const emailCheck = emailReg.test(Email);

        if(!emailCheck){
            return res.status(400).json({error : "Please enter Valid Email Format "});
        }

        if (PhoneNum.length !== 10) {
            return res.status(400).json({ error: "Invalid Phone Number" });
        }

          const newStudent = await new stdModel(
        {
            StudentName,
            RegNum,
            Email,
            PhoneNum
          })

          if(newStudent){
              await newStudent.save();
          }
          return res.status(200).json(newStudent)

    }
    catch(error)
    {
        return res.status(500).json({error:"Internal Serevr Error in Student"  + `${error.message}`});
    }
};

    // <-----------Read Student------------>

export const getStudentProfile = async(req,res)=>{
    try
    {
        const {StudentName} = req.params;

        const student = await stdModel.findOne({StudentName});

        console.log(student?.StudentName)

        if(!student){
            return res.status(400).json({error:"Student Not Found"});
        }

        return res.status(200).json(student);
    }
    catch(error)
    {
        return res.status(500).json({error:`Internal Server Error ${error.message}`})
    }
};

    // <-----------Updated Student------------>

export const getupdateStd = async(req,res)=>{
    try
    {
        const {studentName}= req.params;

        let {StudentName,RegNum,Email,PhoneNum} = req.body;

        let {ProfileImage} = req.body;

        const student = await stdModel.findOne({StudentName:studentName});

        console.log(student);

          const regexofReg =  /^8208E(2[3-9]|[3-9][0-9])(CSR|ITR|MER|ADR|BSR|BER|EER|ECR'|CER)[0-9]{3}$/;

        const regNumcheck = regexofReg.test(RegNum);

        if(!regNumcheck){
            return res.status(400).json({error : "Please enter Valid ReGNum Format "});
        }

         // < ----------Regex For Email  ---------- >

        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const emailCheck = emailReg.test(Email);

        if(!emailCheck){
            return res.status(400).json({error : "Please enter Valid Email Format "});
        }

            if(ProfileImage){
            if(student.ProfileImage){
                await cloudinary.uploader.destroy(student.ProfileImage.split("/").pop().split(".")[0]);
            }

         const changePhoto =    await cloudinary.uploader.upload(ProfileImage);
         ProfileImage = changePhoto.secure_url;
        }


        if(PhoneNum.length !== 10){
            return res.status(400).json({error:"Check your Phone Number"})
        }

        if(!student){
            return res.status(400).json({error:"User Not Found"});
        }
                student.StudentName = StudentName || student.StudentName;
                student.RegNum= RegNum || student.RegNum;
                student.Email= Email || student.Email;
                student.PhoneNum = PhoneNum || student.PhoneNum;
                student.ProfileImage = ProfileImage || student.ProfileImage

                await student.save();

                return res.status(200).json(student);
    }
    catch(error)
    {
        return res.status(500).json({error:`Internal Server Error in Update ${error.message}`});
    }
};
    // <-----------Delete Student------------>

export const getstdDelete = async(req,res)=>{
    try
    {
        const {id }= req.params;

        const student = await stdModel.findByIdAndDelete(id);

        console.log(student);

        if(!student){
            return res.status(400).json({error:"User Not Found"});
        }

        return res.status(200).json({message:"Student Deleted Successfully"});
    }
    catch(error)
    {
        return res.status(500).json({error:`Internal Server Error in Delete ${error.message}`});
    }
};

    // <-----------All Students------------>

export const getAllDetails = async(req,res)=>{
    try
    {
        const Students =  await stdModel.find();

        if(!Students){
            return res.status(400).json({error:"Students Not Find"});
        }

        return res.status(200).json(Students);

    }
    catch(error)
    {
        return res.status(500).json({error:`Internal Server Error ${error.message}`});
    }
}