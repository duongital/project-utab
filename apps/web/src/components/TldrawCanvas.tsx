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
  CardShapeUtil,
  CardShapeTool,
  StickerShapeUtil,
  StickerBindingUtil,
  StickerTool
} from "@utab/tldraw-widgets";

const shapeUtils = [StickerShapeUtil, CardShapeUtil];
const bindingUtils = [StickerBindingUtil];
const tools = [StickerTool, CardShapeTool];

const components: TLComponents = {
  Toolbar: (...props) => {
    const tools = useTools();
    const isCardSelected = useIsToolSelected(tools["card"]);
    return (
      <DefaultToolbar {...props}>
        <TldrawUiMenuItem
          {...tools["card"]}
          isSelected={isCardSelected}
          icon="tool-card"
        />
        <DefaultToolbarContent />
      </DefaultToolbar>
    );
  },
};

const overrides: TLUiOverrides = {
  tools(editor, schema) {
    schema.sticker = {
      id: "sticker",
      label: "Sticker",
      icon: "heart-icon",
      kbd: "p",
      onSelect: () => {
        editor.setCurrentTool("sticker");
      },
    };

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

export default function TldrawCanvas() {
  const [usingFocusMode, setUsingFocusMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('focusMode');
    if (saved) {
      setUsingFocusMode(JSON.parse(saved));
    }
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw
        persistenceKey="web-example"
        shapeUtils={shapeUtils}
        bindingUtils={bindingUtils}
        tools={tools}
        overrides={overrides}
        components={components}
        onMount={(editor) => {
          editor.updateInstanceState({
            isFocusMode: usingFocusMode,
          });
        }}
        assetUrls={{
          icons: {
            "tool-card": "/icon.svg",
          },
        }}
      />
    </div>
  );
}