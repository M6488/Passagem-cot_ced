module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Método não permitido.' });
  }

  try {
    const { chatId, payload } = req.body || {};

    const envByChat = {
      chat1: process.env.TEAMS_WEBHOOK_CHAT1,
      chat2: process.env.TEAMS_WEBHOOK_CHAT2,
      chat3: process.env.TEAMS_WEBHOOK_CHAT3
    };

    if (!chatId || !envByChat[chatId]) {
      return res.status(400).json({
        ok: false,
        error: 'Webhook não configurado para este chat.'
      });
    }

    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({
        ok: false,
        error: 'Payload inválido.'
      });
    }

    const response = await fetch(envByChat[chatId], {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const body = await response.text();

    return res.status(response.status).json({
      ok: response.ok,
      status: response.status,
      details: body ? body.slice(0, 500) : undefined
    });
  } catch (error) {
    console.error('Erro ao enviar para o Teams:', error);
    return res.status(502).json({
      ok: false,
      error: 'Não foi possível alcançar o webhook do Teams.'
    });
  }
};
