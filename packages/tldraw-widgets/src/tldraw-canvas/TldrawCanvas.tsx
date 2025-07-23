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
  StickerTool,
} from "../index";

export interface TldrawCanvasProps {
  persistenceKey?: string;
  storageType?: 'chrome' | 'localStorage';
  defaultFocusMode?: boolean;
  assetUrls?: {
    icons?: Record<string, string>;
  };
}

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

export function TldrawCanvas({ 
  persistenceKey = "example",
  storageType = 'localStorage',
  defaultFocusMode = false,
  assetUrls = {
    icons: {
      "tool-card": "/icon.svg",
    },
  }
}: TldrawCanvasProps) {
  const [usingFocusMode, setUsingFocusMode] = useState(defaultFocusMode);

  useEffect(() => {
    if (storageType === 'chrome' && typeof window !== 'undefined' && (window as any).chrome?.storage) {
      const chromeStorage = (window as any).chrome.storage;
      chromeStorage.local.get(["isUsingFocusMode"], (result: { isUsingFocusMode?: boolean }) => {
        if (result.isUsingFocusMode !== undefined) {
          setUsingFocusMode(result.isUsingFocusMode);
        }
      });
    } else if (storageType === 'localStorage' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('focusMode');
      if (saved) {
        setUsingFocusMode(JSON.parse(saved));
      }
    }
  }, [storageType]);

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw
        persistenceKey={persistenceKey}
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
        assetUrls={assetUrls}
      />
    </div>
  );
}