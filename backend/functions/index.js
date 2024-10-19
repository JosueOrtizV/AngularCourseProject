import mongoose from 'mongoose';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import app from './app.js';

dotenv.config();

const port = process.env.PORT || 3000;  // Asegúrate de que el puerto esté configurado correctamente

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Conexión a la base de datos establecida con éxito...");
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
})
.catch(err => console.error('No se pudo conectar a MongoDB Atlas:', err));

const handler = serverless(app);
export { handler };
