const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const project_routes = require('../routes/project');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use(cors());

// Crear el directorio `uploads` si no existe
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configurar carpeta estática
app.use('/uploads', express.static(uploadDir));

// Rutas
app.use('/api', project_routes);

// Exportar la aplicación
module.exports = app;
