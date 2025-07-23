import { TldrawCanvas } from "@utab/tldraw-widgets";

export default function Newtab() {
  return (
    <TldrawCanvas
      persistenceKey="example"
      storageType="chrome"
      defaultFocusMode={true}
      assetUrls={{
        icons: {
          "tool-card": "/icon.svg",
        },
      }}
    />
  );
}
