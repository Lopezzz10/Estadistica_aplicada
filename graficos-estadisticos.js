var _chartLineas, _chartHistograma, _chartCircular, _chartBarrasNota,
    _chartGenero, _chartEdad, _chartAsistencia, _chartScatter;

function crearGraficoLineas100() {
    var etiquetas = calificaciones.map(function (e) { return 'E' + e.id; });
    var notas     = obtenerNotas(calificaciones);
    var ctx = document.getElementById('graficoLineas100');
    if (!ctx) return;
    if (_chartLineas) _chartLineas.destroy();
    _chartLineas = new Chart(ctx, {
        type: 'line',
        data: {
            labels: etiquetas,
            datasets: [{
                label: 'Nota',
                data: notas,
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56,189,248,0.05)',
                tension: 0.3,
                fill: true,
                pointRadius: 2,
                pointBackgroundColor: '#38bdf8'
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: '#1e2d45' }, ticks: { maxTicksLimit: 10 } },
                y: { grid: { color: '#1e2d45' }, min: 0, max: 10 }
            }
        }
    });
}

/* ── FUNCIÓN: crearHistograma ──
   Barras de frecuencia absoluta agrupadas por intervalo de nota.
   Usa los mismos intervalos de calcularFrecuencias (0-2, 2-4, 4-6, 6-8, 8-10). */
function crearHistograma() {
    var notas = obtenerNotas(calificaciones);
    var intervalos = calcularFrecuencias(notas);
    var ctx = document.getElementById('graficoHistograma');
    if (!ctx) return;
    if (_chartHistograma) _chartHistograma.destroy();
    _chartHistograma = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: intervalos.map(function (i) { return i.etiqueta; }),
            datasets: [{
                label: 'Frecuencia',
                data: intervalos.map(function (i) { return i.absoluta; }),
                backgroundColor: [
                    'rgba(248,113,113,0.7)',
                    'rgba(248,113,113,0.7)',
                    'rgba(56,189,248,0.7)',
                    'rgba(240,192,64,0.8)',
                    'rgba(52,211,153,0.7)'
                ],
                borderRadius: 6
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: '#1e2d45' } },
                y: { grid: { color: '#1e2d45' }, beginAtZero: true }
            }
        }
    });
}

/* ── FUNCIÓN: crearGraficoCircular ──
   Dona que muestra la proporción de aprobados (nota ≥ 6)
   vs reprobados sobre el total de 100 estudiantes. */
function crearGraficoCircular() {
    var notas = obtenerNotas(calificaciones);
    var aprobados   = notas.filter(function (n) { return n >= 6; }).length;
    var reprobados  = notas.length - aprobados;
    var ctx = document.getElementById('graficoCircular');
    if (!ctx) return;
    if (_chartCircular) _chartCircular.destroy();
    _chartCircular = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Aprobados', 'Reprobados'],
            datasets: [{
                data: [aprobados, reprobados],
                backgroundColor: ['rgba(52,211,153,0.8)', 'rgba(248,113,113,0.8)'],
                borderColor: '#0b0f1a',
                borderWidth: 3
            }]
        },
        options: { plugins: { legend: { display: true, position: 'bottom' } } }
    });
}

/* ── FUNCIÓN: crearGraficoBarrasNota ──
   Cuenta cuántos estudiantes obtuvieron cada nota entera (0 al 10)
   y lo muestra como barras verticales. */
function crearGraficoBarrasNota() {
    var notas  = obtenerNotas(calificaciones);
    var conteo = [0,0,0,0,0,0,0,0,0,0,0];
    notas.forEach(function (n) { conteo[Math.round(n)]++; });
    var ctx = document.getElementById('graficoBarrasNota');
    if (!ctx) return;
    if (_chartBarrasNota) _chartBarrasNota.destroy();
    _chartBarrasNota = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [0,1,2,3,4,5,6,7,8,9,10],
            datasets: [{
                label: 'Estudiantes',
                data: conteo,
                backgroundColor: 'rgba(167,139,250,0.7)',
                borderRadius: 6
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: '#1e2d45' } },
                y: { grid: { color: '#1e2d45' }, beginAtZero: true }
            }
        }
    });
}

