import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getAlumnoByEmail, createAlumno } from '../models/alumnoModel.js';

// Registrar un nuevo alumno
export const registerAlumno = async (req, res) => {
  const { nombre, apellido, email, contraseña, sexo, edad, peso, altura, comida_favorita, descuento_navideno } = req.body;

  try {
    const existingAlumno = await getAlumnoByEmail(email);

    if (existingAlumno) {
      return res.status(400).json({ message: 'Alumno ya registrado' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    await createAlumno(nombre, apellido, email, hashedPassword, sexo, edad, peso, altura, comida_favorita, descuento_navideno);

    res.status(201).json({ message: 'Alumno creado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar alumno', error: err.message });
  }
};

// Login de un alumno
export const loginAlumno = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const alumno = await getAlumnoByEmail(email);

    if (!alumno) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(contraseña, alumno.contraseña);

    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ alumnoId: alumno.id_alumno }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
  }
};
