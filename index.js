const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

console.log(process.env);

//crear servidor express
const app = express();

//Base de datos
dbConnection();

//directorio publico
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() );

//rutas
app.use('/api/auth', require('./routes/auth'));
//TODO: auth/crer, login,renew
//TODO: CRUD eventos


//escuchar peticiones
app.listen( process.env.PORT , ()=>{
   console.log(`servidor escuchando en puerto ${ process.env.PORT }`);
})