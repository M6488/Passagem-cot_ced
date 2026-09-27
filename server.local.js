/**
 * Servidor local opcional — resolve o problema de CORS no envio
 * dos webhooks do Teams a partir do navegador.
 *
 * Uso:
 *   npm install express
 *   node server.js
 *   abra http://localhost:3000
 *
 * Com o arquivo config.js com USE_PROXY: true, a página envia o card
 * para /api/send e este servidor repassa ao webhook do Teams.
 * (Requires Node.js 18+ — usa fetch nativo.)
 */
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname)));

app.post('/api/send', async (req, res) => {
  const { url, payload } = req.body || {};
  if (!url || !payload) {
    return res.status(400).json({ ok: false, error: 'Faltam url/payload.' });
  }
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('Envio para Teams -> HTTP', r.status);
    res.status(r.status).json({ ok: r.ok, status: r.status });
  } catch (e) {
    console.error('Falha no encaminhamento:', String(e));
    res.status(502).json({ ok: false, error: String(e) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('▶ Passagem de Serviço rodando em http://localhost:' + PORT);
});
