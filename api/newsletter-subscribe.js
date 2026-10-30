const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getJsonBody = (body) => {
  if (typeof body === 'string') {
    try { return JSON.parse(body); } catch (_) { return {}; }
  }
  return body && typeof body === 'object' ? body : {};
};

module.exports = async (request, response) => {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  const { email } = getJsonBody(request.body);
  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (!emailPattern.test(normalizedEmail) || normalizedEmail.length > 254) {
    return response.status(400).json({ error: 'INVALID_EMAIL' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID);
  const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);
  const redirectionUrl = process.env.BREVO_DOI_REDIRECT_URL;

  if (!apiKey || !Number.isInteger(listId) || listId < 1 || !Number.isInteger(templateId) || templateId < 1 || !redirectionUrl) {
    return response.status(503).json({ error: 'CONFIGURATION_REQUIRED' });
  }

  try {
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email: normalizedEmail,
        includeListIds: [listId],
        templateId,
        redirectionUrl
      })
    });

    if (!brevoResponse.ok) {
      return response.status(502).json({ error: 'BREVO_REQUEST_FAILED' });
    }

    return response.status(200).json({ ok: true });
  } catch (_) {
    return response.status(502).json({ error: 'BREVO_REQUEST_FAILED' });
  }
};
