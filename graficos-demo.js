/* ── CONFIGURACIÓN GLOBAL DE CHART.JS ──
Estos valores se aplican a todos los gráficos del sitio automáticamente.
Se definen una sola vez aquí para no repetirlos en cada gráfico. */
/* Color de texto de etiquetas y ejes en todos los gráficos */
Chart.defaults.color = '#7a8499';
/* Fuente monoespaciada para los números y etiquetas de los ejes */
Chart.defaults.font.family = "'DM Mono', monospace";

/* ── FUNCIÓN: crearGraficoTendencia ──
 Dibuja un gráfico de línea que muestra la evolución de ventas mes a mes.
 Usa el canvas con id="graficoTendencia" definido en el HTML.
 Se llama una sola vez al cargar la página. */
function crearGraficoTendencia() {
    /* Busca el elemento canvas en el HTML por su id */
    var canvas = document.getElementById('graficoTendencia');
    /* Crea el gráfico de tipo línea dentro del canvas encontrado */
    new Chart(canvas, {
        type: 'line', /* Tipo de gráfico: línea */
        data: {
            /* Etiquetas del eje X: los 6 meses */
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Ventas', /* Nombre para la leyenda */
                data: [30, 38, 45, 55, 72, 80], /* Valores de ventas por mes */
                borderColor: '#f0c040', /* Color de la línea (dorado) */
                backgroundColor: 'rgba(240,192,64,0.1)', /* Relleno bajo la línea */
                tension: 0.4, /* Curvatura de la línea (0=recta, 1=muy curva) */
                fill: true, /* Rellena el área bajo la línea */
                pointRadius: 5, /* Tamaño de los puntos en cada dato */
                pointBackgroundColor: '#f0c040' /* Color de los puntos */
            }]
        },
        options: {
            plugins: {
                legend: { display: false } /* Oculta la leyenda porque solo hay una serie */
            },
            scales: {
                x: { grid: { color: '#1e2d45' } }, /* Color de cuadrícula del eje X */
                y: { grid: { color: '#1e2d45' } } /* Color de cuadrícula del eje Y */
            }
        }
    });
}

/* ── FUNCIÓN: crearGraficoBarras ──
 Dibuja un gráfico de barras con las calificaciones de 6 alumnos.
 La barra más baja es roja y la más alta es dorada para destacar visualmente.
 Usa el canvas con id="graficoBarras" definido en el HTML.
 Se llama una sola vez al cargar la página. */
function crearGraficoBarras() {
    /* Busca el canvas en el HTML */
    var canvas = document.getElementById('graficoBarras');
    new Chart(canvas, {
        type: 'bar', /* Tipo de gráfico: barras verticales */
        data: {
            /* Etiquetas del eje X */
            labels: ['Dato 1', 'Dato 2', 'Dato 3', 'Dato 4', 'Dato 5', 'Dato 6'],
            datasets: [{
                label: 'Calificación',
                data: [72, 85, 90, 78, 95, 88], /* Calificaciones de cada alumno */
                /* Colores individuales por barra:
                Dato 1 (72) → rojo porque es el mínimo
                Dato 5 (95) → dorado porque es el máximo
                El resto → azul neutro */
                backgroundColor: [
                    'rgba(248,113,113,0.7)', /* Dato 1 — rojo (mínimo) */
                    'rgba(56,189,248,0.7)',  /* Dato 2 — azul */
                    'rgba(56,189,248,0.7)',  /* Dato 3 — azul */
                    'rgba(56,189,248,0.7)',  /* Dato 4 — azul */
                    'rgba(240,192,64,0.9)',  /* Dato 5 — dorado (máximo) */
                    'rgba(56,189,248,0.7)'  /* Dato 6 — azul */
                ],
                borderRadius: 6 /* Redondea las esquinas superiores de las barras */
            }]
        },
        options: {
            plugins: {
                legend: { display: false } /* Oculta la leyenda */
            },
            scales: {
                x: { grid: { color: '#1e2d45' } },
                y: {
                    grid: { color: '#1e2d45' },
                    beginAtZero: true, /* El eje Y empieza en 0 */
                    max: 100 /* Límite máximo del eje Y */
                }
            }
        }
    });
}