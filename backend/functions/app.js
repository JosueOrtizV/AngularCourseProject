import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import projectRoutes from '../routes/project.js';

// Inicializa Express
const app = express();

// Middleware para el parsing de datos
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Configuración de multer para la subida de imágenes en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Usa el middleware de multer para gestionar las cargas de archivos (imágenes)
app.use(upload.single('image'));

// Rutas
app.use('/api', projectRoutes);

// Exporta la aplicación express (será utilizado en serverless-http en index.js)
export default app;
