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

  public execute(commandName: string, ...args: any[]): void {
    const command = CommandFactory.createCommand(commandName, { args });
    if (command) {
      command.execute();
      this.undoStack.push(command);
    }
  }
}
