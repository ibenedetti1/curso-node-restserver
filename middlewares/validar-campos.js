const {validationResult} = require('express-validator');

const validarCampos = (req, res, next) => {     // si el middleware pasa se usa el next para que pase al siguiente middleware

    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
        return res.status(400).json(errors);
    }

    next();
}



module.exports = {
    validarCampos
}