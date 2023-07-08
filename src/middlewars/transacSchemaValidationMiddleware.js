import { transacSchema } from "../schemas/transacSchema.js"

export function transacSchemaValidationMiddleware(req, res, next) {
    const validationTransac = transacSchema.validate(req.body, { abortEarly: false })
    if (validationTransac.error) {
        const errors = validationTransac.error.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }
    next()
}