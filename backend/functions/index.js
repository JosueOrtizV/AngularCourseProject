const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
.then(() => {
    console.log("Conexión a la base de datos establecida con éxito...");
    
    // Crear el servidor
    app.listen(port, () => {
        console.log("Servidor corriendo correctamente en la url: localhost:" + port);
    });
})
.catch(err => console.log(err));
