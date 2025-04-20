import { DefaultColorStyle, RecordProps, T } from "tldraw";
import { TLBaseShape, TLDefaultColorStyle } from "tldraw";

// A type for our custom card shape
export type ICardShape = TLBaseShape<
  "card",
  {
    w: number;
    h: number;
    color: TLDefaultColorStyle;
    animal: number;
    type?: string;
    data?: string;
  }
>;

// Validation for our custom card shape's props, using one of tldraw's default styles
export const cardShapeProps: RecordProps<ICardShape> = {
  w: T.number,
  h: T.number,
  color: DefaultColorStyle,
  animal: T.number,
  type: T.optional(T.string),
  data: T.optional(T.string),
};
