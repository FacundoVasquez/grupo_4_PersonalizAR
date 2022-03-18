const { check } = require('express-validator');

const validation = [

check("email").notEmpty().withMessage("El campo E-mail: no puede estar vacío").bail().isEmail().withMessage("E-mail: debe ser un e-mail"),
check("password").notEmpty().withMessage("El campo Contraseña: no puede estar vacío").bail().isLength({min:6}).withMessage("La contraseña debe contener 6 caracteres mínimo"),
check("password1").notEmpty().withMessage("El campo Confirmación: de contraseña no puede estar vacío").bail().isLength({min:6}).withMessage("La contraseña debe contener 6 caracteres mínimo"),
check("password").equals("password1").withMessage("Las contraseñas no coinciden"),

]

module.exports = validation;