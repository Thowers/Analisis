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

// Ruta para registrar un usuario
app.post('/indexregistro', (req, res) => {
    const { nombre, apellido, fecha, correo, clave } = req.body;
    const tipo_usuario = 'usuario'; // Establecer tipo_usuario como 'usuario'
    const sql = 'INSERT INTO usuario (nombre, apellido, fecha, correo, clave, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [nombre, apellido, fecha, correo, clave, tipo_usuario], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al registrar el usuario' });
        }
        res.json({ message: 'Usuario registrado con éxito' });
    });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});

// Función para registrar usuario
async function registerUser(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Recoger los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const fechaActual = document.getElementById('fecha_actual').value;
    const correo = document.getElementById('correo').value; // Cambiado a 'correo'
    const clave = document.getElementById('clave').value; // Cambiado a 'clave'
    const confirmPassword = document.getElementById('confirm_password').value;

    // Validar que las contraseñas coincidan
    if (clave !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Enviar datos al servidor
    try {
        const response = await fetch('http://localhost:3000/indexregistro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                apellido,
                fecha: fechaActual,
                correo,
                clave
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); // Mensaje de éxito
            // Redirigir a otra página si es necesario
            // window.location.href = 'pagina_deseada.html';
        } else {
            alert(data.error || 'Error al registrar el usuario'); // Manejar errores
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema con la solicitud.');
    }
}
