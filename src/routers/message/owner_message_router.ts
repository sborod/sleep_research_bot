import TelegramBot from "node-telegram-bot-api";

export class OwnerMessageRouter {
  execute(bot: TelegramBot, message: TelegramBot.Message): void {
    if (message.reply_to_message?.text) {
      try {
        const json = JSON.parse(message.reply_to_message.text);
        if (message.text) {
          bot.sendMessage(json.from.id, message.text);
        }
      } catch (e) {
        console.log("Bad reply");
      }
    }
  }
}
