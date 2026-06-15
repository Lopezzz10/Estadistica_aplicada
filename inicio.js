/* ── INICIO ──
   Se ejecuta automáticamente al cargar la página gracias al atributo "defer" en el script.
   Llama a todas las funciones para inicializar indicadores, tablas, alertas, gráficos y quiz. */
renderizarIndicadores();
renderizarTablaFrecuencias();
renderizarAlertas();
renderizarTablaEstudiantes();
renderizarAnalisisGenero();
renderizarAnalisisEdad();
renderizarAnalisisAsistencia();

crearGraficoTendencia();
crearGraficoBarras();

crearGraficoLineas100();
crearHistograma();
crearGraficoCircular();
crearGraficoBarrasNota();
crearGraficoGenero();
crearGraficoEdad();
crearGraficoAsistencia();
crearScatter();

mostrarPregunta(0);