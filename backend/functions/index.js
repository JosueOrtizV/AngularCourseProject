const mongoose = require('mongoose');
const dotenv = require('dotenv');
const serverless = require('serverless-http');
const app = require('./app');

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Conexión a la base de datos establecida con éxito...");
})
.catch(err => console.error('No se pudo conectar a MongoDB Atlas:', err));

module.exports.handler = serverless(app);
