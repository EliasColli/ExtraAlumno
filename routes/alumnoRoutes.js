import express from 'express';
import { registerAlumno, loginAlumno } from '../controllers/alumnoController.js';

const router = express.Router();

// Ruta para registrar un alumno
router.post('/register', registerAlumno);

// Ruta para loguear a un alumno
router.post('/login', loginAlumno);

export default router;
