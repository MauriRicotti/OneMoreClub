# ONE MORE ELECTRONIC — cambios del 3 de noviembre de 2026

Paquete listo para subir al repositorio. Contiene el sitio completo (48 archivos)
con `index.html` en la raíz, más este registro.

## Cambios incluidos

1. **Flyer de MARTÍN UMPIER:** las 7 imágenes se pasan con gesto horizontal
   (izquierda = siguiente, derecha = anterior, con vuelta circular). Funciona con
   Pointer Events y Touch Events, respeta el scroll vertical y el cambio de fecha
   por swipe sigue activo fuera del flyer.
2. **Paginación (opción B):** se eliminaron los puntitos. Ahora hay una franja propia
   **debajo del flyer** —sin tapar la imagen— con `‹ 01 / 07 ›`. Flechas con
   `aria-label`, foco de teclado y tamaños para móvil.
3. **Autoplay:** pasó de 4000 ms a **2700 ms**. Se conservan el crossfade de 260 ms,
   la pausa por hover/foco/pestaña oculta y `prefers-reduced-motion`.
4. **Modal del QR:** `titleHtml` tiene un `<span>` por palabra; al quitar las etiquetas
   sin separador quedaba `MARTÍNUMPIER`. Se unificó el texto plano
   (`getEventTitleText`) para el modal, el share, el JPG descargable y los `aria-label`,
   y se adaptó la tipografía (`word-spacing`, tamaño para títulos largos, ajuste de
   ancho en el canvas). Ahora dice `MARTÍN UMPIER`.
5. **QR impreso de Halloween:** `/q/halloween` apuntaba al slug viejo
   `halloween-31-oct`; ahora redirige a `festa-bros-31-oct` y el `index.html` acepta
   el slug impreso como alias para no romper los QR ya distribuidos.
6. **Accesibilidad:** el `aria-label` estático de la cuenta regresiva ya no nombra a
   Joyce (el JS lo reemplaza por la fecha real).
7. **PWA:** `CACHE_NAME` pasó de `one-more-shell-v146` a **`one-more-shell-v150`**
   para que los visitantes que ya tenían la web cacheada reciban esta versión.

## Verificación

`python3 verificar_sitio.py` OK: 48 archivos, 5 eventos, 3 QR, 41 assets presentes,
sin IDs duplicados, anclas rotas, imágenes sin `alt`, links externos sin `rel` ni
errores de sintaxis JS. Pruebas en Chromium headless (escritorio 1280×900 y móvil
390×844) para gestos, flechas, autoplay, modal QR, descarga del JPG y movimiento
reducido: sin errores de JS.

## Estructura

Los archivos están en la **raíz del ZIP** (sin carpeta contenedora), para poder
descomprimirlos directamente en la raíz del repositorio / del deploy de Vercel.

No se modificó nada en Google Drive ni se publicó este paquete.
