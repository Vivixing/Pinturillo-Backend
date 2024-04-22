const Joi = require('joi');

const palabraCreationSchema = Joi.object({
    texto: Joi.string()
        .min(2)
        .max(50)
        .required(),
});

const palabraUpdateSchema = Joi.object({
    idPalabra: Joi.string()
    .required(),
    texto: Joi.string()
        .min(2)
        .max(50)
        .required(),
})

module.exports = {
    palabraCreationSchema,
    palabraUpdateSchema
};