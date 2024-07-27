function obtenerEntradaNumerica(mensaje, condicionValida) {
    let entrada = Number(prompt(mensaje));
    while (!condicionValida(entrada)) {
        entrada = Number(prompt("Entrada inválida. " + mensaje));
    }
    return entrada;
}


function agregarTarea(tareas) {
    let descripcion = prompt("Ingrese la descripción de la tarea:\n");
    if (tareas.find(tarea => tarea.descripcion === descripcion)) {
        alert("Ya existe una tarea con esa descripción.");
        return tareas;
    }
    let duracion = obtenerEntradaNumerica("Ingrese la duración estimada de la tarea (en horas):\n", entrada => !isNaN(entrada) && entrada > 0);
    let prioridad = obtenerEntradaNumerica("Ingrese la prioridad: \n\n1. Alta\n2. Media\n3. Baja\n", entrada => entrada === 1 || entrada === 2 || entrada === 3);
    let tarea = {descripcion, duracion, prioridad};
    tareas.push(tarea);
    alert("Tarea agregada exitosamente");
    return tareas;
}

function mostrarTareas(tareas) {
    if (!Array.isArray(tareas)) { 
        tareas = [tareas];
    }
    return tareas.map((tarea, index) => {
        let prioridades = ["Alta", "Media", "Baja"];
        let prioridadTexto = prioridades[tarea.prioridad - 1];
        return `${index + 1}. Tarea: ${tarea.descripcion} -> Duración: ${tarea.duracion} horas -> Prioridad: ${prioridadTexto}`;
    }).join("\n");
}


function calcularTiempoTotal(tareas) {
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
}


function eliminarTarea(tareas) {
    let mensaje = mostrarTareas(tareas) + "\n0. Cancelar y volver al menú";
    let eliminar = obtenerEntradaNumerica("Ingrese el número de la tarea que desea eliminar o '0' para cancelar: \n\n" + mensaje, entrada => Number.isInteger(entrada) && entrada >= 0 && entrada <= tareas.length);
    if (eliminar === 0) {
        return;  
    }
    if (confirm("¿Está seguro que desea eliminar esta tarea?")) {
        tareas.splice(eliminar - 1, 1);
        alert("Tarea eliminada exitosamente");
    }
}

function buscarTareaPorCriterios(tareas) {
    let prioridadBusqueda = obtenerEntradaNumerica("Ingrese la prioridad a buscar: \n1. Alta\n2. Media\n3. Baja", valor => valor === 1 || valor === 2 || valor === 3);
    let duracionMinima = obtenerEntradaNumerica("Ingrese la duración mínima de la tarea en horas:\n", valor => !isNaN(valor) && valor > 0);
    return tareas.find(tarea => tarea.prioridad === prioridadBusqueda && tarea.duracion >= duracionMinima);
}


function filtrarTareasPorPrioridad(tareas) {
    let prioridadBusqueda = obtenerEntradaNumerica("Ingrese la prioridad a filtrar: \n1. Alta\n2. Media\n3. Baja", entrada => entrada === 1 || entrada === 2 || entrada === 3);
    return tareas.filter(tarea => tarea.prioridad === prioridadBusqueda);
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
    alert("*** Bienvenido al Administrador de tareas ***")
    do {
        opcion = Number(prompt("Administrador de tareas \n\nEliga una opción: \n\n1. Agregar tarea\n2. Mostrar tareas\n3. Tiempo total requerido\n4. Eliminar tarea\n5. Buscar tarea por criterios\n6. Filtrar tareas por prioridad\n7. Salir\n\n"));
        switch (opcion) {
            case 1:
                tareas = agregarTarea(tareas);
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
                if (verificarTareas(tareas, "No hay tareas para eliminar." )){
                    eliminarTarea(tareas);
                }
                break;
            case 5:
                if (verificarTareas(tareas, "No hay tareas para buscar." )){
                    let tareaEncontrada = buscarTareaPorCriterios(tareas);
                    alert(tareaEncontrada ? mostrarTareas(tareaEncontrada) : "No se encontró una tarea que cumpla con los criterios especificados.");
                }
                break;
            case 6:
                if (verificarTareas(tareas, "No hay tareas para filtrar." )){
                    let tareasFiltradas = filtrarTareasPorPrioridad(tareas);
                    alert(tareasFiltradas.length > 0 ? mostrarTareas(tareasFiltradas) : "No se encontraron tareas con esa prioridad.");
                }
                break;
            case 7:
                alert("Gracias por usar el administrador de tareas.");
                break;
            default:
                alert("Opción no válida. Intente de nuevo.");
                break;

        }
    } while (opcion !== 7);
}

administradorDeTareas();
