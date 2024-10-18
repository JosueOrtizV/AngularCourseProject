const mongoose = require('mongoose');
const dotenv = require('dotenv');
const serverless = require('serverless-http');
const app = require('./app'); // Asegúrate de que la ruta es correcta

// Cargar variables de entorno desde el archivo .env
dotenv.config();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Conexión a la base de datos establecida con éxito...");
})
.catch(err => console.error('No se pudo conectar a MongoDB Atlas:', err));

// Exportar la aplicación con serverless
module.exports.handler = serverless(app);
