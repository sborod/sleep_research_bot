import { ICommandsMap } from "./contracts/command";
import { ConfirmCommand } from "./commands/ConfirmCommand";
import { HandleStartCommand } from "./commands/HandleStartCommand";

export const CommandsMap: ICommandsMap = {
  start_command: new HandleStartCommand(),
  confirm: new ConfirmCommand(),
};
