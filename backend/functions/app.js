import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import projectRoutes from '../routes/project.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join('/tmp/uploads'); // Usar el directorio temporal en Netlify
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.use(upload.single('image')); // middleware de multer

app.use('/api', projectRoutes);

export default app;
