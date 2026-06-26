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
/* ════════════════════════════════════════════════
   NOTAS DETALLADAS + EDICIÓN DE NOTAS
   ════════════════════════════════════════════════ */

var _idEstudianteEditando = null;

/* ── Renderiza la grilla de notas individuales debajo de la tabla principal ── */
function renderizarNotasDetalladas() {
    var contenedor = document.getElementById('contenedor-notas-detalladas');
    if (!contenedor) return;

    var html = '<table style="width:100%;border-collapse:collapse;font-size:0.85rem;">';
    /* Encabezado */
    html += '<thead><tr style="border-bottom:2px solid var(--borde);">';
    html += '<th style="text-align:left;padding:0.5rem 0.6rem;color:var(--apagado);font-weight:600;">Estudiante</th>';
    for (var h = 1; h <= 10; h++) {
        html += '<th style="text-align:center;padding:0.5rem 0.3rem;color:var(--apagado);font-weight:600;">N' + h + '</th>';
    }
    html += '<th style="text-align:center;padding:0.5rem 0.6rem;color:var(--apagado);font-weight:600;">Prom.</th>';
    html += '<th style="text-align:center;padding:0.5rem 0.6rem;color:var(--apagado);font-weight:600;">Estado</th>';
    html += '<th style="text-align:center;padding:0.5rem 0.6rem;color:var(--apagado);font-weight:600;"></th>';
    html += '</tr></thead><tbody>';

    calificaciones.forEach(function (e, idx) {
        var promedio = calcularPromedio(e.notas);
        var aprobado = promedio >= 7;
        var bg = idx % 2 === 0 ? 'var(--superficie2)' : 'transparent';

        html += '<tr style="background:' + bg + ';border-bottom:1px solid var(--borde);">';
        html += '<td style="padding:0.5rem 0.6rem;font-weight:600;color:var(--texto);white-space:nowrap;">' + e.nombre + '</td>';
        e.notas.forEach(function (n) {
            var nc = n >= 7 ? 'var(--exito)' : 'var(--peligro)';
            html += '<td style="text-align:center;padding:0.4rem 0.3rem;color:' + nc + ';font-weight:700;">' + n.toFixed(1) + '</td>';
        });
        var pc = aprobado ? 'var(--exito)' : 'var(--peligro)';
        html += '<td style="text-align:center;padding:0.4rem 0.6rem;font-weight:700;color:' + pc + ';">' + promedio.toFixed(2) + '</td>';
        html += '<td style="text-align:center;padding:0.4rem 0.6rem;white-space:nowrap;">';
        if (aprobado) {
            html += '<span style="color:var(--exito);">✔ Aprobado</span>';
        } else {
            html += '<span style="color:var(--peligro);">✘ Reprobado</span>';
        }
        html += '</td>';
        html += '<td style="text-align:center;padding:0.4rem 0.6rem;">';
        html += '<button onclick="abrirModalEditar(' + e.id + ')" style="background:rgba(240,192,64,0.12);border:1px solid var(--acento);color:var(--acento);border-radius:6px;padding:0.2rem 0.6rem;cursor:pointer;font-size:0.78rem;white-space:nowrap;">✎ Editar</button>';
        html += '</td></tr>';
    });

    html += '</tbody></table>';
    contenedor.innerHTML = html;
}

/* ── Calcula el promedio de un array de notas ── */
function calcularPromedio(notas) {
    var suma = 0;
    for (var i = 0; i < notas.length; i++) suma += notas[i];
    return Math.round((suma / notas.length) * 100) / 100;
}

