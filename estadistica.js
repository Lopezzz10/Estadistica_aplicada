/* ── DATOS: 100 CALIFICACIONES ESTUDIANTILES ──
   Notas del 0 al 10 con distribución realista:
   mayoría entre 6 y 9, algunos reprobados, pocos perfectos */
var calificaciones = [
    7.5, 8.0, 6.5, 9.0, 5.5, 7.0, 8.5, 6.0, 9.5, 4.0,
    7.0, 8.0, 6.5, 7.5, 5.0, 8.0, 9.0, 6.0, 7.0, 8.5,
    3.5, 7.5, 8.0, 6.5, 9.0, 7.0, 5.5, 8.0, 6.5, 7.5,
    9.5, 6.0, 7.0, 8.5, 5.0, 7.5, 8.0, 6.0, 9.0, 7.0,
    4.5, 8.0, 7.5, 6.5, 9.0, 5.5, 7.0, 8.0, 6.0, 7.5,
    8.5, 5.0, 7.0, 9.0, 6.5, 8.0, 7.5, 6.0, 9.5, 4.0,
    7.0, 8.0, 5.5, 7.5, 8.5, 6.5, 9.0, 7.0, 6.0, 8.0,
    3.0, 7.5, 8.0, 6.5, 9.0, 5.0, 7.0, 8.5, 6.0, 7.5,
    10.0, 6.5, 7.0, 8.0, 5.5, 7.5, 9.0, 6.0, 8.0, 7.0,
    2.0, 8.5, 7.5, 6.5, 9.0, 5.0, 7.0, 8.0, 6.5, 7.5
];

/* ── FUNCIÓN: calcularMedia ──
   Suma todos los valores y divide entre la cantidad */
function calcularMedia(datos) {
    var suma = 0;
    for (var i = 0; i < datos.length; i++) {
        suma += datos[i];
    }
    return suma / datos.length;
}

/* ── FUNCIÓN: calcularMediana ──
   Ordena los datos y obtiene el valor central */
function calcularMediana(datos) {
    var ordenados = datos.slice().sort(function (a, b) { return a - b; });
    var mitad = Math.floor(ordenados.length / 2);
    if (ordenados.length % 2 === 0) {
        return (ordenados[mitad - 1] + ordenados[mitad]) / 2;
    } else {
        return ordenados[mitad];
    }
}

/* ── FUNCIÓN: calcularModa ──
   Encuentra el valor que más se repite */
function calcularModa(datos) {
    var frecuencia = {};
    for (var i = 0; i < datos.length; i++) {
        var val = datos[i];
        frecuencia[val] = (frecuencia[val] || 0) + 1;
    }
    var maxFrecuencia = 0;
    var moda = datos[0];
    for (var clave in frecuencia) {
        if (frecuencia[clave] > maxFrecuencia) {
            maxFrecuencia = frecuencia[clave];
            moda = clave;
        }
    }
    return Number(moda);
}

/* ── FUNCIÓN: calcularVarianza ──
   Promedio de las diferencias al cuadrado respecto a la media */
function calcularVarianza(datos, media) {
    var suma = 0;
    for (var i = 0; i < datos.length; i++) {
        suma += Math.pow(datos[i] - media, 2);
    }
    return suma / datos.length;
}

/* ── FUNCIÓN: calcularDesviacion ──
   Raíz cuadrada de la varianza */
function calcularDesviacion(varianza) {
    return Math.sqrt(varianza);
}

/* ── FUNCIÓN: calcularRango ──
   Diferencia entre el valor máximo y el mínimo */
function calcularRango(datos) {
    var ordenados = datos.slice().sort(function (a, b) { return a - b; });
    return ordenados[ordenados.length - 1] - ordenados[0];
}

/* ── FUNCIÓN: calcularFrecuencias ──
   Agrupa los datos en intervalos y calcula frecuencias */
function calcularFrecuencias(datos) {
    var intervalos = [
        { etiqueta: '0 – 2', min: 0, max: 2 },
        { etiqueta: '2 – 4', min: 2, max: 4 },
        { etiqueta: '4 – 6', min: 4, max: 6 },
        { etiqueta: '6 – 8', min: 6, max: 8 },
        { etiqueta: '8 – 10', min: 8, max: 10 }
    ];
    for (var i = 0; i < intervalos.length; i++) {
        intervalos[i].absoluta = 0;
    }
    for (var j = 0; j < datos.length; j++) {
        for (var k = 0; k < intervalos.length; k++) {
            if (datos[j] >= intervalos[k].min && datos[j] <= intervalos[k].max) {
                /* El valor 10 solo se cuenta en el último intervalo */
                if (datos[j] === intervalos[k].max && k < intervalos.length - 1) {
                    continue;
                }
                intervalos[k].absoluta++;
                break;
            }
        }
    }
    for (var m = 0; m < intervalos.length; m++) {
        intervalos[m].relativa = (intervalos[m].absoluta / datos.length).toFixed(4);
        intervalos[m].porcentual = ((intervalos[m].absoluta / datos.length) * 100).toFixed(2) + '%';
    }
    return intervalos;
}

