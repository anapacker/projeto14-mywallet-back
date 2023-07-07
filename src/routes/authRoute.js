import { Router } from "express";
import { signin, getSignin, signup } from "../controllers/authController.js";
import { userSchemaValidation } from "../middlewars/userSchemaValidationMiddleware.js";
import { signupSchemaValidation } from "../middlewars/siginupSchemaValidationMiddleware.js";

const authRouter = Router()
authRouter.post("/sign-in", userSchemaValidation, signin)
authRouter.get("/sign-in", getSignin)
authRouter.post("/sign-up", signupSchemaValidation, signup)

export default authRouter