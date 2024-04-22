import Joi from "joi";

export const palabraCreationSchema = Joi.object({
    texto: Joi.string()
        .min(2)
        .max(50)
        .required(),
});


export const palabraUpdateSchema = Joi.object({
    id: Joi.string()
    .required(),
    texto: Joi.string()
        .min(2)
        .max(50)
        .required(),
})