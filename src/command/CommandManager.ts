import { Command } from "./Command";
import { CommandFactory } from "./CommandFactory";

export class CommandManager {
  private static instance: CommandManager;
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  public static getInstance(): CommandManager {
    if (!CommandManager.instance) {
      CommandManager.instance = new CommandManager();
    }
    return CommandManager.instance;
  }

  public execute(commandName: string, ...props: any): void {
    const command = CommandFactory.createCommand(commandName, { props });
    if (command) {
      command.execute();
      this.undoStack.push(command);
    }
  }
}