/* ── FUNCIÓN: renderizarIndicadores ──
   Llama a todas las funciones estadísticas e inyecta
   los resultados en las tarjetas del HTML */
function renderizarIndicadores() {
    var media = calcularMedia(calificaciones);
    var mediana = calcularMediana(calificaciones);
    var moda = calcularModa(calificaciones);
    var varianza = calcularVarianza(calificaciones, media);
    var desviacion = calcularDesviacion(varianza);
    var rango = calcularRango(calificaciones);
    var ordenados = calificaciones.slice().sort(function (a, b) { return a - b; });
    var minimo = ordenados[0];
    var maximo = ordenados[ordenados.length - 1];

    document.getElementById('ind-total').textContent = calificaciones.length;
    document.getElementById('ind-media').textContent = media.toFixed(2);
    document.getElementById('ind-mediana').textContent = mediana.toFixed(2);
    document.getElementById('ind-moda').textContent = moda.toFixed(1);
    document.getElementById('ind-min').textContent = minimo.toFixed(1);
    document.getElementById('ind-max').textContent = maximo.toFixed(1);
    document.getElementById('ind-rango').textContent = rango.toFixed(1);
    document.getElementById('ind-varianza').textContent = varianza.toFixed(2);
    document.getElementById('ind-desviacion').textContent = desviacion.toFixed(2);
}

/* ── FUNCIÓN: renderizarTablaFrecuencias ──
 Genera dinámicamente las filas de la tabla HTML
 con los intervalos y sus frecuencias */
