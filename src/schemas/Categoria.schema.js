const Joi = require("joi");

const CategoriaCreationSchema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(225)
        .required()
});

const CategoriaUpdateSchema = Joi.object({
    idCategoria: Joi.string()
    .required(),
    nombre: Joi.string()
        .min(3)
        .max(225)
        .required()
})

module.exports = {
    CategoriaCreationSchema,
    CategoriaUpdateSchema
};