# ONE MORE ELECTRONIC — Deploy en Vercel

Este paquete es un sitio estático: no necesita instalar dependencias ni ejecutar un build.

## Deploy recomendado
1. Descomprimí el ZIP.
2. Subí **todo el contenido**, incluyendo `assets/`, a GitHub, GitLab o Bitbucket.
3. Importá el repositorio en Vercel, sin Build Command ni Output Directory.
4. Alternativamente, desde la carpeta extraída ejecutá `npx vercel --prod`.

## PWA robusta
La PWA incluye manifest, service worker, favicon y Apple Touch Icon.

Los íconos Android requeridos de 192 y 512 están incorporados dentro del manifest para evitar fallos cuando un deploy parcial no sube assets nuevos. El generador QR también está incorporado dentro de `index.html`; por tanto no depende de una librería JavaScript externa en producción.

Abrí el dominio final directamente en Chrome Android, no dentro de un preview/iframe. Si ya hubo un intento fallido de PWA, cerrá las pestañas del sitio o eliminá sus datos en Chrome antes de volver a probar.

## Alertas de fechas / Firebase
La interfaz de alertas está preparada y marcada como `Próximamente`. No solicita permisos aún porque Firebase Messaging y el almacenamiento de suscripciones todavía no están conectados.

Para activar notificaciones reales más adelante se necesitarán: `firebaseConfig` público, VAPID public key, Firebase Cloud Messaging y una colección/función segura para guardar tokens y enviar campañas. Nunca incluyas claves privadas o service-account JSON en estos archivos estáticos.

## QR y fechas
Cada fecha tiene un botón `QR`. El QR se genera localmente y abre esa fecha junto con su compra de entradas. Las rutas cortas impresas están en `vercel.json`:
- `/q/joyce`
- `/q/goth`
- `/q/halloween`
