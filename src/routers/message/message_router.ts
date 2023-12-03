import TelegramBot from "node-telegram-bot-api";
import { OWNER_TELEGRAM_ID } from "../../constants";
import { UserMessageRouter } from "./user_message_router";
import { OwnerMessageRouter } from "./owner_message_router";

export class MessageRouter {
  execute(bot: TelegramBot, message: TelegramBot.Message): void {
    // console.log(message);

    if (message.from?.id !== OWNER_TELEGRAM_ID) {
      new UserMessageRouter().execute(bot, message);
    }

    if (message.from?.id === OWNER_TELEGRAM_ID) {
      new OwnerMessageRouter().execute(bot, message);
    }
  }
}
