import { ICardShape } from "./card-shape-props";

interface CardTypeButtonsProps {
  self: any;
  shape: ICardShape;
}

export default function CardTypeButtons({ self, shape }: CardTypeButtonsProps) {
  return (
    <>
      {/* buttons group to select card type */}
      <div
        style={{
          pointerEvents: "all",
        }}
        className="flex flex-col gap-2"
      >
        <button
          onClick={() => {
            self.editor.updateShape({
              id: shape.id,
              type: shape.type,
              props: {
                ...shape.props,
                type: "text",
              },
            });
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="bg-white p-1 rounded-sm cursor-pointer"
        >
          + plain text
        </button>
        <button
          onClick={() => {
            self.editor.updateShape({
              id: shape.id,
              type: shape.type,
              props: {
                ...shape.props,
                type: "todo",
              },
            });
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="bg-white p-1 rounded-sm cursor-pointer"
        >
          + todo list
        </button>
        <button
          onClick={() => window.alert("coming soon...")}
          onPointerDown={(e) => e.stopPropagation()}
          className="bg-white p-1 rounded-sm cursor-pointer"
        >
          + timer
        </button>
      </div>
    </>
  );
}
