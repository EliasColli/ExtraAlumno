import mysql from 'mysql2';

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Obtener un alumno por email
export const getAlumnoByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Alumno WHERE email = ?', [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};

// Crear un nuevo alumno
export const createAlumno = (nombre, apellido, email, contraseña, sexo, edad, peso, altura, comida_favorita, descuento_navideno) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO Alumno (nombre, apellido, email, contraseña, sexo, edad, peso, altura, comida_favorita, descuento_navideno) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, apellido, email, contraseña, sexo, edad, peso, altura, comida_favorita, descuento_navideno],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};
