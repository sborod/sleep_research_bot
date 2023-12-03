import TelegramBot from "node-telegram-bot-api";
import { CallbackQueryRouter } from "./routers/callback_query/callback_query_router";
import { MessageRouter } from "./routers/message/message_router";

const token = process.env.TG_BOT_TOKEN || "";
const bot = new TelegramBot(token, { polling: true });

bot.on("inline_query", async (inline_query) => {
  console.log(inline_query);
});

bot.on("callback_query", async (callback_query) => {
  new CallbackQueryRouter().execute(bot, callback_query);
});

bot.on("message", async (message) => {
  new MessageRouter().execute(bot, message);
});

export default bot;
