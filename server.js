const express = require('express');
const cors = require('cors');
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

// Ruta para obtener alertas
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

// Ruta para obtener una guía por ID
app.get("/api/guias/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM guias WHERE id = ?", [id], (error, results) => {
        if (error) return res.status(500).send("Error de base de datos");
        res.json(results[0]); // Envía el primer resultado
    });
});

// Ruta para obtener la guía por ID
app.get('/guia/:id', (req, res) => {
    const guiaId = req.params.id;
    const query = 'SELECT titulo_guia, contenido FROM guias WHERE id_guia = ?';

    db.query(query, [guiaId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'Guía no encontrada' });
        }
    });
});


