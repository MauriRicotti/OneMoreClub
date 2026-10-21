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

Abrí el dominio final directamente en Chrome Android, no dentro de un preview/iframe. Si ya hubo un intento fallido de PWA, cerrá las pestañas del sitio o eliminá sus datos en Chrome antes de volver a probar.

## Alertas de fechas / Firebase
La interfaz de alertas está preparada y marcada como `Próximamente`. No solicita permisos aún porque Firebase Messaging y el almacenamiento de suscripciones todavía no están conectados.

Para activar notificaciones reales más adelante se necesitarán: `firebaseConfig` público, VAPID public key, Firebase Cloud Messaging y una colección/función segura para guardar tokens y enviar campañas. Nunca incluyas claves privadas o service-account JSON en estos archivos estáticos.

## QR y fechas
Dentro de cada fecha hay un botón `QR`. El QR se genera localmente y abre esa fecha junto con su compra de entradas. El botón de descarga crea un JPG editorial con nombre del evento, código QR y llamado a la acción, listo para compartir.

Las rutas cortas impresas están en `vercel.json`:
- `/q/joyce`
- `/q/goth`
- `/q/halloween`
