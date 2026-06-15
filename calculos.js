/* ── Extrae solo las notas del array de objetos ── */
function obtenerNotas(datos) {
    // Retorna una lista simple que contiene únicamente números, descartando nombres, IDs, etc.
    return datos.map(function (e) { return e.nota; });
}

function calcularMedia(datos) {
    var suma = 0;
    // Bucle clásico para acumular todos los valores numéricos de la lista
    for (var i = 0; i < datos.length; i++) { suma += datos[i]; }
    // Retorna la suma total dividida entre el número de elementos (el promedio estándar)
    return suma / datos.length;
}

/* ── FUNCIÓN: calcularMediana ──
   Ordena los datos y obtiene el valor central.
   Si n es par, promedia los dos valores del centro. */
function calcularMediana(datos) {
    // Es obligatorio ordenar numéricamente de menor a mayor antes de buscar el centro exacto
    var ordenados = datos.slice().sort(function (a, b) { return a - b; });
    var mitad = Math.floor(ordenados.length / 2); // Encuentra la posición del medio
    
    // Si la cantidad de elementos es par, toma los dos centrales y calcula su promedio
    if (ordenados.length % 2 === 0) {
        return (ordenados[mitad - 1] + ordenados[mitad]) / 2;
    } else {
        // Si es impar, simplemente retorna el del centro
        return ordenados[mitad];
    }
}

/* ── FUNCIÓN: calcularModa ──
   Recorre los datos contando repeticiones y
   devuelve el valor que más veces aparece. */
function calcularModa(datos) {
    var frecuencia = {};
    // Cuenta cuántas veces se repite cada nota y lo almacena como un mapa clave-valor, Ej: { "7.5": 3, "8.0": 5 }
    for (var i = 0; i < datos.length; i++) {
        var val = datos[i];
        frecuencia[val] = (frecuencia[val] || 0) + 1;
    }
    var maxFrecuencia = 0;
    var moda = datos[0];
    
    // Analiza el mapa para descubrir cuál es la clave con el número de repeticiones más alto
    for (var clave in frecuencia) {
        if (frecuencia[clave] > maxFrecuencia) {
            maxFrecuencia = frecuencia[clave];
            moda = clave;
        }
    }
    return Number(moda); // Convierte la clave (que originalmente es texto) de vuelta a número
}

/* ── FUNCIÓN: calcularVarianza ──
   Promedia las diferencias al cuadrado de cada dato respecto a la media. */
function calcularVarianza(datos, media) {
    var suma = 0;
    for (var i = 0; i < datos.length; i++) {
        // Math.pow(x, 2) eleva la resta al cuadrado para asegurar que el resultado sea siempre positivo
        suma += Math.pow(datos[i] - media, 2);
    }
    // Retorna el promedio de esos residuos cuadrados
    return suma / datos.length;
}

/* ── FUNCIÓN: calcularDesviacion ──
   Raíz cuadrada de la varianza.
   Expresa la dispersión en las mismas unidades que los datos. */
function calcularDesviacion(varianza) {
    // Math.sqrt() calcula la raíz cuadrada matemática
    return Math.sqrt(varianza);
}

/* ── FUNCIÓN: calcularRango ──
   Diferencia entre el valor máximo y el mínimo.
   Indica qué tan dispersos están los datos. */
function calcularRango(datos) {
    var ordenados = datos.slice().sort(function (a, b) { return a - b; });
    // Resta el número más pequeño al número más grande del conjunto
    return ordenados[ordenados.length - 1] - ordenados[0];
}

/* ── FUNCIÓN: calcularFrecuencias ──
   Agrupa los datos en intervalos y calcula:
   - Frecuencia absoluta (cuántos datos caen en cada intervalo)
   - Frecuencia relativa (proporción respecto al total)
   - Frecuencia porcentual (relativa × 100) */
function calcularFrecuencias(datos) {
    // Define los límites inferiores y superiores de los casilleros estadísticos
    var intervalos = [
        { etiqueta: '0 – 2', min: 0, max: 2 },
        { etiqueta: '2 – 4', min: 2, max: 4 },
        { etiqueta: '4 – 6', min: 4, max: 6 },
        { etiqueta: '6 – 8', min: 6, max: 8 },
        { etiqueta: '8 – 10', min: 8, max: 10 }
    ];
    for (var i = 0; i < intervalos.length; i++) { intervalos[i].absoluta = 0; }
    
    // Bucle anidado: por cada nota, revisa en cuál de los 5 casilleros encaja matemáticamente
    for (var j = 0; j < datos.length; j++) {
        for (var k = 0; k < intervalos.length; k++) {
            if (datos[j] >= intervalos[k].min && datos[j] <= intervalos[k].max) {
                // Control especial para fronteras: evita que una nota como '4.0' se sume en dos intervalos a la vez
                if (datos[j] === intervalos[k].max && k < intervalos.length - 1) { continue; }
                intervalos[k].absoluta++;
                break; // Rompe el bucle interno una vez que la nota encontró su lugar
            }
        }
    }
    // Calcula las proporciones estadísticas básicas basadas en la cantidad total de datos de la muestra
    for (var m = 0; m < intervalos.length; m++) {
        intervalos[m].relativa = (intervalos[m].absoluta / datos.length).toFixed(4);
        intervalos[m].porcentual = ((intervalos[m].absoluta / datos.length) * 100).toFixed(2) + '%';
    }
    return intervalos;
}

