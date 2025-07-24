import { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
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
        <label className="flex items-center">
          <Checkbox.Root
            className="mr-2 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white border border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            checked={checkedItems.a || false}
            onCheckedChange={() => handleCheckboxChange("a")}
          >
            <Checkbox.Indicator className="text-white">
              <svg
                width="10"
                height="8"
                viewBox="0 0 10 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 1L3.5 6.5L1 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Checkbox.Indicator>
          </Checkbox.Root>
          drink water
        </label>
        <label className="flex items-center">
          <Checkbox.Root
            className="mr-2 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white border border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            checked={checkedItems.b || false}
            onCheckedChange={() => handleCheckboxChange("b")}
          >
            <Checkbox.Indicator className="text-white">
              <svg
                width="10"
                height="8"
                viewBox="0 0 10 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 1L3.5 6.5L1 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Checkbox.Indicator>
          </Checkbox.Root>
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
