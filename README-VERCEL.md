# ONE MORE ELECTRONIC — Deploy en Vercel

Este paquete es un sitio estático: no necesita instalar dependencias ni ejecutar un build.

## Deploy recomendado
1. Descomprimí el ZIP.
2. Subí **todo el contenido**, incluyendo `assets/`, a GitHub, GitLab o Bitbucket.
3. Importá el repositorio en Vercel, sin Build Command ni Output Directory.
4. Alternativamente, desde la carpeta extraída ejecutá `npx vercel --prod`.

## PWA instalable
La PWA incluye manifest, service worker, favicon y Apple Touch Icon.

Los íconos Android requeridos de 192 y 512 están incorporados dentro del manifest para no depender de assets nuevos en un deploy parcial. El generador QR también está incorporado dentro de `index.html`.

El botón interno usa el prompt nativo cuando Chrome lo ofrece. Si Chrome no expone el prompt a la página, muestra la instrucción manual: `⋮ → Instalar app`. El botón se oculta automáticamente en el modo app instalado (`display-mode: standalone`).

## Mapa interactivo: MapCN
La ubicación usa una isla React con el componente oficial MapCN, basado en MapLibre GL. Se carga solo cuando la sección Ubicación se acerca al viewport, por lo que no agrega trabajo al hero. Ya no se incluyen las 76 teselas locales del mapa anterior.

El basemap ahora es una única imagen local georreferenciada de OpenStreetMap. MapCN/MapLibre la renderiza como un mapa real: permite desplazamiento, zoom, marcador, popup y controles incluso si el preview no tiene red. El worker de MapLibre también está alojado localmente. No necesita API key ni requests de tiles externos.

Los archivos del mapa están versionados como `v3` para evitar que la caché inmutable de assets de Vercel retenga una versión anterior.

## Prueba de notificación
Los botones `Probar alerta · Test` envían **una notificación local de prueba** mediante el service worker. En el primer uso Android pedirá permiso. Al tocar la notificación se abre JOYCE y su CTA de entradas.

No es web push real: no se guarda ninguna suscripción, token, VAPID key ni configuración Firebase. Para alertas reales de nuevas fechas todavía se necesita `firebaseConfig` público, VAPID public key, Firebase Cloud Messaging y una ruta de envío segura del lado del servidor. Retirá el botón de prueba antes de publicar el sitio al público.

## QR y fechas
Dentro de cada fecha hay un botón `QR`. El QR se genera localmente y abre esa fecha junto con su compra de entradas. El botón de descarga crea un JPG editorial con nombre del evento, código QR y llamado a la acción, listo para compartir.

Las rutas cortas impresas están en `vercel.json`:
- `/q/joyce`
- `/q/goth`
- `/q/halloween`
