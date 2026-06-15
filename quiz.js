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
    var contenedor = document.getElementById('contenedorQuiz'); /* Referencia al div del quiz en el HTML */
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
        '<div class="retroalimentacion" id="retroalimentacion"></div>' + /* Vacío hasta que el usuario responde */
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