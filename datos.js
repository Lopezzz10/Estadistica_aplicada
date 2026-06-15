/* ── DATOS: 10 REGISTROS ESTUDIANTILES ──
   Cada objeto contiene:
   - id         → identificador único del estudiante
   - nombre     → nombre completo
   - genero     → "M" masculino / "F" femenino
   - edad       → entre 19 y 23 años
   - notas      → array con 10 calificaciones del 0 al 10
   - nota       → promedio de las 10 calificaciones (calculado)
   - asistencia → porcentaje de asistencia a clases */
var calificaciones = [
    { id: 1,  nombre: "Ana Torres",         notas: [7.5, 8.0, 6.5, 9.0, 7.0, 8.5, 6.0, 9.5, 7.5, 8.0], nota: 7.75, genero: "F", edad: 20, asistencia: 92 },
    { id: 2,  nombre: "Carlos Mendoza",     notas: [8.0, 7.5, 9.0, 6.5, 8.5, 7.0, 9.0, 6.0, 8.0, 7.5], nota: 7.70, genero: "M", edad: 21, asistencia: 88 },
    { id: 3,  nombre: "Lucía Paredes",      notas: [6.5, 5.0, 7.0, 6.0, 5.5, 6.5, 7.5, 6.0, 5.5, 6.0], nota: 6.15, genero: "F", edad: 19, asistencia: 75 },
    { id: 4,  nombre: "Diego Ramírez",      notas: [9.0, 8.5, 9.5, 8.0, 9.0, 9.5, 8.5, 9.0, 8.0, 9.5], nota: 8.85, genero: "M", edad: 22, asistencia: 95 },
    { id: 5,  nombre: "Sofía Villacís",     notas: [5.5, 4.0, 6.0, 5.0, 4.5, 5.5, 6.0, 5.0, 4.0, 5.5], nota: 5.10, genero: "F", edad: 20, asistencia: 68 },
    { id: 6,  nombre: "Mateo Gutiérrez",    notas: [7.0, 7.5, 6.5, 8.0, 7.0, 6.5, 7.5, 8.0, 7.0, 7.5], nota: 7.25, genero: "M", edad: 21, asistencia: 83 },
    { id: 7,  nombre: "Valentina Cruz",     notas: [8.5, 9.0, 8.0, 9.5, 8.5, 9.0, 8.0, 9.5, 8.5, 9.0], nota: 8.75, genero: "F", edad: 19, asistencia: 91 },
    { id: 8,  nombre: "Sebastián Mora",     notas: [6.0, 5.5, 6.5, 5.0, 6.0, 7.0, 5.5, 6.0, 6.5, 5.5], nota: 5.95, genero: "M", edad: 23, asistencia: 70 },
    { id: 9,  nombre: "Camila Espinoza",    notas: [9.5, 9.0, 10.0, 9.5, 9.0, 9.5, 10.0, 9.0, 9.5, 9.0], nota: 9.40, genero: "F", edad: 20, asistencia: 98 },
    { id: 10, nombre: "Andrés Salazar",     notas: [4.0, 3.5, 5.0, 4.5, 3.0, 4.0, 5.0, 3.5, 4.0, 4.5], nota: 4.00, genero: "M", edad: 21, asistencia: 55 }
];
