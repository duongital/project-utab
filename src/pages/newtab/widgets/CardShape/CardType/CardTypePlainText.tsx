import { useEffect, useRef } from "react";
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
        <textarea
          ref={textareaRef}
          className="bg-white rounded-md p-4 w-full my-2"
          cols={10}
          rows={8}
          style={{
            pointerEvents: isEditing ? "all" : "none",
          }}
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
      )}
      {!isEditing && <p>{shape.props.data}</p>}
    </article>
  );
}
