# ONE MORE ELECTRONIC — Deploy en Vercel

Este paquete es un sitio estático: no necesita instalar dependencias ni ejecutar un build.

## Contenido a publicar
- `index.html`
- `assets/`
- `manifest.webmanifest`
- `service-worker.js`
- `vercel.json`

Conservá esta estructura de archivos al desplegar. No cambies las rutas dentro de `assets/`.

## Deploy
1. Descomprimí el ZIP.
2. Subí el contenido a GitHub, GitLab o Bitbucket e importá el repositorio en Vercel, o desde la carpeta ejecutá `npx vercel --prod`.
3. No definas Build Command ni Output Directory.

## PWA instalable
La web incluye manifest, service worker e íconos PWA. En navegadores compatibles aparecerá el botón `Instalar app`; en iPhone se instala desde Compartir → Agregar a pantalla de inicio.

El service worker precachea el shell, íconos y poster de respaldo. El video hero y las tiles del mapa no se precachean para que la instalación sea liviana.

Los archivos críticos de QR, favicon e íconos PWA usan nombres versionados `v2`. Esto evita que Vercel conserve un 404 anterior en su CDN. Después de redeployar, abrí el dominio en una pestaña normal —no dentro de un iframe/preview— y actualizá la página una vez.

## Alertas de fechas / Firebase
La interfaz de alertas está preparada y marcada como `Próximamente`. No solicita permisos aún porque Firebase Messaging y el almacenamiento de suscripciones todavía no están conectados.

Para activar notificaciones reales más adelante se necesitarán:
- `firebaseConfig` público;
- clave pública Web Push / VAPID de Firebase;
- Firebase Cloud Messaging;
- una colección/función segura para guardar tokens y enviar campañas.

Nunca incluyas claves privadas o service-account JSON en estos archivos estáticos.

## QR y enlaces de fechas
Dentro de cada fecha hay un botón `QR`. Genera localmente un código SVG que abre esa fecha y su compra de entradas. No utiliza un proveedor externo de QR.

Además, `vercel.json` incluye URLs cortas para piezas impresas:
- `https://tu-dominio.com/q/joyce`
- `https://tu-dominio.com/q/goth`
- `https://tu-dominio.com/q/halloween`

Cada URL redirige a la fecha correspondiente y conserva parámetros de campaña QR. Usá estas rutas cuando prepares códigos QR para flyers, mesas o pantallas después de conectar el dominio definitivo.
