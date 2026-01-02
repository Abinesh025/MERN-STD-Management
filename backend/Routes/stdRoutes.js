import express from "express";
import { getAllDetails, getstdDelete, getStudent, getStudentProfile, getupdateStd } from "../Controller/stdController.js";

const stdRouter = express.Router();

stdRouter.route("/details").post(getStudent);

stdRouter.route("/stdProfile/:StudentName").get(getStudentProfile);

stdRouter.route("/stdUpdated/:studentName").post(getupdateStd);

stdRouter.route("/stdDelete/:id").get(getstdDelete);

stdRouter.route("/AllDetails").get(getAllDetails);

export default stdRouter;