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
                    'rgba(56,189,248,0.7)', /* Dato 2 — azul */
                    'rgba(56,189,248,0.7)', /* Dato 3 — azul */
                    'rgba(56,189,248,0.7)', /* Dato 4 — azul */
                    'rgba(240,192,64,0.9)', /* Dato 5 — dorado (máximo) */
                    'rgba(56,189,248,0.7)' /* Dato 6 — azul */
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

/* ── BANCO DE PREGUNTAS ──
 Array con los 5 objetos de pregunta del quiz.
 Cada objeto tiene: texto de la pregunta, 4 opciones,
 índice de la correcta (0-3) y la explicación para el feedback. */
var preguntas = [
    {
        pregunta: "¿Cuál es la media aritmética del conjunto: 10, 20, 30, 40?",
        opciones: ["20", "25", "30", "35"],
        correcta: 1, /* Índice 1 = "25" → (10+20+30+40)/4 = 25 */
        explicacion: "Suma = 100, n = 4 → media = 100/4 = 25."
    },
    {
        pregunta: "¿Cuál es la mediana del conjunto ordenado: 3, 7, 9, 15, 21?",
        opciones: ["7", "9", "15", "11"],
        correcta: 1, /* Índice 1 = "9" es el valor central de 5 datos */
        explicacion: "5 datos (impar) → el valor central es el 3ro → 9."
    },
    {
        pregunta: "En el conjunto [4, 8, 8, 10, 12], ¿cuál es la moda?",
        opciones: ["4", "10", "8", "12"],
        correcta: 2, /* Índice 2 = "8" aparece 2 veces */
        explicacion: "El 8 aparece 2 veces, más que cualquier otro valor."
    },
    {
        pregunta: "¿Qué porcentaje representa 25 sobre un total de 200?",
        opciones: ["10%", "12.5%", "15%", "25%"],
        correcta: 1, /* Índice 1 = "12.5%" → (25/200)×100 */
        explicacion: "(25/200) × 100 = 12.5%"
    },
    {
        pregunta: "Dados los datos [5, 6, 5, 200, 7, 6], ¿cuál valor es probablemente una ANOMALÍA?",
        opciones: ["5", "6", "7", "200"],
        correcta: 3, /* Índice 3 = "200" está muy lejos del promedio */
        explicacion: "El 200 se aleja drásticamente del promedio (~38) y supera el umbral estadístico."
    }
];
