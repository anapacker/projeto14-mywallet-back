import { Router } from "express";
import { transacSchemaValidationMiddleware } from "../middlewars/transacSchemaValidationMiddleware.js";
import { getTransac, postTransac } from "../controllers/transacController.js";
import { validateAuth } from "../middlewars/validateAuth.js";

const transacRouter = Router()
transacRouter.post("/nova-transacao/:tipo", transacSchemaValidationMiddleware, validateAuth, postTransac)
transacRouter.get("/transacoes", validateAuth, getTransac)


export default transacRouter