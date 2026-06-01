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
document.addEventListener('DOMContentLoaded', crearGraficoTendencia);

