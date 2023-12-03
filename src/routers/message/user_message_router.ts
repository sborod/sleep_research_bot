import TelegramBot from "node-telegram-bot-api";
import { OWNER_TELEGRAM_ID } from "../../constants";
import { createActor } from "xstate";
import { surveyMachine } from "../../survey_machine";

const surveyServices: any = {};

export class UserMessageRouter {
  execute(bot: TelegramBot, message: TelegramBot.Message): void {
    if (message.text === "/start") {
      if (message.from?.id) {
        if (!surveyServices[message.from.id]) {
          surveyServices[message.from.id] = createActor(surveyMachine);
          // surveyServices[message.from.id].subscribe((snapshot: any) =>
          //   console.log(snapshot.value)
          // );
          surveyServices[message.from.id].start();
          console.log(surveyServices[message.from.id].getSnapshot().value);
        }
      }
    }

    if (message.text === "/agree") {
      if (message.from?.id) {
        surveyServices[message.from.id].send({ type: "AGREE" });
        console.log(surveyServices.state);
      }
    }

    if (message.text === "/email") {
      if (message.from?.id) {
        surveyServices[message.from.id].send({ type: "SEND_EMAIL" });
        console.log(surveyServices.state);
      }
    }

    return;
    if (message.text) {
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
}
