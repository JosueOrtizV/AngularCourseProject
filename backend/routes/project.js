import express from 'express';
import ProjectController from '../controllers/project.js';
const router = express.Router();

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);

export default router;
