import { useState } from "react";
import {
  HTMLContainer,
  Rectangle2d,
  ShapeUtil,
  TLResizeInfo,
  getDefaultColorTheme,
  resizeBox,
} from "tldraw";
import { cardShapeMigrations } from "./card-shape-migration";
import { cardShapeProps } from "./card-shape-props";
import { ICardShape } from "./card-shape-types";

// There's a guide at the bottom of this file!

export class CardShapeUtil extends ShapeUtil<ICardShape> {
  static override type = "card" as const;
  // [1]
  static override props = cardShapeProps;
  // [2]
  static override migrations = cardShapeMigrations;

  // [3]
  override isAspectRatioLocked(_shape: ICardShape) {
    return false;
  }
  override canResize(_shape: ICardShape) {
    return true;
  }

  // [4]
  getDefaultProps(): ICardShape["props"] {
    return {
      w: 300,
      h: 300,
      color: "black",
    };
  }

  // [5]
  getGeometry(shape: ICardShape) {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  // [6]
  component(shape: ICardShape) {
    const bounds = this.editor.getShapeGeometry(shape).bounds;
    const theme = getDefaultColorTheme({
      isDarkMode: this.editor.user.getIsDarkMode(),
    });

    //[a]
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [count, setCount] = useState(0);

    return (
      <HTMLContainer
        id={shape.id}
        style={{
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "all",
          backgroundColor: theme[shape.props.color].semi,
          color: theme[shape.props.color].solid,
        }}
      >
        <h2>Clicks: {count}</h2>
        <button
          // [b]
          onClick={() => setCount((count) => count + 1)}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {bounds.w.toFixed()}x{bounds.h.toFixed()}
        </button>
      </HTMLContainer>
    );
  }

  // [7]
  indicator(shape: ICardShape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }

  // [8]
  override onResize(shape: ICardShape, info: TLResizeInfo<ICardShape>) {
    return resizeBox(shape, info);
  }
}
