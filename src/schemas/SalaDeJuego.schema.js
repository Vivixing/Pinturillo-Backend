const Joi = require("joi");

const SalaDeJuegoCreationSchema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(225),
    idCategoria: Joi.string()
        .required(),
    estado: Joi.string()
        .valid("Sin iniciar", "En curso", "Finalizado"),
    categoria: Joi.string()
        .min(3)
        .max(225)
    
    
});

const SalaDeJuegoUpdateSchema = Joi.object({
    idSalaDeJuego: Joi.number()
        .required(),
    nombre: Joi.string()
        .min(3)
        .max(225),
    idCategoria: Joi.string(),
    estado: Joi.string()
        .valid("Sin iniciar", "En curso", "Finalizado")
})

module.exports = {
    SalaDeJuegoCreationSchema,
    SalaDeJuegoUpdateSchema
};