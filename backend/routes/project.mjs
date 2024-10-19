import express from 'express';
import controller from '../controllers/project.mjs'; 
const router = express.Router();

router.get('/home', controller.home);
router.post('/test', controller.test);
router.post('/save-project', controller.saveProject);
router.get('/project/:id?', controller.getProject);
router.get('/projects', controller.getProjects);
router.put('/project/:id', controller.updateProject);
router.delete('/project/:id', controller.deleteProject);
router.post('/upload-image/:id', controller.uploadImage);
router.get('/get-image/:image', controller.getImageFile);

export default router;
