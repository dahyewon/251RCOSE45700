import { ImageShape, Ellipse, Line, Rectangle, Shape } from "./Shape";

interface ShapeProps {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  imageUrl?: string;
}

interface ShapeCreator {
  create(props: ShapeProps): Shape;
}

class RectangleCreator implements ShapeCreator {
  create(props: ShapeProps): Shape {
    return new Rectangle(
      props.id,
      props.startX,
      props.startY,
      props.endX,
      props.endY,
      props.color
    );
  }
}

class EllipseCreator implements ShapeCreator {
  create(props: ShapeProps): Shape {
    return new Ellipse(
      props.id,
      props.startX,
      props.startY,
      props.endX,
      props.endY,
      props.color
    );
  }
}

class LineCreator implements ShapeCreator {
  create(props: ShapeProps): Shape {
    return new Line(
      props.id,
      props.startX,
      props.startY,
      props.endX,
      props.endY,
      props.color
    );
  }
}

class ImageCreator implements ShapeCreator {
  create(props: ShapeProps & { imageUrl: string }): Shape {
    return new ImageShape(
      props.id,
      props.startX,
      props.startY,
      props.endX,
      props.endY,
      props.imageUrl
    )
  }
}


export class ShapeFactory {
  private static creators: Record<string, ShapeCreator> = {
    rectangle: new RectangleCreator(),
    ellipse: new EllipseCreator(),
    line: new LineCreator(),
    image: new ImageCreator(),
  };

  static createShape(type: string, props: ShapeProps): Shape {
    const creator = this.creators[type];
    if (!creator) throw new Error(`Unknown type shape ${type}`);
    return creator.create(props);
  }
}
