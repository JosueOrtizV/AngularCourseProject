import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import projectRoutes from '../routes/project.mjs';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use(cors());


// Rutas
app.use('/api', project_routes);

// Exportar la aplicación
module.exports = app;
