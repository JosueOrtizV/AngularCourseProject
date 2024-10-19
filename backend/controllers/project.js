import path from 'path';
import fs from 'fs';
import Project from '../models/project.js';

const controller = {
    home: (req, res) => {
        return res.status(200).send({ message: 'Soy la home' });
    },
    test: (req, res) => {
        return res.status(200).send({ message: 'Soy test' });
    },
    saveProject: async (req, res) => {
        try {
            const project = new Project();
            const params = req.body;
            project.name = params.name;
            project.description = params.description;
            project.category = params.category;
            project.year = params.year;
            project.langs = params.langs;
            project.image = null;

            const projectStored = await project.save();

            if (!projectStored) {
                return res.status(404).send({ message: 'No se ha podido guardar el proyecto' });
            }

            return res.status(200).send({ project: projectStored });
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: "Error al guardar" });
        }
    },

    getProject: async function(req, res) {
        try {
            var projectId = req.params.id;
    
            if (!projectId) {
                return res.status(404).send({ message: "El proyecto no existe" });
            }
    
            const project = await Project.findById(projectId);
    
            if (!project) {
                return res.status(404).send({ message: "El proyecto no existe" });
            }
    
            return res.status(200).send({ project });
        } catch (err) {
            console.error(err); // Opcional: registrar el error para depuración
            return res.status(500).send({ message: "Error al devolver los datos" });
        }
    },

    getProjects: async function (req, res) {
        try {
            const projects = await Project.find({}).sort('year');
    
            if (projects.length === 0) {
                return res.status(404).send({ message: "No hay proyectos que mostrar" });
            }
    
            return res.status(200).send({ projects });
        } catch (error) {
            console.error(error); // Opcional: registrar el error para depuración
            return res.status(500).send({ message: "Error al devolver los datos." });
        }
    },

    updateProject: async function(req, res) {
        try {
            var projectId = req.params.id;
            var update = req.body;
    
            if (!projectId) {
                return res.status(400).send({ message: "ID del proyecto no proporcionado" });
            }
    
            const projectUpdated = await Project.findByIdAndUpdate(projectId, update, { new: true });
    
            if (!projectUpdated) {
                return res.status(404).send({ message: "No existe el proyecto para actualizar" });
            }
    
            return res.status(200).send({ project: projectUpdated });
        } catch (err) {
            console.error(err); // Opcional: registrar el error para depuración
            return res.status(500).send({ message: "Error al actualizar" });
        }
    },

    deleteProject: async function(req, res) {
        try {
            var projectId = req.params.id;
            const projectRemoved = await Project.findByIdAndDelete(projectId);
    
            if (!projectRemoved) {
                return res.status(404).send({ message: "No se puede eliminar ese proyecto" });
            }
    
            return res.status(200).send({ project: projectRemoved });
        } catch (error) {
            console.log(error); // Añade esto para ver el error en la consola
            return res.status(500).send({ message: "No se ha podido borrar el proyecto" });
        }
    },
    
    uploadImage: async (req, res) => {
        const projectId = req.params.id;
        const imageFile = req.files.image;

        if (imageFile) {
            const filePath = imageFile.path;
            const formData = new FormData();
            formData.append('image', fs.readFileSync(filePath), {
                filename: path.basename(filePath)
            });

            try {
                const fetch = (await import('node-fetch')).default; // Importación dinámica
                const apiKey = 'fc1b43db6180f3ee63777a0ff659697b';
                const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

                const response = await fetch(url, {
                    method: 'POST',
                    body: formData
                });

                const responseData = await response.json();

                if (responseData.success) {
                    const imageUrl = responseData.data.url;

                    const projectUpdated = await Project.findByIdAndUpdate(
                        projectId,
                        { image: imageUrl },
                        { new: true }
                    );

                    if (!projectUpdated) {
                        return res.status(404).send({ message: "El proyecto no existe y no se ha asignado la imagen" });
                    }

                    return res.status(200).send({ project: projectUpdated });
                } else {
                    return res.status(500).send({ message: "Error al subir la imagen a Imgbb" });
                }
            } catch (error) {
                return res.status(500).send({ message: "Error en la solicitud a Imgbb", error });
            }
        } else {
            return res.status(400).send({ message: "Imagen no subida" });
        }
    },
    getImageFile: async (req, res) => {
        const file = req.params.image;
        res.redirect(file);
    },
};

export default controller;