import { useState } from "react";
import {
  HTMLContainer,
  Rectangle2d,
  ShapeUtil,
  TLResizeInfo,
  getDefaultColorTheme,
  resizeBox,
  stopEventPropagation,
} from "tldraw";
import { cardShapeMigrations } from "./card-shape-migration";
import { cardShapeProps, ICardShape } from "./card-shape-props";
import CardTypeButtons from "./CardTypeButtons";
import CardTypePlainText from "./CardType/CardTypePlainText";
import CardTypeTodo from "./CardType/CardTypeTodo";

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

  override canEdit() {
    return true;
  }

  // [4]
  getDefaultProps(): ICardShape["props"] {
    return {
      w: 300,
      h: 300,
      color: "black",
      animal: 0,
      type: undefined,
      data: undefined,
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

    const isEditing = this.editor.getEditingShapeId() === shape.id;

    return (
      <HTMLContainer
        id={shape.id}
        onPointerDown={isEditing ? stopEventPropagation : undefined}
        style={{
          border: `2px solid ${theme[shape.props.color].solid}`,
          backgroundColor: theme[shape.props.color].semi,
          color: theme[shape.props.color].solid,
        }}
        className="overflow-hidden"
      >
        <header
          style={{
            backgroundColor: "white",
            color: theme[shape.props.color].solid,
          }}
          className="p-2 text-center font-bold"
        >
          <span className="text-2xl">hello</span>

          {shape.props.type === undefined
            ? "Select Card Type"
            : `Card ${shape.props.type}`}
        </header>
        <article className="flex flex-col p-4">
          {shape.props.type === undefined && (
            <CardTypeButtons self={this} shape={shape} />
          )}
          {shape.props.type === "text" && (
            <CardTypePlainText
              isEditing={isEditing}
              shape={shape}
              self={this}
            />
          )}
          {shape.props.type === "todo" && (
            <CardTypeTodo isEditing={isEditing} shape={shape} self={this} />
          )}
        </article>
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

  override onEditEnd(shape: ICardShape) {
    this.editor.animateShape(
      { ...shape, rotation: shape.rotation + Math.PI * 2 },
      { animation: { duration: 250 } }
    );
  }
}
