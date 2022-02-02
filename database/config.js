const mongoose = require('mongoose');

const dbConnection = async ()=>{
   try {

      await mongoose.connect( process.env.DB_CONNECTION );

      console.log('DB conected');

   }catch(err){
      console.log(err);
      throw new Error('Error a la hora de inicializazr la base de datos')
   }

}

module.exports = {
   dbConnection
}