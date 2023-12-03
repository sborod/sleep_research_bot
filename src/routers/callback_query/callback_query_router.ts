import TelegramBot from "node-telegram-bot-api";

export class CallbackQueryRouter {
  execute(bot: TelegramBot, callback_query: TelegramBot.CallbackQuery): void {
    console.log(callback_query);
    if (callback_query.data) {
      try {
        const data = JSON.parse(callback_query.data);
        if (data.action === "agree_start") {
          bot.sendMessage(callback_query.from.id, "Напишите вашу почту:");
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
