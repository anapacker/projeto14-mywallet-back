import Joi from "joi";

export const transacSchema = Joi.object({
    valor: Joi.number().positive().required(),
    descricao: Joi.string().required().min(3)
})