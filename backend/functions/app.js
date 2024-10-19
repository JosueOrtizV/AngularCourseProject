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

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(upload.single('image')); // Middleware de multer

app.use('/api', projectRoutes);

export default app;
