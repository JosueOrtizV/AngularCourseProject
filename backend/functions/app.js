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

// Configurar carpeta estática
app.use('/uploads', express.static(uploadDir));

// Rutas
app.use('/api', project_routes);

// Exportar la aplicación
module.exports = app;
