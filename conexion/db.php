<?php
<?php
$conexion = new mysqli("localhost","root","","natulert");
$conexion->set_charset("utf8");

if ($server->connect_errno){
    die("Conexión fallida".$conexion->connect_errno);
    }
    else{
        echo "Conectado";
    }
    ?>