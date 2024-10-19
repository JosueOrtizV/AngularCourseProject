import mongoose from 'mongoose';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import app from './app.js';

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Conexión a la base de datos establecida con éxito...");
})
.catch(err => console.error('No se pudo conectar a MongoDB Atlas:', err));

const handler = serverless(app);
export { handler };
