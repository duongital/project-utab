import { TldrawCanvas as SharedTldrawCanvas } from "@utab/tldraw-widgets";

export default function TldrawCanvas() {
  return (
    <SharedTldrawCanvas
      persistenceKey="web-example"
      storageType="localStorage"
      defaultFocusMode={true}
      assetUrls={{
        icons: {
          "tool-card": "/icon.svg",
        },
      }}
    />
  );
}
