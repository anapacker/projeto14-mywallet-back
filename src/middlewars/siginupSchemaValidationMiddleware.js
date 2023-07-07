import { signupSchema } from "../schemas/signupSchema.js"

export function signupSchemaValidation() {
    const validationSignup = signupSchema.validate(req.body, { abortEarly: false })
    if (validationSignup.error) {
        const errors = validationSignup.error.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }
    next()
}
