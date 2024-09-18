/* Código HTML - Atributo en input tipo FILE*/
/* onchange="auditor(this)" */
/* Función telon y función auditor */

function telon (codigo,datos) {
    let capa_telon = document.querySelector('#telon');
    let tlo_telon = document.querySelector('#tlo');
    let pfo_telon = document.querySelector('#pfo');
    capa_telon.style.display = "flex";
    capa_telon.addEventListener("click", (e)=>{
        capa_telon.style.display = "none";
        tlo_telon.innerHTML = "";
        pfo_telon.innerHTML = "";
    });
    switch(codigo) {
        case 100:
            tlo_telon.innerHTML = "";
            pfo_telon.innerHTML = "";
            break
        case 300:
            tlo_telon.innerHTML = "ERROR";
            pfo_telon.innerHTML = "la imagen es muy grande " + datos + ", reenviate la imagen por WhatsApp para que se haga pequeña.";
            break
        case 350:
            tlo_telon.innerHTML = "ERROR";
            pfo_telon.innerHTML = "la imagen es muy pesada " + datos + " y el peso máximo es de 4096 KB (4 MB), reenviate la imagen por WhatsApp para que pierda peso.";
            break
        default:
            tlo_telon.innerHTML = "";
            pfo_telon.innerHTML = "";
            break
    }
}


function auditor(campo) {

    const MAXIMO_BYTES = 4194304; // 1MB = 1 millón de bytes
    // Obtener referencia al elemento
    const img_archivo = campo;

    // si no hay archivos, regresamos
    if (img_archivo.files.length <= 0) return;
    // Validamos el primer archivo únicamente
    const archivo = img_archivo.files[0];

    if (archivo.size > MAXIMO_BYTES) {

        const tamArchivo = parseInt((archivo.size/1000000)*1024)+" KB";

        telon(350,tamArchivo);

        // Limpiar input file del formulario
        img_archivo.value = "";

    } else {

        //variables del navegador para alojar el archivo temporal
        var _URL = window.URL || window.webkitURL;
        //variable para crear el nuevo objeto temporal
        let foto = new Image();
        //se crea el archivo temporal
        foto.src = window.URL.createObjectURL(event.target.files[0]);

        const recurso = URL.createObjectURL(event.target.files[0]);

        // Precarga para acceder a propiedades del objeto
        foto.onload = function () {
            /* console.log(foto.width + " " + foto.height) */

            if (foto.width >= 2500 || foto.height >= 2500) {

                let texto = " ("+Number.parseFloat(foto.width/1024).toFixed(3)+"px x "+Number.parseFloat(foto.height/1024).toFixed(3)+"px) y lo maxímo es de 2.500px x 2.500px";

                telon(300,texto);

                // Limpiar input file del formulario
                img_archivo.value = "";

            }

        }

    }

} // Fin auditor de imagenes