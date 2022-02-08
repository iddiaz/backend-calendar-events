const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// console.log(process.env);

//crear servidor express
const app = express();

//Base de datos
dbConnection();

//cors
app.use( cors() );

//directorio publico
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() );

//rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Redirección para cuando la ruta no se conoce
// app.get('*', (req, res)=>{
//    res.sendFile(path.resolve(__dirname, "../public", "index.html"));
// });


//escuchar peticiones
app.listen( process.env.PORT , ()=>{
   console.log(`servidor escuchando en puerto ${ process.env.PORT }`);
})