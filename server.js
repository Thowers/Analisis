const express = require('express');
const mysql = require('mysql'); // Asegúrate de tener el paquete mysql instalado
const cors = require('cors'); // Si necesitas CORS
const app = express();
const PORT = 3000;

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'natulert'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

// Habilita CORS para todas las rutas
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());


// Ruta para obtener usuarios
app.get('/usuarios', (req, res) => {
    const query = 'SELECT id_usuario, nombre, apellido FROM usuario';
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        } else {
            res.json({ usuarios: results });
        }
    });
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

// Ruta para manejar comentarios
app.post('/enviar-comentario', (req, res) => {
    const { id_usuario, id_guia, comentario } = req.body;

    // Verifica que los datos recibidos son correctos
    console.log('Datos recibidos:', { id_usuario, id_guia, comentario });

    // Consulta para insertar el comentario en la tabla
    const sql = 'INSERT INTO comentario_guia (id_usuario, id_guia, comentario) VALUES (?, ?, ?)';
    db.query(sql, [id_usuario, id_guia, comentario], (error, results) => {
        if (error) {
            console.error('Error al guardar el comentario:', error.message); // Mensaje de error más descriptivo
            return res.status(500).json({ message: 'Error al guardar el comentario', error: error.message });
        }
        console.log('Comentario guardado con éxito:', results); // Mensaje de éxito
        res.status(200).json({ message: 'Comentario guardado correctamente', id_comentario_guia: results.insertId });
    });
});

// Ruta principal para mostrar la lista desplegable
app.get('/', (req, res) => {
    const query = 'SELECT id_usuario, nombre, apellido FROM usuario';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los datos:', err);
            res.send('Error al obtener los datos');
            return;
        }
        res.render('index', { usuarios: results });
    });
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
