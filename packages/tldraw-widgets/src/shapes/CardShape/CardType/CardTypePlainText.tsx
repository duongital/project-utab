import { useEffect, useRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { ICardShape } from "../card-shape-props";

interface CardTypePlainTextProps {
  isEditing: boolean;
  shape: ICardShape;
  self: any;
}

export default function CardTypePlainText({
  isEditing,
  shape,
  self,
}: CardTypePlainTextProps) {
  // useRef to focus on textarea when isEditing is true
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      // Move cursor to the end of the textarea
      const value = textareaRef.current.value;
      textareaRef.current.setSelectionRange(value.length, value.length);
    }
  }, [isEditing]);

  return (
    <article>
      {/* <p>inside is editting: {JSON.stringify(isEditing)}</p> */}
      {shape.props.data === undefined && <p>Double click to edit</p>}
      {isEditing && (
        <Slot
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white p-4 my-2"
          style={{
            pointerEvents: isEditing ? "all" : "none",
          }}
        >
          <textarea
            ref={textareaRef}
            cols={10}
            rows={8}
            value={shape.props.data}
            onChange={(event) => {
              console.log(event.target.value);
              self.editor.updateShape({
                id: shape.id,
                type: shape.type,
                props: {
                  ...shape.props,
                  data: event.target.value,
                },
              });
            }}
          />
        </Slot>
      )}
      {!isEditing && <p>{shape.props.data}</p>}
    </article>
  );
}
