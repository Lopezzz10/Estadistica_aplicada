/* ── REGISTRO.JS: Ingreso manual de estudiantes ──
   Permite agregar nuevos registros al array `calificaciones`
   y actualiza todos los indicadores, tablas y gráficos en tiempo real. */

/* ── Abre / cierra el panel del formulario ── */
function toggleFormulario() {
    var panel = document.getElementById('panel-formulario');
    var btn   = document.getElementById('btn-toggle-form');
    
    // Si el formulario está oculto, lo muestra, cambia el texto del botón a '✕' y pone el foco en el primer campo
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'block';
        btn.textContent = '✕ Cerrar formulario';
        document.getElementById('form-nombre').focus();
    } else {
        // Si estaba abierto, lo oculta, restablece el botón y borra los datos escritos
        panel.style.display = 'none';
        btn.textContent = '+ Agregar estudiante';
        limpiarFormulario();
    }
}

/* ── Limpia todos los campos del formulario ── */
function limpiarFormulario() {
    // Restablece los campos de texto y selectores a sus valores iniciales/vacíos
    document.getElementById('form-nombre').value      = '';
    document.getElementById('form-genero').value      = 'M';
    document.getElementById('form-edad').value        = '';
    document.getElementById('form-asistencia').value  = '';
    
    // Un bucle 'for' para vaciar las 10 casillas de notas sin tener que escribir 10 líneas de código
    for (var i = 1; i <= 10; i++) {
        document.getElementById('form-nota' + i).value = '';
    }
    ocultarMensaje();
}

/* ── Muestra / oculta el mensaje de feedback ── */
function mostrarMensaje(texto, tipo) {
    var el = document.getElementById('form-mensaje');
    el.textContent = texto;
    // Asigna clases CSS dinámicamente (por ejemplo, para poner el texto en rojo si es error o verde si es éxito)
    el.className   = 'form-mensaje ' + tipo;  /* 'exito' o 'error' */
    el.style.display = 'block';
}
function ocultarMensaje() {
    var el = document.getElementById('form-mensaje');
    el.style.display = 'none';
}

