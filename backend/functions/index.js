const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('.app'); // Asegúrate de que la ruta es correcta
const port = process.env.PORT || 3700;

// Cargar variables de entorno desde el archivo .env
dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Conexión a la base de datos establecida con éxito...");
    
    // Crear el servidor
    app.listen(port, () => {
        console.log("Servidor corriendo correctamente en la url" + port);
    });
})
.catch(err => console.log(err));
