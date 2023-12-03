import TelegramBot from "node-telegram-bot-api";

export interface ICommandContext {
  bot: TelegramBot;
  message: TelegramBot.Message;
}

export abstract class AbstractCommand {
  abstract execute(context: ICommandContext): void;
}

export interface ICommandsMap {
  [key: string]: AbstractCommand;
}
