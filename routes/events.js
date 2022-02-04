/*
* rutas de eventos 
* /host + /api/events
*/
const { Router } = require('express');

const { eliminarEvento, actualizarEvento, crearEvento, obtenerEventos } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');

const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');


const router = Router();
// cualquier peticion debe usar validar token
router.use( validarJWT );

router.get('/', [
   //midlewares
] ,obtenerEventos );


router.post('/', [

   check('title', 'El título es obligatorio').not().isEmpty(),
   check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
   check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
   validarCampos

], crearEvento );



router.put('/:id', actualizarEvento );



router.delete('/:id',  eliminarEvento );





module.exports = router;