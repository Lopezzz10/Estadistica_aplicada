/* ── renderizarIndicadores ── */
function renderizarIndicadores() {
    var notas = obtenerNotas(calificaciones);
    var media     = calcularMedia(notas);
    var mediana   = calcularMediana(notas);
    var moda      = calcularModa(notas);
    var varianza  = calcularVarianza(notas, media);
    var desviacion = calcularDesviacion(varianza);
    var rango     = calcularRango(notas);
    var ordenadas = notas.slice().sort(function (a, b) { return a - b; });
    var minimo = ordenadas[0];
    var maximo = ordenadas[ordenadas.length - 1];

    document.getElementById('ind-total').textContent = calificaciones.length;
    document.getElementById('ind-media').textContent = media.toFixed(2);
    document.getElementById('ind-mediana').textContent = mediana.toFixed(2);
    document.getElementById('ind-moda').textContent = moda.toFixed(1);
    document.getElementById('ind-min').textContent = minimo.toFixed(1);
    document.getElementById('ind-max').textContent = maximo.toFixed(1);
    document.getElementById('ind-rango').textContent = rango.toFixed(1);
    document.getElementById('ind-varianza').textContent = varianza.toFixed(2);
    document.getElementById('ind-desviacion').textContent = desviacion.toFixed(2);

    /* Nuevos indicadores de asistencia */
    var asistencias = calificaciones.map(function (e) { return e.asistencia; });
    document.getElementById('ind-asist-prom').textContent = calcularMedia(asistencias).toFixed(1) + '%';
    var corr = calcularCorrelacion(calificaciones);
    document.getElementById('ind-correlacion').textContent = corr.toFixed(3);
}

/* ── renderizarTablaFrecuencias ── */
function renderizarTablaFrecuencias() {
    var notas = obtenerNotas(calificaciones);
    var intervalos = calcularFrecuencias(notas);
    var cuerpo = document.getElementById('cuerpo-tabla-frecuencias');
    var html = '';
    for (var i = 0; i < intervalos.length; i++) {
        html +=
            '<tr>' +
            '<td>' + intervalos[i].etiqueta + '</td>' +
            '<td>' + intervalos[i].absoluta + '</td>' +
            '<td>' + intervalos[i].relativa + '</td>' +
            '<td>' + intervalos[i].porcentual + '</td>' +
            '</tr>';
    }
    cuerpo.innerHTML = html;
}

/* ── renderizarAlertas ── */
function renderizarAlertas() {
    var notas = obtenerNotas(calificaciones);
    var media      = calcularMedia(notas);
    var varianza   = calcularVarianza(notas, media);
    var desviacion = calcularDesviacion(varianza);
    var umbralSup  = media + 2 * desviacion;
    var umbralInf  = media - 2 * desviacion;
    var atipicos   = [];
    for (var i = 0; i < calificaciones.length; i++) {
        var n = calificaciones[i].nota;
        if (n > umbralSup || n < umbralInf) {
            atipicos.push({ nombre: calificaciones[i].nombre, posicion: i + 1, valor: n });
        }
    }
    var contenedor = document.getElementById('contenedor-alertas');
    var html =
        '<div class="alerta-resumen">' +
        '<div class="fila-resultado"><span>Media (μ)</span><span>' + media.toFixed(2) + '</span></div>' +
        '<div class="fila-resultado"><span>Desviación estándar (σ)</span><span>' + desviacion.toFixed(2) + '</span></div>' +
        '<div class="fila-resultado"><span>Umbral superior (μ + 2σ)</span><span>' + umbralSup.toFixed(2) + '</span></div>' +
        '<div class="fila-resultado"><span>Umbral inferior (μ − 2σ)</span><span>' + umbralInf.toFixed(2) + '</span></div>' +
        '<div class="fila-resultado"><span>Valores atípicos detectados</span><span style="color:var(--peligro);">' + atipicos.length + '</span></div>' +
        '</div>';
    if (atipicos.length === 0) {
        html += '<div class="badge-normal">✔ Todos los valores están dentro del rango normal</div>';
    } else {
        html += '<div class="lista-atipicos">';
        for (var j = 0; j < atipicos.length; j++) {
            html +=
                '<div class="badge-atipico">' +
                '⚠ ' + atipicos[j].nombre +
                ' — Nota: <strong>' + atipicos[j].valor.toFixed(1) + '</strong>' +
                '</div>';
        }
        html += '</div>';
    }
    contenedor.innerHTML = html;
}

