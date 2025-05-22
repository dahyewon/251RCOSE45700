import {
  AddTemplateShapeCommand,
  CanvasResetCommand,
  SetPropertyCommand,
  ZOrderMoveCommand,
} from "./";
import { Command } from "./Command";

interface CommandCreator {
  create(props?: any): Command;
}

class AddTemplateShapeCommandCreator implements CommandCreator {
  create(props: { shapeType: string; properties: any }): Command {
    return new AddTemplateShapeCommand(props.shapeType, props.properties);
  }
}

class CanvasResetCommandCreator implements CommandCreator {
  create(): Command {
    return new CanvasResetCommand();
  }
}

class SetPropertyCommandCreator implements CommandCreator {
  create(props: {
    shapeId: number;
    propertyName: string;
    value: any;
  }): Command {
    return new SetPropertyCommand(
      props.shapeId,
      props.propertyName,
      props.value
    );
  }
}

class ZOrderMoveCommandCreator implements CommandCreator {
  create(props: { actionType: string; shapeId: number }): Command {
    return new ZOrderMoveCommand(props.actionType, props.shapeId);
  }
}

export class CommandFactory {
  private static commandCreators: Record<string, CommandCreator> = {
    addTemplateShape: new AddTemplateShapeCommandCreator(),
    canvasReset: new CanvasResetCommandCreator(),
    setProperty: new SetPropertyCommandCreator(),
    zOrderMove: new ZOrderMoveCommandCreator(),
  };

  static createCommand(commandName: string, props: any): Command {
    const commandCreator = this.commandCreators[commandName];
    if (!commandCreator) {
      throw new Error(`Command ${commandName} not found`);
    }
    return commandCreator.create(props);
  }
}
