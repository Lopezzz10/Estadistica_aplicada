/* ── FUNCIÓN: crearGraficoLineas100 ──
 Muestra la evolución de las 100 notas en orden */
function crearGraficoLineas100() {
    var etiquetas = [];
    for (var i = 1; i <= calificaciones.length; i++) {
        etiquetas.push('E' + i);
    }
    new Chart(document.getElementById('graficoLineas100'), {
        type: 'line',
        data: {
            labels: etiquetas,
            datasets: [{
                label: 'Nota',
                data: calificaciones,
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
 Barras de frecuencia absoluta por intervalo */
function crearHistograma() {
    var intervalos = calcularFrecuencias(calificaciones);
    var etiquetas = [];
    var valores = [];
    for (var i = 0; i < intervalos.length; i++) {
        etiquetas.push(intervalos[i].etiqueta);
        valores.push(intervalos[i].absoluta);
    }
    new Chart(document.getElementById('graficoHistograma'), {
        type: 'bar',
        data: {
            labels: etiquetas,
            datasets: [{
                label: 'Frecuencia',
                data: valores,
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
 Proporción de aprobados (nota >= 6) vs reprobados */
function crearGraficoCircular() {
    var aprobados = 0;
    var reprobados = 0;
    for (var i = 0; i < calificaciones.length; i++) {
        if (calificaciones[i] >= 6) {
            aprobados++;
        } else {
            reprobados++;
        }
    }
    new Chart(document.getElementById('graficoCircular'), {
        type: 'doughnut',
        data: {
            labels: ['Aprobados', 'Reprobados'],
            datasets: [{
                data: [aprobados, reprobados],
                backgroundColor: [
                    'rgba(52,211,153,0.8)',
                    'rgba(248,113,113,0.8)'
                ],
                borderColor: '#0b0f1a',
                borderWidth: 3
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
}

/* ── FUNCIÓN: crearGraficoBarrasNota ──
 Conteo de cuántos estudiantes obtuvieron cada nota entera */
function crearGraficoBarrasNota() {
    var notas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var conteo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < calificaciones.length; i++) {
        var redondeada = Math.round(calificaciones[i]);
        conteo[redondeada]++;
    }
    new Chart(document.getElementById('graficoBarrasNota'), {
        type: 'bar',
        data: {
            labels: notas,
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