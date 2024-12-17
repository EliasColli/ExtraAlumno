import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import alumnoRoutes from './routes/alumnoRoutes.js';

dotenv.config();

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ', err.stack);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// Rutas de alumno
app.use('/api/alumno', alumnoRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
