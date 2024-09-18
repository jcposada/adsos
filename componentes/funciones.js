function buscarUsuario (tecla,palabra) {

    var datos = "";

    switch (palabra) {

        case "usr":

            if (tecla.value.length >= 5 && tecla.value.length <= 64) {

                if(tecla.value.search("@") != -1) {

                    datos = { correo_cliente: tecla.value };

                }
            }

            break;

        case "pw":

            let correo = document.getElementById('correo_cliente').value;

            console.log(tecla.value.length);

            /* if (tecla.value.length >= 9 && tecla.value.length <= 10) { */

                datos = {
                    correo_cliente: correo,
                    movil_cliente: tecla.value,
                };

            /* } */

            break;

        default:
            break;
    }

    console.log(JSON.stringify(datos));

    if (datos != "") {

        fetch("servicios/sentinel.php", {
            method: "POST",
            body: JSON.stringify(datos),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(respuesta => respuesta.json())
            .then(datos => {

                console.log(datos);

                if (datos['titulo'] == "OK" && datos['cod_error'] == 200) {

                    document.getElementById('forma_acceso').style.marginLeft = "-100%";
                    document.getElementById('palabra_cliente').focus();

                } else if (datos['titulo'] == "OK" && datos['cod_error'] == 250) {

                    alert("INICIO DE SESIÓN con éxito.")

                }

            });

            datos = "";

    }


}


document.addEventListener("DOMContentLoaded", ()=>{

    let campo_correo = document.getElementById("correo_cliente");
    let campo_palabra = document.getElementById("palabra_cliente");

    let formulario = document.getElementById("forma_acceso");
    formulario.addEventListener("submit", (evento)=>{
        evento.preventDefault;
    });

    campo_correo.addEventListener("keyup", ()=>{

        buscarUsuario(campo_correo,"usr");

    });

    campo_palabra.addEventListener("keyup", ()=>{

        buscarUsuario(campo_palabra,"pw");

    });

});