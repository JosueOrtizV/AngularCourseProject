const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app'); // Asegúrate de que la ruta es correcta

// Cargar variables de entorno desde el archivo .env
dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Conexión a la base de datos establecida con éxito...");
    
    if (process.env.NODE_ENV !== 'test') {
        // Solo iniciar el servidor si no estamos en modo de prueba
        app.listen(process.env.PORT || 3700, () => {
            console.log(`Servidor corriendo correctamente en la url: localhost:${process.env.PORT || 3700}`);
        });
    }
})
.catch(err => console.error('No se pudo conectar a MongoDB Atlas:', err));
