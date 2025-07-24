import { useState } from "react";
import { ICardShape } from "../card-shape-props";

interface CardTypeTodoProps {
  isEditing: boolean;
  shape: ICardShape;
  self: any;
}

export default function CardTypeTodo({
  isEditing,
  shape,
  self,
}: CardTypeTodoProps) {
  // There's a guide at the bottom of this file!
  const ANIMAL_EMOJIS = ["🐶", "🐱", "🐨", "🐮", "🐴"];

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (name: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <>
      <p>card todo goes here</p>
      <div
        style={{
          pointerEvents: "all",
        }}
        className="flex flex-col"
      >
        <label>
          <input
            className="mr-2"
            type="checkbox"
            name="a"
            value="a"
            checked={checkedItems.a || false}
            onChange={() => handleCheckboxChange("a")}
          />
          drink water
        </label>
        <label>
          <input
            className="mr-2"
            type="checkbox"
            name="b"
            value="b"
            checked={checkedItems.b || false}
            onChange={() => handleCheckboxChange("b")}
          />
          learn Python
        </label>
      </div>

      <div
        style={{
          pointerEvents: isEditing ? "all" : "none",
        }}
      >
        {ANIMAL_EMOJIS[shape.props.animal]}
        {isEditing ? (
          <button
            onClick={() => {
              self.editor.updateShape({
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
            <p className="font-bold">Double Click to Edit</p>
          </div>
        )}
      </div>
    </>
  );
}
