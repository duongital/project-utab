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
import Logo from "@assets/img/icon.svg";

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
  const [usingFocusMode, setUsingFocusMode] = useState(true);

  useEffect(() => {
    chrome.storage.local.get(["isUsingFocusMode"], (result) => {
      if (result.isUsingFocusMode !== undefined) {
        setUsingFocusMode(result.isUsingFocusMode);
      }
    });
  }, []);

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
            isFocusMode: usingFocusMode,
          });
        }}
        assetUrls={{
          icons: {
            "tool-card": "/icon.svg",
          },
        }}
      ></Tldraw>
    </div>
  );
}
