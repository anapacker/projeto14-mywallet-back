import { Router } from "express";
import { signin, getSignin, signup } from "../controllers/authController.js";
import { userSchemaValidation } from "../middlewars/userSchemaValidationMiddleware.js";
import { signupSchemaValidation } from "../middlewars/siginupSchemaValidationMiddleware.js";
import { validateAuth } from "../middlewars/validateAuth.js";

const authRouter = Router()
authRouter.post("/sign-in", userSchemaValidation, signin)
authRouter.get("/sign-in", validateAuth, getSignin)
authRouter.post("/sign-up", signupSchemaValidation, signup)

export default authRouter