# ONE MORE ELECTRONIC — Deploy en Vercel

Sitio estático: subí esta carpeta o el ZIP a Vercel; no requiere build.

## Ubicación — Google Maps Embed oficial

La sección Ubicación usa exclusivamente Google Maps Embed, dirigido a Av. Francisco Beiró 3334, Villa Devoto, Buenos Aires. Se eliminaron del sitio activo MapCN, MapLibre, Leaflet, datos locales simulados, WebGL, workers y runtimes propios de mapas.

- El iframe se carga de forma diferida con `loading="lazy"`.
- Google Maps aporta su propio mapa, marcador, zoom, arrastre, controles y atribución.
- No se incluye una API key en el sitio.
- La URL directa del embed devuelve HTTP 200, no aporta `X-Frame-Options` y entrega el documento embebible de Google Maps.

El visor aislado de Arena bloquea iframes/red de terceros, por lo que puede verse vacío allí. El mapa oficial se debe comprobar en el dominio HTTPS desplegado de Vercel.

## Corrección de FAQ

El título `Preguntas frecuentes` fue ajustado para no desbordar en escritorio ni teléfonos:

- ancho máximo contenido y `min-width: 0` en la columna;
- tipografía responsive acotada al ancho real de la columna;
- `overflow-wrap` como protección adicional;
- escala móvil independiente.

## Otros cambios incluidos

- PWA con service worker `one-more-shell-v22`.
- Sonido de interfaz sintetizado, activado tras interacción y apagable.
- Preguntas frecuentes accesibles de apertura única con animación.