/* ── GRÁFICO COMPARATIVO GÉNERO ── */
function crearGraficoGenero() {
    var g = calcularPorGenero(calificaciones);
    var ctx = document.getElementById('graficoGenero');
    if (!ctx) return;
    if (_chartGenero) _chartGenero.destroy();
    _chartGenero = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Promedio', 'Nota máx.', 'Nota mín.'],
            datasets: [
                {
                    label: '♂ Hombres',
                    data: [g.hombres.promedio, g.hombres.max, g.hombres.min],
                    backgroundColor: 'rgba(56,189,248,0.75)',
                    borderRadius: 6
                },
                {
                    label: '♀ Mujeres',
                    data: [g.mujeres.promedio, g.mujeres.max, g.mujeres.min],
                    backgroundColor: 'rgba(167,139,250,0.75)',
                    borderRadius: 6
                }
            ]
        },
        options: {
            plugins: { legend: { display: true, position: 'bottom', labels: { color: '#94a3b8' } } },
            scales: {
                x: { grid: { color: '#1e2d45' }, ticks: { color: '#94a3b8' } },
                y: { grid: { color: '#1e2d45' }, ticks: { color: '#94a3b8' }, min: 0, max: 10 }
            }
        }
    });
}

/* ── GRÁFICO PROMEDIO POR EDAD ── */
function crearGraficoEdad() {
    var rangos = calcularPorEdad(calificaciones);
    var ctx = document.getElementById('graficoEdad');
    if (!ctx) return;
    if (_chartEdad) _chartEdad.destroy();
    _chartEdad = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: rangos.map(function (r) { return r.etiqueta + ' años'; }),
            datasets: [{
                label: 'Promedio de nota',
                data: rangos.map(function (r) { return r.promedio; }),
                backgroundColor: ['rgba(240,192,64,0.75)', 'rgba(52,211,153,0.75)', 'rgba(248,113,113,0.75)'],
                borderRadius: 6
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: '#1e2d45' }, ticks: { color: '#94a3b8' } },
                y: { grid: { color: '#1e2d45' }, ticks: { color: '#94a3b8' }, min: 0, max: 10 }
            }
        }
    });
}

/* ── GRÁFICO ASISTENCIA vs NOTA ── */
function crearGraficoAsistencia() {
    var franjas = calcularAsistenciaVsNota(calificaciones);
    var ctx = document.getElementById('graficoAsistencia');
    if (!ctx) return;
    if (_chartAsistencia) _chartAsistencia.destroy();
    _chartAsistencia = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: franjas.map(function (f) { return f.etiqueta; }),
            datasets: [{
                label: 'Promedio de nota',
                data: franjas.map(function (f) { return f.promedio; }),
                backgroundColor: [
                    'rgba(248,113,113,0.75)',
                    'rgba(240,192,64,0.75)',
                    'rgba(56,189,248,0.75)',
                    'rgba(52,211,153,0.75)'
                ],
                borderRadius: 6
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: '#1e2d45' }, ticks: { color: '#94a3b8' } },
                y: { grid: { color: '#1e2d45' }, ticks: { color: '#94a3b8' }, min: 0, max: 10 }
            }
        }
    });
}

/* ── SCATTER: asistencia vs nota (punto por estudiante) ── */
function crearScatter() {
    var ctx = document.getElementById('graficoScatter');
    if (!ctx) return;
    if (_chartScatter) _chartScatter.destroy();
    var puntosH = calificaciones.filter(function (e) { return e.genero === 'M'; })
        .map(function (e) { return { x: e.asistencia, y: e.nota }; });
    var puntosM = calificaciones.filter(function (e) { return e.genero === 'F'; })
        .map(function (e) { return { x: e.asistencia, y: e.nota }; });
    _chartScatter = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: '♂ Hombres',
                    data: puntosH,
                    backgroundColor: 'rgba(56,189,248,0.6)',
                    pointRadius: 5
                },
                {
                    label: '♀ Mujeres',
                    data: puntosM,
                    backgroundColor: 'rgba(167,139,250,0.6)',
                    pointRadius: 5
                }
            ]
        },
        options: {
            plugins: { legend: { display: true, position: 'bottom', labels: { color: '#94a3b8' } } },
            scales: {
                x: {
                    grid: { color: '#1e2d45' },
                    ticks: { color: '#94a3b8' },
                    title: { display: true, text: 'Asistencia (%)', color: '#94a3b8' },
                    min: 30, max: 100
                },
                y: {
                    grid: { color: '#1e2d45' },
                    ticks: { color: '#94a3b8' },
                    title: { display: true, text: 'Nota', color: '#94a3b8' },
                    min: 0, max: 10
                }
            }
        }
    });
}