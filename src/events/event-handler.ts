import { Client, LocalAuth } from 'whatsapp-web.js';
import * as fs from "fs";
import * as path from "path";
import cron from "node-cron";
import dotenv from "dotenv";
dotenv.config();

export abstract class EventHandler {
    static async OnStart(client: Client) {

        const TARGET_CHAT_ID = `${process.env.TARGET_CHAT_ID}`;
        const TARGET_USER_ID = `${process.env.TARGET_USER_ID}`;

        const CRON_SCHEDULE =  process.env.CRON_SCHEDULE ? `${process.env.CRON_SCHEDULE}` : "*/1 * * * *";

    cron.schedule(CRON_SCHEDULE, async () => {
      await EventHandler.xingar(client, TARGET_CHAT_ID, TARGET_USER_ID);
    });
  }

    private static async xingar(client: Client, TARGET_CHAT_ID: string, TARGET_USER_ID: string) {
        try {
            const userMention = `@${TARGET_USER_ID.replace('@c.us', '')}`;

            await client.sendMessage(
                TARGET_CHAT_ID,
                `${userMention} você é ${this.getRandomMessage()}!`,
                {
                    mentions: [TARGET_USER_ID]
                });
            } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
        }}

  static getRandomMessage(): string {
    const xingamentos = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), "src/xingamentos.json"), {
        encoding: "utf-8",
      })
    ).palavras as string[];

    const randomIndex = Math.floor(Math.random() * xingamentos.length);
    return xingamentos[randomIndex];
  }
}