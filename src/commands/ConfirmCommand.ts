import { OWNER_TELEGRAM_ID } from "../constants";
import { AbstractCommand, ICommandContext } from "../contracts/command";

export class ConfirmCommand extends AbstractCommand {
  constructor() {
    super();
  }

  execute(context: ICommandContext): void {
    const { bot, message } = context;
    bot.sendMessage(
      OWNER_TELEGRAM_ID,
      JSON.stringify({
        from: {
          id: message.from?.id,
          username: message.from?.username,
        },
        text: message.text,
      })
    );
  }
}
