function agregarTarea(tareas) {
    let descripcion = prompt("Ingrese la descripción de la tarea:\n");
    let duracion = Number(prompt("Ingrese la duración estimada de la tarea (en horas):\n"));
    while (isNaN(duracion) || duracion <= 0) {
        duracion = Number(prompt("Entrada inválida. Por favor, ingrese la duración estimada de la tarea en horas:\n"));
    }
    let prioridad = Number(prompt("Ingrese la prioridad: \n\n1. Alta\n2. Media\n3. Baja\n"));
    while (prioridad !== 1 && prioridad !== 2 && prioridad !== 3) {
        prioridad = Number(prompt("Entrada inválida. Por favor, seleccione una prioridad válida: \n1. Alta\n2. Media\n3. Baja\n"));
    }    
    let tarea = {descripcion, duracion, prioridad};
    tareas.push(tarea);
    return tareas;
}

function mostrarTareas(tareas) {
    let mensaje = "";
    let prioridad = "";
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].prioridad == 1) {
            prioridad = "Alta";
        } else if (tareas[i].prioridad == 2){
            prioridad = "Media";
        } else {
            prioridad = "Baja";
        }
        mensaje += (i+1) + ". Tarea: " + tareas[i].descripcion + " -> Duracion: " + tareas[i].duracion + " horas -> Prioridad: " + prioridad + "\n";
    }
    return mensaje; 
}

function calcularTiempoTotal(tareas) {
    let total = 0
    for (let i = 0; i < tareas.length; i++){
        total += tareas[i].duracion
    }
    return total;
}

function eliminarTarea(tareas) {
    let mensaje = mostrarTareas(tareas) + "\n0. Cancelar y volver al menú";
    let eliminar = Number(prompt("Ingrese el número de la tarea que desea eliminar o '0' para cancelar: \n\n" + mensaje));
    while (!Number.isInteger(eliminar) || eliminar < 0 || eliminar > tareas.length) {
        eliminar = Number(prompt("Entrada inválida. Por favor, seleccione una tarea válida o '0' para cancelar: \n\n" + mensaje));
    }
    if (eliminar === 0) {
        return tareas;  
    }
    if (confirm("¿Está seguro que desea eliminar esta tarea?")) {
        tareas.splice(eliminar - 1, 1);
    }
    alert("Tarea eliminada exitosamente");
    return tareas;
}


function verificarTareas(tareas, mensaje) {
    if (tareas.length === 0) {
        alert(mensaje);
        return false;
    }
    return true;
}

function administradorDeTareas() {
    let tareas = [];
    let opcion = 0;
    alert("*** Bienvenido al Adminstador de tareas ***")
    do {
        opcion = Number(prompt("\nAdministrador de tareas \n\nEliga una opción: \n\n1. Agregar tarea\n2. Mostrar tareas\n3. Tiempo total requerido\n4. Eliminar tarea\n5. Salir\n\n"));
        switch (opcion) {
            case 1:
                tareas = agregarTarea(tareas);
                alert("Tarea agregada exitosamente");
                break;
            case 2:
                if (verificarTareas(tareas, "No hay tareas para mostrar.")) {
                    alert(mostrarTareas(tareas));
                }
                break;
            case 3:
                if (verificarTareas(tareas, "No hay tareas para calcular.")) {
                    let tiempoTotal = calcularTiempoTotal(tareas);
                    alert("Tiempo total estimado para completar todas las tareas: " + tiempoTotal + " horas.");
                }
                break;
            case 4:
                if (!verificarTareas(tareas, "No hay tareas para eliminar." )){
                    break;
                }
                tareas = eliminarTarea(tareas);
                break;
            case 5:
                alert("Gracias por usar el administrador de tareas.");
                break;
            default:
                alert("Opción no válida. Intente de nuevo.");
                break;
        }
    } while (opcion !== 5);
}

administradorDeTareas();
