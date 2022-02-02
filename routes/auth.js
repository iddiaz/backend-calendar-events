/*
* rutas de usuarios 
* /host + /api/auth
*/



const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/new', [
   //midlewares
   check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
   check( 'email', 'El email es obligatorio' ).isEmail(),
   check( 'password', 'El password debe tener 6 caractéres como mínimo' ).isLength({ min:6 }),
   validarCampos

] ,crearUsuario );

router.post('/', [
   check( 'email', 'El email es obligatorio' ).isEmail(),
   check( 'password', 'El password debe tener 6 caractéres como mínimo' ).isLength({ min:6 }),
   validarCampos
], loginUsuario );

router.get('/renew', revalidarToken );





module.exports = router;