import { CommandType } from "../constants";
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
    [CommandType.ADD_TEMPLATE_SHAPE]: new AddTemplateShapeCommandCreator(),
    [CommandType.CANVAS_RESET]: new CanvasResetCommandCreator(),
    [CommandType.SET_PROPERTY]: new SetPropertyCommandCreator(),
    [CommandType.Z_ORDER_MOVE]: new ZOrderMoveCommandCreator(),
  };

  static createCommand(commandType: string, props: any): Command {
    const commandCreator = this.commandCreators[commandType];
    if (!commandCreator) {
      throw new Error(`Command ${commandType} not found`);
    }
    return commandCreator.create(props);
  }
}
