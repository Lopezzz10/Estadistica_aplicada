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