function renderizarTablaFrecuencias() {
    var intervalos = calcularFrecuencias(calificaciones);
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

/* ── FUNCIÓN: renderizarAlertas ──
 Detecta valores atípicos usando media ± 2*desviacion
 e inyecta los resultados en el HTML */
function renderizarAlertas() {
    var media = calcularMedia(calificaciones);
    var varianza = calcularVarianza(calificaciones, media);
    var desviacion = calcularDesviacion(varianza);
    var umbralSup = media + 2 * desviacion;
    var umbralInf = media - 2 * desviacion;
    var atipicos = [];
    for (var i = 0; i < calificaciones.length; i++) {
        if (calificaciones[i] > umbralSup || calificaciones[i] < umbralInf) {
            atipicos.push({ posicion: i + 1, valor: calificaciones[i] });
        }
    }
    var contenedor = document.getElementById('contenedor-alertas');
    var html = '';
    /* Bloque de resumen con umbrales */
    html +=
        '<div class="alerta-resumen">' +
        '<div class="fila-resultado"><span>Media (μ)</span><span>' +
        media.toFixed(2) + '</span></div>' +
        '<div class="fila-resultado"><span>Desviación estándar (σ)</span><span>' +
        desviacion.toFixed(2) + '</span></div>' +
        '<div class="fila-resultado"><span>Umbral superior (μ + 2σ)</span><span>' +
        umbralSup.toFixed(2) + '</span></div>' +
        '<div class="fila-resultado"><span>Umbral inferior (μ − 2σ)</span><span>' +
        umbralInf.toFixed(2) + '</span></div>' +
        '<div class="fila-resultado"><span>Valores atípicos detectados</span><span style = "color:var(--peligro);" > ' + atipicos.length + '</span ></div > ' + '</div>';
    /* Lista de valores atípicos o mensaje de normalidad */
    if (atipicos.length === 0) {
        html += '<div class="badge-normal">✔ Todos los valores están dentro del rango normal</div > ';
    } else {
        html += '<div class="lista-atipicos">';
        for (var j = 0; j < atipicos.length; j++) {
            html +=
                '<div class="badge-atipico">' +
                '⚠ Estudiante #' + atipicos[j].posicion +
                ' — Nota: <strong>' + atipicos[j].valor.toFixed(1) + '</strong>' +
                '</div>';
        }
        html += '</div>';
    }
    contenedor.innerHTML = html;
}

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

/* ── VARIABLES DE ESTADO DEL QUIZ ──
 Guardan el estado actual mientras el usuario navega las preguntas */
var letras = ['A', 'B', 'C', 'D']; /* Letras para identificar cada opción visualmente */
var preguntaActual = 0; /* Índice de la pregunta que se está mostrando (empieza en 0) */
var puntaje = 0; /* Contador de respuestas correctas */
/* ── FUNCIÓN: mostrarPregunta ──
 Construye y renderiza en el HTML la tarjeta de una pregunta.
 Parámetro: indice — número de pregunta a mostrar (0 a 4).
 Se llama al iniciar el quiz y cada vez que el usuario avanza. */
function mostrarPregunta(indice) {
    var p = preguntas[indice]; /* Obtiene el objeto de la pregunta actual del array */
    var contenedor = document.getElementById('contenedorQuiz'); /* Referencia al div del quiz en el
HTML */
    /* Construye el HTML de los 4 botones de opción con un bucle */
    var opcionesHTML = '';
    for (var i = 0; i < p.opciones.length; i++) {
        opcionesHTML += '<button class="boton-opcion" onclick="elegirOpcion(' + i + ')" id="op' + i + '">';
        opcionesHTML += '<span class="letra-opcion">' + letras[i] + '.</span>'; /* Letra A, B, C o D */
        opcionesHTML += '<span>' + p.opciones[i] + '</span>'; /* Texto de la opción */
        opcionesHTML += '</button>';
    }
    /* Define el texto del botón: "Siguiente" o "Ver resultados" según si es la última pregunta */
    var textoBtnSig = indice < preguntas.length - 1 ? 'Siguiente →' : 'Ver resultados →';
    /* Inyecta todo el HTML de la tarjeta dentro del contenedor */
    contenedor.innerHTML =
        '<div class="tarjeta-pregunta">' +
        '<div class="texto-pregunta"><strong>Pregunta ' + (indice + 1) + ' de ' + preguntas.length +
        ':</strong><br/>' + p.pregunta + '</div>' +
        '<div class="lista-opciones" id="listaOpciones">' + opcionesHTML + '</div>' +
        '<div class="retroalimentacion" id="retroalimentacion"></div>' + /* Vacío hasta que el usuario
responde */
        '</div>' +
        '<div class="navegacion-quiz">' +
        /* Puntaje actual a la izquierda */
        '<span style="font-family:\'DM Mono\',monospace;font-size:0.8rem;color:var(--apagado) ">Puntuación: ' + puntaje + '/' + indice + '</span>' +
        /* Botón siguiente oculto — JS lo muestra cuando el usuario responde */
        '<button class="boton boton-secundario" id="btnSiguiente" onclick="siguientePregunta()"style = "display:none;" > ' + textoBtnSig + '</button > ' + '</div>';
}
/* ── FUNCIÓN: elegirOpcion ──
 Se ejecuta cuando el usuario hace clic en una opción.
 Parámetro: indiceOpcion — índice del botón clickeado (0 a 3).
 Deshabilita todos los botones, marca correcto o incorrecto y muestra la explicación. */
function elegirOpcion(indiceOpcion) {
    var p = preguntas[preguntaActual]; /* Pregunta actual */
    var botones = document.querySelectorAll('.boton-opcion'); /* Todos los botones de opción */
    var retro = document.getElementById('retroalimentacion'); /* Bloque de feedback */
    /* Deshabilita todos los botones para que no se pueda cambiar la respuesta */
    for (var i = 0; i < botones.length; i++) {
        botones[i].disabled = true;
    }
    /* Compara la opción elegida con la correcta */
    if (indiceOpcion === p.correcta) {
        /* ── RESPUESTA CORRECTA ── */
        botones[indiceOpcion].classList.add('correcto'); /* Borde verde al botón elegido */
        retro.textContent = '✓ ¡Correcto! ' + p.explicacion; /* Mensaje con la explicación */
        retro.className = 'retroalimentacion visible bien'; /* Muestra feedback en verde */
        puntaje++; /* Suma 1 al contador de aciertos */
    } else {
        /* ── RESPUESTA INCORRECTA ── */
        botones[indiceOpcion].classList.add('incorrecto'); /* Borde rojo al botón elegido */
        botones[p.correcta].classList.add('correcto'); /* Muestra cuál era la correcta */
        retro.textContent = '✗ Incorrecto. ' + p.explicacion; /* Mensaje con la explicación */
        retro.className = 'retroalimentacion visible mal'; /* Muestra feedback en rojo */
    }
    /* Muestra el botón de siguiente/ver resultados */
    document.getElementById('btnSiguiente').style.display = 'inline-block';
    /* Marca el punto de progreso de esta pregunta como completado (dorado) */
    document.getElementById('punto' + preguntaActual).classList.add('completado');
}
/* ── FUNCIÓN: siguientePregunta ──
 Avanza al siguiente índice. Si ya no hay más preguntas muestra el puntaje final.
 Se llama al hacer clic en "Siguiente →" o "Ver resultados →". */
function siguientePregunta() {
    preguntaActual++; /* Incrementa el índice de pregunta */
    if (preguntaActual < preguntas.length) {
        /* Aún quedan preguntas — actualiza la barra y renderiza la siguiente */
        actualizarPuntos();
        mostrarPregunta(preguntaActual);
    } else {
        /* Se terminaron todas las preguntas — muestra el resultado final */
        mostrarPuntajeFinal();
    }
}
/* ── FUNCIÓN: actualizarPuntos ──
 Recorre los 5 puntos de la barra de progreso y les asigna la clase correcta:
 completado (dorado) si ya fue respondida, activo (azul) si es la actual,
 o ninguna (gris) si aún no se llegó a ella. */
function actualizarPuntos() {
    for (var i = 0; i < preguntas.length; i++) {
        var punto = document.getElementById('punto' + i);
        punto.className = 'punto-quiz'; /* Resetea todas las clases primero */
        if (i < preguntaActual) {
            punto.classList.add('completado'); /* Dorado: ya fue respondida */
        }
        if (i === preguntaActual) {
            punto.classList.add('activo'); /* Azul: es la pregunta actual */
        }
        /* Si i > preguntaActual: se queda en gris (sin clase extra) */
    }
}
/* ── FUNCIÓN: mostrarPuntajeFinal ──
 Oculta el quiz y la barra de progreso, y muestra la tarjeta con el resultado.
 Selecciona el mensaje motivacional según cuántas respuestas acertó el usuario. */
function mostrarPuntajeFinal() {
    /* Oculta el contenedor de preguntas y la barra de progreso */
    document.getElementById('contenedorQuiz').style.display = 'none';
    document.getElementById('progresoQuiz').style.display = 'none';
    /* Muestra la tarjeta de puntaje final */
    document.getElementById('tarjetaPuntaje').classList.add('visible');
    /* Actualiza el número grande con el resultado obtenido */
    document.getElementById('numeroPuntaje').textContent = puntaje + '/5';
    /* Mensajes según puntaje: índice 0 = 0 correctas, índice 4 = 5 correctas */
    var mensajes = [
        "Sigue estudiando, ¡tú puedes!",   // 0/5
        "Vas por buen camino.",              // 1/5
        "Bien hecho, ya tienes bases.",      // 2/5
        "¡Muy bien! Vas bien encaminado.",   // 3/5
        "¡Casi perfecto!",                   // 4/5
        "¡Excelente! Dominas el tema."       // 5/5
    ];
    /* Usa el puntaje como índice para seleccionar el mensaje correspondiente */
    document.getElementById('etiquetaPuntaje').textContent = mensajes[puntaje];
}
/* ── FUNCIÓN: reiniciarQuiz ──
 Resetea todas las variables y el HTML para volver a empezar desde cero.
 Se llama al hacer clic en el botón "Intentar de nuevo". */
function reiniciarQuiz() {
    preguntaActual = 0; /* Vuelve a la primera pregunta */
    puntaje = 0; /* Reinicia el contador de aciertos */
    /* Vuelve a mostrar el contenedor de preguntas y la barra de progreso */
    document.getElementById('contenedorQuiz').style.display = 'block';
    document.getElementById('progresoQuiz').style.display = 'flex';
    /* Oculta la tarjeta de puntaje final */
    document.getElementById('tarjetaPuntaje').classList.remove('visible');
    /* Resetea todos los puntos de la barra a su estado inicial (gris) */
    for (var i = 0; i < preguntas.length; i++) {
        document.getElementById('punto' + i).className = 'punto-quiz';
    }
    /* Marca el primer punto como activo (azul) */
    document.getElementById('punto0').classList.add('activo');
    /* Renderiza la primera pregunta nuevamente */
    mostrarPregunta(0);
}
/* ── INICIO ──
 Se ejecuta automáticamente al cargar la página gracias al atributo "defer" en el script.
 Crea los dos gráficos y muestra la primera pregunta del quiz. */
crearGraficoTendencia(); /* Dibuja el gráfico de línea del tema 6 */
crearGraficoBarras(); /* Dibuja el gráfico de barras del tema 7 */
mostrarPregunta(0); /* Renderiza la primera pregunta del quiz */
