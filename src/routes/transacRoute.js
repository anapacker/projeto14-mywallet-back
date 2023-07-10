import { Router } from "express";
import { transacSchemaValidationMiddleware } from "../middlewars/transacSchemaValidationMiddleware.js";
import { getTransac, postTransac } from "../controllers/transacController.js";

const transacRouter = Router()
transacRouter.post("/nova-transacao/:tipo", transacSchemaValidationMiddleware, postTransac)
transacRouter.get("/nova-transacao/:tipo", getTransac)


export default transacRouter