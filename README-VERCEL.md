# ONE MORE ELECTRONIC — Deploy en Vercel

Sitio estático: subí esta carpeta o el ZIP a Vercel; no requiere build.

## Ubicación

La sección Ubicación usa exclusivamente Google Maps Embed oficial, dirigido a Av. Francisco Beiró 3334, Villa Devoto, Buenos Aires. El visor aislado de Arena bloquea iframes/red de terceros; el embed se debe comprobar en el dominio HTTPS desplegado.

## Ajustes de esta versión

### Accesos rápidos móviles

Los botones flotantes ya no desaparecen al llegar a FAQ. Se mantienen activos durante toda la web y comienzan a salir solo cuando el bloque real de controles finales (`ONE MORE APP`, sonido y alerta) se aproxima al viewport. La salida usa la misma animación editorial de departure que se utiliza en la transición de Archivo; al volver hacia arriba, los botones regresan animados y recuperan foco/interacción.

### Acciones de la fecha

En detalles estrechos, Comprar entradas ocupa la primera fila y Compartir / QR la segunda. Ambos botones de la segunda fila miden exactamente 52 px de alto.

### Sonido

Los tonos agudos dobles se reemplazaron por una señal corta y cálida: seno de baja frecuencia con un toque de ruido filtrado, compresión suave y un segundo pulso discreto solo para confirmaciones. No usa assets ni autoplay.

### Notificación de prueba

La prueba mantiene el envío local desde la PWA instalada y rediseña los datos que Android sí permite controlar:

- título: `JOYCE · VIE 23 OCT`;
- cuerpo: `23:59 H · ONE MORE CLUB · DEVOTO`;
- acción: `Ver fecha`;
- nuevo icono principal transparente de ONE MORE;
- nuevo badge monocromo transparente para la barra de estado.

El panel de Android sigue siendo UI del sistema y no permite CSS propio; título, cuerpo, icono, badge y acciones son las partes personalizables desde web push.

### Menú móvil

Se quitó `Instalar ONE MORE` del menú hamburguesa y cualquier control de prueba de alertas en ese menú. El control de sonido se conserva allí. La instalación y la prueba de alerta siguen disponibles en el footer (la instalación se oculta dentro de la PWA instalada).

## PWA

Service worker: `one-more-shell-v24`. Tras desplegar, abrí o recargá una vez la PWA instalada para adoptar el service worker y los nuevos iconos de notificación.
