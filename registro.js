/* ── REGISTRO.JS: Ingreso manual de estudiantes ──
   Permite agregar nuevos registros al array `calificaciones`
   y actualiza todos los indicadores, tablas y gráficos en tiempo real. */

/* ── Abre / cierra el panel del formulario ── */
function toggleFormulario() {
    var panel = document.getElementById('panel-formulario');
    var btn   = document.getElementById('btn-toggle-form');
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'block';
        btn.textContent = '✕ Cerrar formulario';
        document.getElementById('form-nombre').focus();
    } else {
        panel.style.display = 'none';
        btn.textContent = '+ Agregar estudiante';
        limpiarFormulario();
    }
}

/* ── Limpia todos los campos del formulario ── */
function limpiarFormulario() {
    document.getElementById('form-nombre').value      = '';
    document.getElementById('form-genero').value      = 'M';
    document.getElementById('form-edad').value        = '';
    document.getElementById('form-asistencia').value  = '';
    for (var i = 1; i <= 10; i++) {
        document.getElementById('form-nota' + i).value = '';
    }
    ocultarMensaje();
}

/* ── Muestra / oculta el mensaje de feedback ── */
function mostrarMensaje(texto, tipo) {
    var el = document.getElementById('form-mensaje');
    el.textContent = texto;
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
    var nombre = document.getElementById('form-nombre').value.trim();
    if (!nombre) { mostrarMensaje('⚠ Ingresa el nombre del estudiante.', 'error'); return; }

    /* --- Leer género --- */
    var genero = document.getElementById('form-genero').value;

    /* --- Leer edad --- */
    var edadRaw = document.getElementById('form-edad').value.trim();
    var edad    = parseInt(edadRaw, 10);
    if (!edadRaw || isNaN(edad) || edad < 15 || edad > 99) {
        mostrarMensaje('⚠ La edad debe ser un número entre 15 y 99.', 'error');
        return;
    }

    /* --- Leer asistencia --- */
    var asistRaw  = document.getElementById('form-asistencia').value.trim();
    var asistencia = parseFloat(asistRaw);
    if (!asistRaw || isNaN(asistencia) || asistencia < 0 || asistencia > 100) {
        mostrarMensaje('⚠ La asistencia debe ser un porcentaje entre 0 y 100.', 'error');
        return;
    }

    /* --- Leer las 10 notas --- */
    var notas = [];
    for (var i = 1; i <= 10; i++) {
        var notaRaw = document.getElementById('form-nota' + i).value.trim();
        var nota    = parseFloat(notaRaw);
        if (notaRaw === '' || isNaN(nota) || nota < 0 || nota > 10) {
            mostrarMensaje('⚠ La nota ' + i + ' debe ser un número entre 0 y 10.', 'error');
            return;
        }
        notas.push(Math.round(nota * 10) / 10);
    }

    /* --- Calcular nota promedio individual --- */
    var sumaNotas = 0;
    for (var j = 0; j < notas.length; j++) { sumaNotas += notas[j]; }
    var notaPromedio = Math.round((sumaNotas / notas.length) * 100) / 100;

    /* --- Crear nuevo objeto estudiante --- */
    var nuevoId = calificaciones.length > 0
        ? calificaciones[calificaciones.length - 1].id + 1
        : 1;

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
    calificaciones.push(nuevoEstudiante);

    /* --- Actualizar contador de la barra de ingreso --- */
    actualizarContadorRegistros();

    /* --- Regenerar todos los análisis y gráficos --- */
    refrescarTodo();

    /* --- Feedback y limpieza --- */
    mostrarMensaje('✔ Estudiante "' + nombre + '" registrado correctamente (ID #' + nuevoId + ').', 'exito');
    limpiarFormulario();

    /* --- Desplazar a la sección de análisis --- */
    setTimeout(function () {
        document.getElementById('unidad4').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
}

/* ── Actualiza el badge con total de registros ── */
function actualizarContadorRegistros() {
    var badge = document.getElementById('contador-registros');
    if (badge) { badge.textContent = calificaciones.length + ' registros'; }
}

/* ── Regenera indicadores, tablas, alertas y gráficos ── */
function refrescarTodo() {
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
    if (!confirm('¿Eliminar al estudiante con ID #' + id + '?')) return;
    calificaciones = calificaciones.filter(function (e) { return e.id !== id; });
    actualizarContadorRegistros();
    refrescarTodo();
}

/* ── Inicializa el contador al cargar la página ── */
document.addEventListener('DOMContentLoaded', function () {
    actualizarContadorRegistros();
});
