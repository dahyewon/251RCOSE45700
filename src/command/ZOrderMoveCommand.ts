import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class ZOrderMoveCommand implements Command {
  private factory = new ZOrderMoveActionFactory();
  private action: ZOrderAction;

  constructor(
    private shapeModel: ShapeModel,
    actionType: string,
    private shapeId: number,
  ) {
    this.action = this.factory.getAction(actionType);
  }

  execute(): void {
    if (!this.action) return;
    const zOrder = this.shapeModel.getZOrder();
    const index = zOrder.indexOf(this.shapeId);
    if (index !== -1) {
      this.action.execute(zOrder, index);
    }
  }

  redo(): void {
    this.execute();
  }
  undo(): void {
    // Undo logic if needed
  }
}

interface ZOrderAction {
  execute(zOrder: number[], index: number): void;
}

class MoveForwardAction implements ZOrderAction {
  execute(zOrder: number[], index: number): void {
    if (index < zOrder.length - 1) {
      [zOrder[index], zOrder[index + 1]] = [zOrder[index + 1], zOrder[index]];
    }
  }
}

class MoveBackwardAction implements ZOrderAction {
  execute(zOrder: number[], index: number): void {
    if (index > 0) {
      [zOrder[index], zOrder[index - 1]] = [zOrder[index - 1], zOrder[index]];
    }
  }
}

class MoveToFrontAction implements ZOrderAction {
  execute(zOrder: number[], index: number): void {
    const item = zOrder.splice(index, 1)[0];
    zOrder.push(item);
  }
}

class MoveToBackAction implements ZOrderAction {
  execute(zOrder: number[], index: number): void {
    const item = zOrder.splice(index, 1)[0];
    zOrder.unshift(item);
  }
}

class ZOrderMoveActionFactory {
  private actions: Record<string, ZOrderAction> = {
    forward: new MoveForwardAction(),
    backward: new MoveBackwardAction(),
    toFront: new MoveToFrontAction(),
    toBack: new MoveToBackAction(),
  };

  getAction(action: string): ZOrderAction {
    return this.actions[action];
  }
}