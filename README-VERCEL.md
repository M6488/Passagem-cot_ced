# Passagem de Serviço — Vercel

Esta versão mantém a interface original e troca o `server.js` por uma Function em
`/api/send`, adequada ao Vercel.

## Estrutura

```text
passagem-servico/
├── index.html
├── config.js
├── package.json
├── vercel.json
└── api/
    └── send.js
```

## 1. Suba o projeto

Você pode importar a pasta/repositório no Vercel.

Não é necessário `npm install` nem servidor Express.

## 2. Environment Variables

No projeto do Vercel, crie estas variáveis:

- `TEAMS_WEBHOOK_CHAT1` = URL do webhook do Chat 1
- `TEAMS_WEBHOOK_CHAT2` = URL do webhook do Chat 2
- `TEAMS_WEBHOOK_CHAT3` = URL do webhook do Chat 3

Cole exatamente as URLs dos Workflows/Power Automate do Teams.

## 3. Build Settings

Para este projeto:

- Framework Preset: `Other`
- Build Command: deixe vazio
- Output Directory: deixe vazio
- Install Command: deixe vazio

O Vercel detectará `index.html` como página estática e `api/send.js`
como função serverless.

## 4. Deploy

Depois do deploy, a URL será parecida com:

`https://passagem-servico-xxxxx.vercel.app`

Ao clicar em "Enviar para o Teams", o navegador chama:

`/api/send`

A Function do Vercel usa a variável correspondente para encaminhar o
Adaptive Card ao Teams.

## Importante

Não coloque as URLs dos webhooks no `index.html` ou `config.js`. Elas devem
ficar somente nas Environment Variables do Vercel.


## Seleção de múltiplos chats

Na tela, marque **Chat 1, Chat 2 e Chat 3** ao mesmo tempo. O botão de envio
dispara uma requisição para cada chat em paralelo.

As três URLs continuam protegidas no Vercel:
- `TEAMS_WEBHOOK_CHAT1`
- `TEAMS_WEBHOOK_CHAT2`
- `TEAMS_WEBHOOK_CHAT3`

Não é necessário colocar `url` no `config.js`.