/* ── Valida y registra el nuevo estudiante ── */
function registrarEstudiante() {
    ocultarMensaje();

    /* --- Leer nombre --- */
    // .trim() elimina los espacios en blanco innecesarios al inicio y al final
    var nombre = document.getElementById('form-nombre').value.trim();
    if (!nombre) { mostrarMensaje('⚠ Ingresa el nombre del estudiante.', 'error'); return; }

    /* --- Leer género --- */
    var genero = document.getElementById('form-genero').value;

    /* --- Leer edad --- */
    var edadRaw = document.getElementById('form-edad').value.trim();
    var edad    = parseInt(edadRaw, 10); // Convierte el texto de la edad en un número entero
    // Valida que el campo no esté vacío, que sea un número real (isNaN) y que esté en el rango permitido
    if (!edadRaw || isNaN(edad) || edad < 15 || edad > 99) {
        mostrarMensaje('⚠ La edad debe ser un número entre 15 y 99.', 'error');
        return;
    }

    /* --- Leer asistencia --- */
    var asistRaw  = document.getElementById('form-asistencia').value.trim();
    var asistencia = parseFloat(asistRaw); // Convierte a número decimal
    if (!asistRaw || isNaN(asistencia) || asistencia < 0 || asistencia > 100) {
        mostrarMensaje('⚠ La asistencia debe ser un porcentaje entre 0 y 100.', 'error');
        return;
    }

    /* --- Leer las 10 notas --- */
    var notas = [];
    for (var i = 1; i <= 10; i++) {
        var notaRaw = document.getElementById('form-nota' + i).value.trim();
        var nota    = parseFloat(notaRaw);
        // Verifica casilla por casilla que la nota sea válida y esté entre 0 y 10
        if (notaRaw === '' || isNaN(nota) || nota < 0 || nota > 10) {
            mostrarMensaje('⚠ La nota ' + i + ' debe ser un número entre 0 y 10.', 'error');
            return;
        }
        // Guarda la nota redondeada a un solo decimal en el array 'notas'
        notas.push(Math.round(nota * 10) / 10);
    }

    /* --- Calcular nota promedio individual --- */
    var sumaNotas = 0;
    for (var j = 0; j < notas.length; j++) { sumaNotas += notas[j]; }
    // Calcula el promedio y lo redondea a un máximo de dos decimales
    var notaPromedio = Math.round((sumaNotas / notas.length) * 100) / 100;

    /* --- Crear nuevo objeto estudiante --- */
    // Genera un ID automático: si ya hay estudiantes, toma el ID del último y le suma 1; si no, empieza en 1
    var nuevoId = calificaciones.length > 0
        ? calificaciones[calificaciones.length - 1].id + 1
        : 1;

    // Estructura toda la información recolectada en un solo objeto organizado
    var nuevoEstudiante = {
        id:         nuevoId,
        nombre:     nombre,
        genero:     genero,
        edad:       edad,
        notas:      notas,
        nota:       notaPromedio,   /* nota promedio para los cálculos */
        asistencia: Math.round(asistencia * 10) / 10
    };

    /* --- Agregar al array global --- */
    calificaciones.push(nuevoEstudiante); // Inserta el nuevo objeto en la lista general de estudiantes

    /* --- Actualizar contador de la barra de ingreso --- */
    actualizarContadorRegistros();

    /* --- Regenerar todos los análisis y gráficos --- */
    refrescarTodo(); // Dispara la actualización en cadena de la interfaz para mostrar los nuevos datos

    /* --- Feedback y limpieza --- */
    mostrarMensaje('✔ Estudiante "' + nombre + '" registrado correctamente (ID #' + nuevoId + ').', 'exito');
    limpiarFormulario();

    /* --- Desplazar a la sección de análisis --- */
    // Hace un scroll automático y suave hacia abajo para ver los resultados de inmediato
    setTimeout(function () {
        document.getElementById('unidad4').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
}

/* ── Actualiza el badge con total de registros ── */
function actualizarContadorRegistros() {
    var badge = document.getElementById('contador-registros');
    // Muestra visualmente cuántos estudiantes hay registrados actualmente en el array
    if (badge) { badge.textContent = calificaciones.length + ' registros'; }
}

/* ── Regenera indicadores, tablas, alertas y gráficos ── */
function refrescarTodo() {
    // Ejecuta una por una todas las funciones encargadas de redibujar las tablas y las estadísticas
    renderizarIndicadores();
    renderizarTablaFrecuencias();
    renderizarAlertas();
    renderizarTablaEstudiantes();
    renderizarAnalisisGenero();
    renderizarAnalisisEdad();
    renderizarAnalisisAsistencia();
    rehacerGraficos();
}

/* ── Destruye y recrea los gráficos estadísticos ── */
function rehacerGraficos() {
    /* Los gráficos de Chart.js deben destruirse antes de recrearse */
    var ids = [
        'graficoLineas100', 'graficoHistograma', 'graficoCircular',
        'graficoBarrasNota', 'graficoGenero', 'graficoEdad',
        'graficoAsistencia', 'graficoScatter'
    ];
    // Recorre los IDs de los lienzos (canvas) para limpiar la memoria antes de dibujar los nuevos datos
    ids.forEach(function (id) {
        var canvas = document.getElementById(id);
        if (canvas && canvas._chartInstance) {
            canvas._chartInstance.destroy();
            canvas._chartInstance = null;
        }
        /* Chart.js 4 guarda la instancia en Chart.getChart() */
        var instancia = Chart.getChart(id);
        if (instancia) { instancia.destroy(); }
    });

    // Vuelve a llamar a las funciones que crean los gráficos desde cero con el nuevo estudiante incluido
    crearGraficoLineas100();
    crearHistograma();
    crearGraficoCircular();
    crearGraficoBarrasNota();
    crearGraficoGenero();
    crearGraficoEdad();
    crearGraficoAsistencia();
    crearScatter();
}

/* ── Elimina un estudiante por ID ── */
function eliminarEstudiante(id) {
    // Muestra una ventana de confirmación nativa del navegador
    if (!confirm('¿Eliminar al estudiante con ID #' + id + '?')) return;
    
    // .filter() crea una nueva lista excluyendo al estudiante que coincide con el ID seleccionado
    calificaciones = calificaciones.filter(function (e) { return e.id !== id; });
    
    actualizarContadorRegistros();
    refrescarTodo(); // Vuelve a calcular todo sin el estudiante eliminado
}

/* ── Inicializa el contador al cargar la página ── */
document.addEventListener('DOMContentLoaded', function () {
    // Este evento asegura que el script cuente los registros iniciales apenas la página termine de cargar HTML
    actualizarContadorRegistros();
});