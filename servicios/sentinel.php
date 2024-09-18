<?php

    if ($_SERVER['REQUEST_METHOD'] != "POST") {

        $vector_respuesta = [
            'texto' => "Intento de operación incorrecta",
        ];

    } else {

        $usuario = file_get_contents('php://input');
        $usuario = json_decode($usuario);
        $correo_cliente = $usuario->correo_cliente;
        $movil_cliente = $usuario->movil_cliente;

        if ($movil_cliente == "") {

            $correo = filter_var($correo_cliente, FILTER_SANITIZE_EMAIL);

            $sentencia_buscar = "SELECT `nom_usuario` FROM `usuarios` WHERE `correo` = '$correo' AND `estado` = 'ACTIVO';";

        } else {

            $correo = filter_var($correo_cliente, FILTER_SANITIZE_EMAIL);

            $sentencia_buscar = "SELECT `nom_usuario` FROM `usuarios` WHERE `correo` = '$correo' AND `movil` = '$movil_cliente' AND `estado` = 'ACTIVO';";

        }

        $conexion = require 'conexion.php';

        if (!$conexion) {

            $vector_respuesta = [
                'titulo' => "ERROR",
                'texto' => "No pudimos conectarnos a la BDD.",
                'cod_error' => "100", //codigo 100 no mostrar msj
            ];

        } else {

            $buscado = $adso_conexion->query($sentencia_buscar);

            if ($buscado->num_rows <= 0) {

                $vector_respuesta = [
                    'titulo' => "INFO",
                    'texto' => $usuario,
                    'cod_error' => "100", //codigo 100 no mostrar msj
                ];

            } else {

                $usuario = $buscado->fetch_assoc();

                if ($movil_cliente == "") {

                    $vector_respuesta = [
                        'titulo' => "OK",
                        'texto' => "",
                        'cod_error' => "200", //codigo 200 todo funciona y hay datos
                        'usuario' => $usuario['nom_usuario'],
                    ];

                } else {

                    $vector_respuesta = [
                        'titulo' => "OK",
                        'texto' => "",
                        'cod_error' => "250", //codigo 200 todo funciona y hay datos
                        'usuario' => $usuario['nom_usuario'],
                    ];

                }


            }

        }

        $adso_conexion->close();

    }

    echo json_encode($vector_respuesta);

    //var_dump($vector_respuesta);