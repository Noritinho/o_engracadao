import { Client, LocalAuth } from 'whatsapp-web.js';
import { EventHandler } from './events/event-handler';
import qrcode from 'qrcode-terminal';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox']
  }
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
  await EventHandler.OnStart(client);
});

console.log(process.env.BOT_KEY)

// ==== SERVIDOR FAKE PARA ABRIR UMA PORTA ====
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Bot está rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor web rodando na porta ${PORT}`);
});

client.initialize();