/* ── ANÁLISIS POR GÉNERO ── */
function calcularPorGenero(estudiantes) {
    // Filtra la lista total rompiéndola en dos subgrupos independientes según el carácter 'M' o 'F'
    var hombres = estudiantes.filter(function (e) { return e.genero === 'M'; });
    var mujeres  = estudiantes.filter(function (e) { return e.genero === 'F'; });
    var notasH = obtenerNotas(hombres);
    var notasM = obtenerNotas(mujeres);
    
    // Retorna un objeto estructurado con las estadísticas procesadas por separado para cada género
    return {
        hombres: {
            cantidad: hombres.length,
            promedio: calcularMedia(notasH),
            max: Math.max.apply(null, notasH), // Math.max encuentra el valor máximo de una lista
            min: Math.min.apply(null, notasH), // Math.min encuentra el valor mínimo de una lista
            aprobados: notasH.filter(function (n) { return n >= 6; }).length
        },
        mujeres: {
            cantidad: mujeres.length,
            promedio: calcularMedia(notasM),
            max: Math.max.apply(null, notasM),
            min: Math.min.apply(null, notasM),
            aprobados: notasM.filter(function (n) { return n >= 6; }).length
        }
    };
}

/* ── ANÁLISIS POR RANGO DE EDAD ── */
function calcularPorEdad(estudiantes) {
    var rangos = [
        { etiqueta: '18-19', min: 18, max: 19 },
        { etiqueta: '20-21', min: 20, max: 21 },
        { etiqueta: '22-23', min: 22, max: 23 }
    ];
    // .map() devuelve un nuevo array transformando cada rango de edad en sus métricas correspondientes
    return rangos.map(function (r) {
        var grupo = estudiantes.filter(function (e) { return e.edad >= r.min && e.edad <= r.max; });
        var notas = obtenerNotas(grupo);
        return {
            etiqueta: r.etiqueta,
            cantidad: grupo.length,
            promedio: notas.length ? calcularMedia(notas) : 0, // Operador ternario para evitar errores si no hay alumnos en esa edad
            aprobados: notas.filter(function (n) { return n >= 6; }).length
        };
    });
}

/* ── ANÁLISIS ASISTENCIA vs NOTA ── */
function calcularAsistenciaVsNota(estudiantes) {
    /* Agrupa en 4 franjas de asistencia */
    var franjas = [
        { etiqueta: '< 60%',   min: 0,  max: 59  },
        { etiqueta: '60-74%',  min: 60, max: 74  },
        { etiqueta: '75-89%',  min: 75, max: 89  },
        { etiqueta: '90-100%', min: 90, max: 100 }
    ];
    return franjas.map(function (f) {
        var grupo = estudiantes.filter(function (e) { return e.asistencia >= f.min && e.asistencia <= f.max; });
        var notas = obtenerNotas(grupo);
        return {
            etiqueta: f.etiqueta,
            cantidad: grupo.length,
            promedio: notas.length ? calcularMedia(notas) : 0,
            aprobados: notas.filter(function (n) { return n >= 6; }).length
        };
    });
}

/* ── CORRELACIÓN SIMPLE asistencia / nota ── */
function calcularCorrelacion(estudiantes) {
    var n = estudiantes.length;
    var sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
    
    // Coeficiente de correlación de Pearson: evalúa si los estudiantes con más asistencia sacan mejores notas
    estudiantes.forEach(function (e) {
        sumX  += e.asistencia;
        sumY  += e.nota;
        sumXY += e.asistencia * e.nota;
        sumX2 += e.asistencia * e.asistencia;
        sumY2 += e.nota * e.nota;
    });
    
    // Implementación manual de la fórmula matemática de Pearson
    var num = n * sumXY - sumX * sumY;
    var den = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    // Si el denominador es 0 (evita indeterminación), devuelve 0; de lo contrario calcula la división
    return den === 0 ? 0 : num / den; 
}