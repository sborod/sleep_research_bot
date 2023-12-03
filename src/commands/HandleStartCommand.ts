import { AbstractCommand, ICommandContext } from "../contracts/command";

export class HandleStartCommand extends AbstractCommand {
  constructor() {
    super();
  }

  execute(context: ICommandContext): void {
    context.bot.sendMessage(
      context.message.chat.id,
      "Привет! Меня зовут Анастасия.",
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Согласиться",
                callback_data: '{"action":"agree_start"}',
              },
            ],
          ],
        },
      }
    );
  }
}
