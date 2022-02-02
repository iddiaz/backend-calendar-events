
const { response } = require('express');
const Usuario = require('../models/Usuario');

const { validationResult } = require('express-validator');


const crearUsuario = async( req,res = response )=>{
   console.log(req.body);

   const { name, email, password } = req.body;

   try {
      
      let usuario = await Usuario.findOne({ email })
      console.log(usuario);

      if( usuario ){
         res.status(400).json({
            ok: false,
            msg: 'El correo del usuario ya está registrado'
         })
      }

      usuario = new Usuario( req.body );
   
      await usuario.save();
      
      res.status(201).json({
         ok: true,
         uid: usuario.id,
         name: usuario.name
      });

   } catch(err) {
      
      console.log(err);

      res.status(500).json({
         ok: false,
         msg:'Error en el servidor'
      })

   }


};

const loginUsuario = ( req, res = response )=>{

   const { email, password } = req.body;
   
   res.json({
      ok: true,
      msg: 'login',
      email,
      password
   })
};

const revalidarToken = ( req, res = response )=>{
   
   
   res.json({
      ok: true,
      msg: 'revalidar token'
   })
};


module.exports = {
   crearUsuario,
   loginUsuario,
   revalidarToken
}