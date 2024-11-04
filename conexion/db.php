<?php
$conexion = new mysqli("localhost", "root", "", "natulert");

if ($conexion) {
    echo "ahora siii";
}else {
    echo "no se pudo bb";
}
?>