/* ── INICIO ──
 Se ejecuta automáticamente al cargar la página gracias al atributo "defer" en el script.
 Llama a todas las funciones para inicializar gráficos, indicadores, tabla, alertas y quiz. */
crearGraficoTendencia();
crearGraficoBarras();
mostrarPregunta(0);
renderizarIndicadores();
renderizarTablaFrecuencias();
renderizarAlertas();
crearGraficoLineas100();
crearHistograma();
crearGraficoCircular();
crearGraficoBarrasNota();