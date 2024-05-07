const Joi = require("joi");

const PalabraPorCategoriaCreationSchema = Joi.object({
    idPalabra: Joi.string()
        .required(),
    idCategoria: Joi.string()
        .required(),
});

const PalabraPorCategoriaUpdateSchema = Joi.object({
    idPalabra: Joi.string()
        .required(),
    idCategoria: Joi.string()
        .required()
})

module.exports = {
    PalabraPorCategoriaCreationSchema,
    PalabraPorCategoriaUpdateSchema
};