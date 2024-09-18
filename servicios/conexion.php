<?php

    $adso_conexion = new mysqli("localhost","root","password","bdd_adso_pruebas");

    if ($adso_conexion->errno) {
        echo "No se pudo hacer la conexión porque usted programador SUBNORMAL provocó el error: " . $adso_conexion->error;
    } /* else {
        echo "Sisas";
    } */