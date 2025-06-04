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

  public execute(commandName: string, props?: any): void {
    const command = CommandFactory.createCommand(commandName, props);
    if (command) {
      command.execute();
      this.undoStack.push(command);
    }
  }

  public executeUndo(): void {
    const command = this.undoStack.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
  }

  public executeRedo(): void {
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.undoStack.push(command);
    }
  }
}
