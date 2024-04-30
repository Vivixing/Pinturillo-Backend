const Joi = require("joi");

const PalabraPorCategoriaCreationSchema = Joi.object({
    idPalabras: Joi.string()
        .required(),
    idCategoria: Joi.string()
        .required(),
});

const PalabraPorCategoriaUpdateSchema = Joi.object({
    idPalabras: Joi.string(),
    idCategoria: Joi.string(),
})

module.exports = {
    PalabraPorCategoriaCreationSchema,
    PalabraPorCategoriaUpdateSchema
};s