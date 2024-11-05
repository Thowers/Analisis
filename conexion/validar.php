<?php
include('db.php');
$usuario =$_POST['usuario'];
$clave=$_POST['clave'];
session_start();
$_SESSION['usuario']=$usuario;

$consulta="SELECT*FROM usuario where usuario='$usuario' and clave='$clave'";
$resultado=mysqli_query($conexion,$consulta);
$filas=mysqli_num_rows($resultado);

if ($filas) {
    header("location:http://127.0.0.1:5500/indexMapa.html");
}else{
    ?>
    <?php
    header("location:http://127.0.0.1:5500/index.html");
    echo "Error de credenciales, intenta de nuevo";
    ?>
    <?php
}
mysqli_free_result($resultado);
mysqli_close($conexion);
