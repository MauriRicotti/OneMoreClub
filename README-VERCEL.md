# ONE MORE ELECTRONIC — Deploy en Vercel

Sitio estático: subí esta carpeta o el ZIP a Vercel; no requiere build.

## Ubicación — Google Maps Embed oficial

La sección Ubicación usa exclusivamente Google Maps Embed, dirigido a Av. Francisco Beiró 3334, Villa Devoto, Buenos Aires. El visor aislado de Arena bloquea iframes/red de terceros, por lo que el embed se debe comprobar en el dominio HTTPS desplegado.

## Correcciones de interfaz

### Preguntas frecuentes

`Preguntas frecuentes` ya no recorta palabras ni se sale de su columna:

- cada palabra conserva una línea completa;
- el tamaño responde al ancho de su propia columna;
- los límites de escritorio y móvil se ajustaron de forma independiente;
- se quitó el recorte del contenedor.

### Acciones de entradas y compartir

En columnas angostas del detalle de fecha, el CTA de entradas pasa a una primera fila completa y Compartir / QR pasan a una segunda fila. Esto evita que el botón Compartir desborde, tanto en escritorio estrecho como en móvil.

### Sonido

Los sonidos sintetizados siguen sin usar archivos y se activan tras la primera interacción. Ahora emplean doble voz tonal, compresión dinámica y niveles sensiblemente más altos:

- tap: volumen base `0.19`;
- navegación: `0.23`;
- confirmación: `0.30`;
- ganancia general `1.22` con compresión para mantener claridad sin clipping brusco.

### Controles flotantes y alerta instalada

- Los accesos flotantes móviles se ocultan desde que la sección Preguntas frecuentes entra en el tramo final. Reaparecen al desplazarse hacia arriba y se eliminan también del orden de foco mientras están ocultos.
- `Probar alerta` ahora llama directamente a `registration.showNotification()` una vez concedido el permiso, la ruta más fiable en una PWA instalada. La notificación conserva el enlace a JOYCE.

## PWA

Service worker: `one-more-shell-v23`.