/* ── renderizarTablaEstudiantes ── */
function renderizarTablaEstudiantes() {
    var tbody = document.getElementById('cuerpo-tabla-estudiantes');
    if (!tbody) return;
    var html = '';
    calificaciones.forEach(function (e) {
        var estado = e.nota >= 6
            ? '<span style="color:var(--exito);">✔ Aprobado</span>'
            : '<span style="color:var(--peligro);">✘ Reprobado</span>';
        var asistColor = e.asistencia >= 75 ? 'var(--exito)' : 'var(--peligro)';
        html +=
            '<tr>' +
            '<td>' + e.id + '</td>' +
            '<td>' + e.nombre + '</td>' +
            '<td>' + (e.genero === 'M' ? '♂ Hombre' : '♀ Mujer') + '</td>' +
            '<td>' + e.edad + '</td>' +
            '<td>' + e.nota.toFixed(1) + '</td>' +
            '<td style="color:' + asistColor + ';">' + e.asistencia + '%</td>' +
            '<td>' + estado + '</td>' +
            '<td><button onclick="eliminarEstudiante(' + e.id + ')" style="background:none;border:1px solid var(--peligro);color:var(--peligro);border-radius:4px;padding:0.2rem 0.5rem;cursor:pointer;font-size:0.78rem;">✕</button></td>' +
            '</tr>';
    });
    tbody.innerHTML = html;
}

/* ── renderizarAnalisisGenero ── */
function renderizarAnalisisGenero() {
    var g = calcularPorGenero(calificaciones);
    var el = document.getElementById('tabla-genero-body');
    if (!el) return;
    el.innerHTML =
        '<tr>' +
        '<td>♂ Hombres</td>' +
        '<td>' + g.hombres.cantidad + '</td>' +
        '<td><strong>' + g.hombres.promedio.toFixed(2) + '</strong></td>' +
        '<td>' + g.hombres.max.toFixed(1) + '</td>' +
        '<td>' + g.hombres.min.toFixed(1) + '</td>' +
        '<td>' + g.hombres.aprobados + ' / ' + g.hombres.cantidad + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>♀ Mujeres</td>' +
        '<td>' + g.mujeres.cantidad + '</td>' +
        '<td><strong>' + g.mujeres.promedio.toFixed(2) + '</strong></td>' +
        '<td>' + g.mujeres.max.toFixed(1) + '</td>' +
        '<td>' + g.mujeres.min.toFixed(1) + '</td>' +
        '<td>' + g.mujeres.aprobados + ' / ' + g.mujeres.cantidad + '</td>' +
        '</tr>';
}

/* ── renderizarAnalisisEdad ── */
function renderizarAnalisisEdad() {
    var rangos = calcularPorEdad(calificaciones);
    var el = document.getElementById('tabla-edad-body');
    if (!el) return;
    var html = '';
    rangos.forEach(function (r) {
        var pct = r.cantidad ? ((r.aprobados / r.cantidad) * 100).toFixed(0) : 0;
        html +=
            '<tr>' +
            '<td>' + r.etiqueta + ' años</td>' +
            '<td>' + r.cantidad + '</td>' +
            '<td><strong>' + r.promedio.toFixed(2) + '</strong></td>' +
            '<td>' + r.aprobados + ' (' + pct + '%)</td>' +
            '</tr>';
    });
    el.innerHTML = html;
}

/* ── renderizarAnalisisAsistencia ── */
function renderizarAnalisisAsistencia() {
    var franjas = calcularAsistenciaVsNota(calificaciones);
    var el = document.getElementById('tabla-asistencia-body');
    if (!el) return;
    var html = '';
    franjas.forEach(function (f) {
        var pct = f.cantidad ? ((f.aprobados / f.cantidad) * 100).toFixed(0) : 0;
        var color = f.promedio >= 6 ? 'var(--exito)' : 'var(--peligro)';
        html +=
            '<tr>' +
            '<td>' + f.etiqueta + '</td>' +
            '<td>' + f.cantidad + '</td>' +
            '<td style="color:' + color + ';"><strong>' + f.promedio.toFixed(2) + '</strong></td>' +
            '<td>' + f.aprobados + ' (' + pct + '%)</td>' +
            '</tr>';
    });
    el.innerHTML = html;
}