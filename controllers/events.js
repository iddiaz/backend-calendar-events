// {
//    ok:true,
//    msg: 'obtener eventos'
// }


const { response } = require('express');
const Evento = require('../models/Evento');

const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');
const { generarJWT } = require('../helpers/jwt');



const crearEvento = async( req, res = response )=>{

   console.log(req.body );
   const evento = new Evento( req.body );

   try {

      evento.user = req.uid;

      const eventoGuardado = await evento.save();

      res.status(201).json({
         ok: true,
         msg: 'cearEvento',
         evento : eventoGuardado
      });
   



   } catch (err) {
      console.log(err);
      res.status(500).json({
         ok: false,
         msg: 'Error en el servidor'
      });

   }



};

const obtenerEventos = async( req, res = response )=>{
   // console.log(req.body);   
   const eventos = await Evento.find().populate('user', 'name');

   res.status(201).json({
      ok: true,
      eventos
   });


};

const actualizarEvento = async( req, res = response )=>{  
   
   const eventoId = req.params.id;
   const uid = req.uid;
  

   try {

     const evento = await Evento.findById( eventoId );

     if(!evento) {
         return res.status(404).json({
           ok: false,
           msg: 'Evento no existe por ese id'
         })
     }

     console.log('evento===', evento);

     if( evento.user.toString() !== uid ){

      return res.status(401).json({
         ok: false,
         msg: 'No tiene privilegio de editar este evento'
      });

     }

     const nuevoEvento = {
        ...req.body,
        user: uid
     }

     const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } ); //new opcion para que regrese la nueva actualziacion

      res.status(201).json({
         ok: true,
         msg: 'actualizarEvento',
         evento: eventoActualizado
      });


   } catch (err) {

      console.log(err);

      res.status(500).json({
         ok: true,
         msg: 'Error en servidor'
      
      });

   }
   
};

const eliminarEvento = async ( req, res = response )=>{   

   const eventoId = req.params.id;
   const uid = req.uid;
  

   try {

     const evento = await Evento.findById( eventoId );

     if(!evento) {
        return res.status(404).json({
           ok: false,
           msg: 'Evento no existe'
        })
     }

     console.log('evento===', evento);

     if( evento.user.toString() !== uid ){

      return res.status(401).json({
         ok: false,
         msg: 'No tiene privilegio de eliminar este evento'
      });

     }


     const eventoBorrado = await Evento.findByIdAndDelete( eventoId ); //new opcion para que regrese la nueva actualziacion

      res.status(201).json({
         ok: true,
         msg: 'actualizarEvento',
         eventoBorrado
      });


   } catch (err) {

      console.log(err);

      res.status(500).json({
         ok: true,
         msg: 'Error en servidor'
      
      });

   }

   res.status(201).json({
      ok: true,
      msg: 'eliminarEvento'
   })

   
};


module.exports = {
   obtenerEventos,
   crearEvento,
   actualizarEvento,
   eliminarEvento
   
}