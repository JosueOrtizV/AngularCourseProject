'use strict'

const project = require('../models/project');
var Project = require('../models/project')
const path = require('path');
const fs = require('fs');

var controller = {
    home: function(req,res){
        return res.status(200).send({
            message: 'Soy la home'
        });
    },

    test: function(req,res){
        return res.status(200).send({
            message: 'Soy test'
        });
    },

    saveProject: async function(req, res) {
        try {
            var project = new Project();
    
            var params = req.body;
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
            console.error(err); // Opcional: registrar el error para depuración
            return res.status(500).send({ message: "Error al guardar" });
        };
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
    
    uploadImage: async function(req, res) {
        try {
            var projectId = req.params.id;
            var filename = "Imagen no subida...";
    
            if (req.files) {
                var filePath = req.files.image.path;
                var fileSplit = filePath.split(path.sep);
                var filename = fileSplit[fileSplit.length - 1];
                var extSplit = filename.split('.');
                var fileExt = extSplit[extSplit.length - 1].toLowerCase();
    
                if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'gif') {
                    const projectUpdated = await Project.findByIdAndUpdate(projectId, { image: filename }, { new: true });
    
                    if (!projectUpdated) {
                        return res.status(404).send({ message: "El proyecto no existe y no se ha asignado la imagen" });
                    }
    
                    return res.status(200).send({ project: projectUpdated });
                } else {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).send({ message: "Error al eliminar el archivo no válido" });
                        }
                        return res.status(400).send({ message: "La extensión no es válida" });
                    });
                }
            } else {
                return res.status(400).send({ message: filename });
            }  
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "La imagen no se ha subido" });
        }
    },

    getImageFile: async function(req,res) {
        var file = req.params.image;
        var path_file = './uploads/'+file;

        fs.exists(path_file, (exists) => {
            if (exists == true) {
                return res.sendFile(path.resolve(path_file))
            }else{
                return res.status(200).send({message: "No existe la imagen"})
            }
        })
    }

}

module.exports = controller;