/* ── Abre el modal de edición para el estudiante con ese id ── */
function abrirModalEditar(id) {
    var est = null;
    for (var i = 0; i < calificaciones.length; i++) {
        if (calificaciones[i].id === id) { est = calificaciones[i]; break; }
    }
    if (!est) return;

    _idEstudianteEditando = id;

    document.getElementById('modal-titulo-nombre').textContent = '✎ Editar notas — ' + est.nombre;

    var inputsHTML = '';
    est.notas.forEach(function (n, i) {
        inputsHTML +=
            '<div>' +
            '<label style="color:var(--apagado);font-size:0.78rem;display:block;margin-bottom:0.2rem;">Nota ' + (i + 1) + '</label>' +
            '<input id="edit-nota-' + i + '" type="number" min="0" max="10" step="0.1" value="' + n.toFixed(1) + '"' +
            ' oninput="actualizarPreviewPromedio()"' +
            ' style="width:100%;background:var(--superficie2);border:1px solid var(--borde);color:var(--texto);border-radius:6px;padding:0.4rem 0.6rem;font-size:0.9rem;box-sizing:border-box;">' +
            '</div>';
    });
    document.getElementById('modal-inputs-notas').innerHTML = inputsHTML;

    actualizarPreviewPromedio();
    ocultarMensajeModal();

    var modal = document.getElementById('modal-editar-notas');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/* ── Cierra el modal ── */
function cerrarModalNotas() {
    document.getElementById('modal-editar-notas').style.display = 'none';
    document.body.style.overflow = '';
    _idEstudianteEditando = null;
}

/* ── Actualiza el preview del promedio en tiempo real mientras escribe ── */
function actualizarPreviewPromedio() {
    var notas = leerNotasModal();
    if (notas === null) {
        document.getElementById('modal-preview-promedio').innerHTML = '<span style="color:var(--peligro);">⚠ Notas inválidas</span>';
        return;
    }
    var prom = calcularPromedio(notas);
    var aprobado = prom >= 7;
    var color = aprobado ? 'var(--exito)' : 'var(--peligro)';
    var estado = aprobado ? '✔ Aprobado' : '✘ Reprobado';
    document.getElementById('modal-preview-promedio').innerHTML =
        'Promedio: <strong style="color:' + color + ';">' + prom.toFixed(2) + '</strong>' +
        ' &nbsp;<span style="color:' + color + ';">' + estado + '</span>';
}

/* ── Lee las 10 notas del modal y las valida ── */
function leerNotasModal() {
    var notas = [];
    for (var i = 0; i < 10; i++) {
        var input = document.getElementById('edit-nota-' + i);
        if (!input) return null;
        var val = parseFloat(input.value);
        if (isNaN(val) || val < 0 || val > 10) return null;
        notas.push(Math.round(val * 10) / 10);
    }
    return notas;
}

/* ── Guarda las notas editadas en el array global y refresca todo ── */
function guardarNotasEditadas() {
    var notas = leerNotasModal();
    if (notas === null) {
        mostrarMensajeModal('⚠ Verifica que todas las notas estén entre 0 y 10.', 'error');
        return;
    }
    for (var i = 0; i < calificaciones.length; i++) {
        if (calificaciones[i].id === _idEstudianteEditando) {
            calificaciones[i].notas = notas;
            calificaciones[i].nota  = calcularPromedio(notas);
            break;
        }
    }
    refrescarTodo();
    renderizarNotasDetalladas();
    mostrarMensajeModal('✔ Notas actualizadas correctamente.', 'exito');
    setTimeout(cerrarModalNotas, 900);
}

/* ── Mensajes dentro del modal ── */
function mostrarMensajeModal(texto, tipo) {
    var el = document.getElementById('modal-mensaje-editar');
    el.textContent = texto;
    el.style.display = 'block';
    el.style.background = tipo === 'exito' ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)';
    el.style.color = tipo === 'exito' ? 'var(--exito)' : 'var(--peligro)';
    el.style.border = '1px solid ' + (tipo === 'exito' ? 'var(--exito)' : 'var(--peligro)');
}
function ocultarMensajeModal() {
    var el = document.getElementById('modal-mensaje-editar');
    if (el) el.style.display = 'none';
}

/* ── Cierra el modal al hacer clic fuera ── */
document.addEventListener('click', function (ev) {
    var modal = document.getElementById('modal-editar-notas');
    if (modal && ev.target === modal) cerrarModalNotas();
});

/* ── Hook: renderizar notas detalladas al cargar y al refrescar ── */
document.addEventListener('DOMContentLoaded', function () {
    renderizarNotasDetalladas();
});

/* ── Parche: asegura que refrescarTodo siempre regenere las notas detalladas ── */
var _refrescarTodoOriginal = refrescarTodo;
refrescarTodo = function () {
    _refrescarTodoOriginal();
    renderizarNotasDetalladas();
};