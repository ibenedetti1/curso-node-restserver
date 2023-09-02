
const { Router } = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {esRoleValido, emailExiste, existeUsuarioPorId} = require('../helpers/db-validators')

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();



//GET
router.get('/', usuariosGet );


//PUT
router.put('/:id', [
    check('id', 'No es in ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut );


//POST
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 letras').isLength({min: 6}),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], usuariosPost );


//DELETE
router.delete('/:id', [
    check('id', 'No es in ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete );
    

//PATCH
router.patch('/', usuariosPatch );





module.exports = router;