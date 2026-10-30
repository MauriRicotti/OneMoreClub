# ONE MORE — Newsletter con Brevo

El formulario del footer usa `POST /api/newsletter-subscribe` y crea una suscripción con doble confirmación de Brevo. La clave de Brevo nunca se expone en el navegador.

## Antes de publicar

1. Crear una cuenta de Brevo.
2. En **Contacts > Lists**, crear una lista, por ejemplo `ONE MORE · Fechas y line-ups`, y anotar su ID numérico.
3. Crear/seleccionar un template de doble opt-in en Brevo. El template debe incluir el campo/enlace obligatorio de confirmación de Brevo. Anotar su ID numérico.
4. Configurar un sender en **Settings > Senders, Domains, IPs**.
   - Para una prueba se puede verificar una dirección existente.
   - Para producción se recomienda autenticar un dominio propio con los registros que indique Brevo (DKIM/DMARC). No es necesario cambiar el dominio de la web para hacer esto: puede usarse un subdominio de email cuando exista un dominio propio.
5. En Vercel, abrir el proyecto y entrar a **Settings > Environment Variables**. Crear estas variables para Production, Preview y Development:

```text
BREVO_API_KEY=...
BREVO_NEWSLETTER_LIST_ID=123
BREVO_DOI_TEMPLATE_ID=456
BREVO_DOI_REDIRECT_URL=https://one-more-club.vercel.app/?newsletter=confirmado
```

6. Hacer un nuevo deploy desde Vercel.

## Resultado

- Un visitante ingresa su email en el footer.
- La API de Vercel llama a Brevo sin revelar la API key.
- Brevo manda el email de confirmación.
- Solo después de hacer clic en el enlace de Brevo, el contacto queda incorporado a la lista.
- Las campañas posteriores de nuevas fechas y line-ups se envían desde Brevo.

## Nota sobre el dominio

`one-more-club.vercel.app` puede usarse como URL de regreso después de confirmar el email. Sin embargo, un remitente de newsletter profesional requiere un dominio que ONE MORE controle. Cuando el equipo compre uno, solo habrá que autenticarlo en Brevo y actualizar el sender; la integración del formulario no se reescribe.
