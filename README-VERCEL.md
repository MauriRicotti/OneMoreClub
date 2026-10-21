# ONE MORE ELECTRONIC — Deploy en Vercel

Este paquete es un sitio estático: no necesita instalar dependencias ni ejecutar un build.

## Contenido a publicar
- `index.html`
- `assets/`
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

## Fechas compartibles
Los enlaces compartidos usan este formato y abren directamente la fecha correcta:
- `https://tu-dominio.com/?evento=joyce-23-oct`
- `https://tu-dominio.com/?evento=goth-24-oct`
- `https://tu-dominio.com/?evento=halloween-31-oct`

`vercel.json` deja los assets con cache largo. Si reemplazás una imagen o video conservando el mismo nombre, conviene cambiarle el nombre de archivo y actualizar `index.html` para evitar que visitantes vean una versión cacheada.
