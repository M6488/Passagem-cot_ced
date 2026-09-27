// Configuração pública: não coloque URLs de webhook aqui.
// As URLs ficam protegidas nas Environment Variables do Vercel.
const TEAMS_CONFIG = {
  USE_PROXY: true,
  CHATS: [
    { id: 'chat1', name: 'Chat 1' },
    { id: 'chat2', name: 'Chat 2' },
    { id: 'chat3', name: 'Chat 3' }
  ]
};
