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
import { cardShapeProps } from "./card-shape-props";
import { ICardShape } from "./card-shape-types";

// There's a guide at the bottom of this file!
const ANIMAL_EMOJIS = ["🐶", "🐱", "🐨", "🐮", "🐴"];

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
          Card Name
        </header>
        <article className="flex flex-col items-center justify-center p-4">
          <div
            className="border-1 border-black rounded-md p-4 w-full mx-2"
            style={{
              pointerEvents: isEditing ? "all" : "none",
            }}
          >
            <p>isEditing: {JSON.stringify(isEditing)}</p>
            {ANIMAL_EMOJIS[shape.props.animal]}
            {isEditing ? (
              <button
                onClick={() => {
                  this.editor.updateShape({
                    id: shape.id,
                    type: shape.type,
                    props: {
                      ...shape.props,
                      animal: (shape.props.animal + 1) % ANIMAL_EMOJIS.length,
                    },
                  });
                }}
              >
                Next
              </button>
            ) : (
              <div>
                <p style={{ fontSize: 12 }}>Double Click to Edit</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Ipsum placeat consequatur soluta accusantium iure reiciendis
                  est, nihil quae temporibus, repudiandae perspiciatis modi
                  libero hic? Eum voluptatibus maxime in tenetur iste?
                </p>
              </div>
            )}
          </div>

          <div
            style={{
              pointerEvents: "all",
            }}
          >
            {/* button click section */}
            <div className="flex gap-2 m-2 items-center justify-center">
              <h2>Clicks: {count}</h2>
              <button
                className="bg-white text-black rounded-md p-2"
                onClick={() => setCount((count) => count + 1)}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {bounds.w.toFixed()}x{bounds.h.toFixed()}
              </button>
            </div>
          </div>
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
