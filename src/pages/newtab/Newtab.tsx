import {
  DefaultToolbar,
  DefaultToolbarContent,
  TLComponents,
  Tldraw,
  TldrawUiMenuItem,
  TLUiOverrides,
  useIsToolSelected,
  useTools,
} from "tldraw";
import "tldraw/tldraw.css";
import { useEffect, useState } from "react";

import {
  StickerBindingUtil,
  StickerShapeUtil,
  StickerTool,
} from "./widgets/Sticker";
import { CardShapeUtil } from "./widgets/CardShape/CardShapeUtil";
import { CardShapeTool } from "./widgets/CardShape/CardShapeTool";

const shapeUtils = [StickerShapeUtil, CardShapeUtil];
const bindingUtils = [StickerBindingUtil];
const tools = [StickerTool, CardShapeTool];
const components: TLComponents = {
  Toolbar: (...props) => {
    const tools = useTools();
    const isCardSelected = useIsToolSelected(tools["card"]);
    return (
      <DefaultToolbar {...props}>
        <TldrawUiMenuItem {...tools["card"]} isSelected={isCardSelected} />
        <DefaultToolbarContent />
      </DefaultToolbar>
    );
  },
};

const overrides: TLUiOverrides = {
  tools(editor, schema) {
    // Sticker tool
    schema.sticker = {
      id: "sticker",
      label: "Sticker",
      icon: "heart-icon",
      kbd: "p",
      onSelect: () => {
        editor.setCurrentTool("sticker");
      },
    };

    // Create a tool item in the ui's context.
    schema.card = {
      id: "card",
      icon: "color",
      label: "Card",
      kbd: "c",
      onSelect: () => {
        editor.setCurrentTool("card");
      },
    };

    return schema;
  },
};

export default function Newtab() {
  const [isUsingFocusMode, setUsingFocusMode] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(["isUsingFocusMode"], (result) => {
      setUsingFocusMode(result.isUsingFocusMode);
    });
  }, [isUsingFocusMode]);

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw
        persistenceKey="example"
        shapeUtils={shapeUtils}
        bindingUtils={bindingUtils}
        tools={tools}
        overrides={overrides}
        components={components}
        onMount={(editor) => {
          editor.updateInstanceState({
            isFocusMode: isUsingFocusMode || false,
          });
        }}
      ></Tldraw>
    </div>
  );
}
