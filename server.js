const express = require('express');
const cors = require('cors');  // Importa el paquete cors
const app = express();
const mysql = require('mysql');

// Habilita CORS para todas las rutas
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'natulert'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Ruta para crear una alerta
app.post('/crear-alerta', (req, res) => {
    const { fecha, hora, nivel, descripcion, ubicacion } = req.body;
    const sql = 'INSERT INTO alertas (fecha, hora, nivel, descripcion, ubicacion, estado) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [fecha, hora, nivel, descripcion, ubicacion, 'Pendiente'], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al crear la alerta');
        } else {
            res.json({ message: 'Alerta creada con éxito' });
        }
    });
});

// Escuchar en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});

app.get('/alertas', (req, res) => {
    const sql = 'SELECT * FROM alertas';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al obtener alertas');
        }
        res.json(results);
    });
});
