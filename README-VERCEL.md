# ONE MORE ELECTRONIC — Deploy en Vercel

Este paquete es un sitio estático: no necesita instalar dependencias ni ejecutar un build.

## Contenido a publicar
- `index.html`
- `assets/`
- `manifest.webmanifest`
- `service-worker.js`
- `vercel.json`

Conservá esta estructura de archivos al desplegar. No cambies las rutas dentro de `assets/`.

## Opción A — Vercel CLI
1. Descomprimí el ZIP.
2. Abrí una terminal dentro de la carpeta extraída.
3. Ejecutá `npx vercel` y seguí los pasos de inicio de sesión/proyecto.
4. Para publicarlo en producción: `npx vercel --prod`.

## Opción B — Repositorio Git
1. Subí el contenido de esta carpeta a un repositorio de GitHub, GitLab o Bitbucket.
2. En Vercel, elegí **Add New → Project** e importá el repositorio.
3. Vercel detectará el sitio estático. No definas Build Command ni Output Directory.
4. Hacé clic en **Deploy**.

## PWA instalable
La web incluye manifest, service worker e íconos PWA. En navegadores compatibles aparecerá el botón `Instalar app`; en iPhone se instala desde Compartir → Agregar a pantalla de inicio.

El service worker precachea el shell, íconos y poster de respaldo. El video hero y las tiles del mapa no se precachean para que la instalación sea liviana.

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

El paquete incluye favicon ICO y Apple Touch Icon. Los assets tienen cache largo. Si reemplazás una imagen o video conservando el mismo nombre, cambiá el nombre de archivo y actualizá `index.html` para evitar que visitantes vean una versión cacheada.
