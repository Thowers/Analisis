<?php
include 'conexión/db.php';

// Conexión a la base de datos
$host = "localhost";
$user = "root";
$password = "";
$database = "natulert";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}

// Inicializar variable para mensaje de error
$mensaje = "";

// Recibir y procesar los datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
    $apellido = isset($_POST['apellido']) ? $_POST['apellido'] : '';
    $correo = isset($_POST['correo']) ? $_POST['correo'] : '';
    $clave = isset($_POST['clave']) ? password_hash($_POST['clave'], PASSWORD_DEFAULT) : ''; // Encriptar la contraseña
    $fecha = date("Y-m-d");
    $tipo_usuario = "usuario"; // Asignar tipo de usuario

    // Verificar que las contraseñas coincidan
    if ($_POST['clave'] !== $_POST['confirm_password']) {
        $mensaje = "Las contraseñas no coinciden.";
    } else {
        // Insertar en la base de datos
        $sql = "INSERT INTO usuario (nombre, apellido, correo, clave, fecha, tipo_usuario) VALUES ('$nombre', '$apellido', '$correo', '$clave', '$fecha', '$tipo_usuario')";

        if ($conn->query($sql) === TRUE) {
            $mensaje = "Registro exitoso";
        } else {
            $mensaje = "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

$conn->close();
?>