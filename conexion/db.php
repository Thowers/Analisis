<?php
$conexion="localhost";
$user="root";
$password = "";
$db="natulert";

$server = new mysqli($conexion,$user,$password,$db);

if ($server->connect_errno){
    die("Conexión fallida".$server->connect_errno);
    }
    else{
        echo "Conectado";
    }
?>