import {
  TldrawUiMenuContextProvider,
  TldrawUiMenuItem,
  useIsToolSelected,
  useTools,
} from "tldraw";

export default function CustomTopZone() {
  const tools = useTools();
  const isStickerSelected = useIsToolSelected(tools["sticker"]);
  const isCardSelected = useIsToolSelected(tools["card"]);
  return (
    <div className="flex gap-2 border p-1">
      <TldrawUiMenuContextProvider type="toolbar" sourceId="toolbar">
        <TldrawUiMenuItem
          {...tools["sticker"]}
          isSelected={isStickerSelected}
        />
        <TldrawUiMenuItem {...tools["card"]} isSelected={isCardSelected} />
      </TldrawUiMenuContextProvider>
    </div>
  );
}
