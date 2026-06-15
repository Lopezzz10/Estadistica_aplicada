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