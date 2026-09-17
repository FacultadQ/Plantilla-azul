# Planilla Azul · Plan de Trabajo 2026–2028

Sitio estático en español. Abre `index.html` para consultar la versión editorial. No requiere instalación ni compilación.

## Archivos

- `index.html`: textos y estructura editables.
- `assets/styles.css`: colores, diseño adaptable e impresión.
- `assets/app.js`: navegación móvil, seguimiento de sección, filtros, animaciones e impresión.
- `assets/fonts.css` y `assets/*.woff2`: tipografías locales; no requieren conexión.
- `Planilla Azul - Plan de Trabajo (offline).html`: versión autónoma actualizada, con fotos, tipografías y PDF final incorporados.

Para alojarlo, conserva `index.html` y las carpetas `assets` e `img` juntos en la misma ubicación del sitio. Las rutas son relativas para admitir alojamiento en una subcarpeta.

## Contenido pendiente

Sustituir los avisos de contacto, sede, teléfono y fecha cuando exista información confirmada. No se incluyeron datos inventados ni enlaces de correo de ejemplo.

El cronograma expresa frecuencias del plan, no fechas confirmadas. Bienestar conserva el compromiso de al menos una actividad por semestre.

## Interacción

Los cinco compromisos se abren con clic o teclado. El cronograma permite seleccionar compromiso y semestre. La impresión expande los compromisos y muestra todos los periodos, restaurando después la selección de pantalla. Sin JavaScript siguen disponibles los textos, desplegables y enlaces de navegación.

Validación realizada: sintaxis JavaScript, referencias a recursos locales, destinos de enlaces internos y estructura de compromisos/calendario. Pendiente: revisión visual y prueba de interacción en navegador.

## Actualización de septiembre de 2026

El contenido corresponde a `assets/plan-de-trabajo-final.pdf`. Los retratos aparecen debajo del título, con los cargos de propietaria y suplente. El cronograma incluye las 19 acciones del documento, con los meses agrupados por semestre y numerados del 1 al 24.

Para regenerar el archivo autónomo después de editar la página, ejecuta `python3 scripts/build_offline.py`.
