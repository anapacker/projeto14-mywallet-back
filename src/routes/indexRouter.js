import { Router } from "express";
import authRouter from "./authRoute.js";
import transacRouter from "./transacRoute.js";

const router = Router()
router.use(authRouter)
router.use(transacRouter)
export default router