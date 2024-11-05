<?php
 include 'db.php';

    $nombre = $_POST['nombre'];
    $apellido =$_POST['apellido'];
    $correo = $_POST['correo'];
    $usuario = $_POST['usuario'];
        $clave = $_POST['clave'];
    $fecha = date("Y-m-d");
    $tipo_usuario = "usuario"; // Asignar tipo de usuario

    // Verificar que las contraseñas coincidan
    if ($_POST['clave'] !== $_POST['confirm_password']) {
        $mensaje = "Las contraseñas no coinciden.";
    } else {
        // Insertar en la base de datos
        $sql = "INSERT INTO usuario (nombre, apellido, correo, clave, fecha, tipo_usuario, usuario) VALUES ('$nombre', '$apellido', '$correo', '$clave', '$fecha', '$tipo_usuario', '$usuario')";

    }
    $ejecutar = mysqli_query($conexion,$sql);
   
    if ($ejecutar) {
        echo '
        <script>
        alert("El usuario se registro correctamente");
        window.location = "http://127.0.0.1:5500/index.html"
        </script>
        ';
    }else {
        echo '
        <script>
        alert("Intentelo nuevamente");
        window.location = "http://127.0.0.1:5500/index.html"
        </script>
        ';
    }
?>