import express from "express";
import { getLogin, getLogout, getMe, getProfile, getSignUp, getupdateAuth } from "../Controller/authController.js";
import { protectRoutes } from "../Utilis/protectRoutes.js";

const authRouter = express.Router();


authRouter.route("/signup").post(getSignUp);

authRouter.route("/login").post(getLogin);

authRouter.route("/logout").post(getLogout);

authRouter.route("/getMe").get(protectRoutes,getMe);

authRouter.route("/getProfile/:user").get(protectRoutes,getProfile);

authRouter.route("/UpdateAuther/:user").post(protectRoutes,getupdateAuth);


export default authRouter;