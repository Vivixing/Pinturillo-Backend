const Joi = require("joi");

const PalabraPorCategoriaCreationSchema = Joi.object({
    idPalabras: Joi.string()
        .required(),
    idCategoria: Joi.string()
        .required(),
});

const PalabraPorCategoriaUpdateSchema = Joi.object({
    idPalabraPorCategoria: Joi.number()
        .integer()
        .positive()
        .required(),
    idPalabras: Joi.String()
        .required(),
    idCategoria: Joi.String()
        .required()
})

module.exports = {
    PalabraPorCategoriaCreationSchema,
    PalabraPorCategoriaUpdateSchema
};s