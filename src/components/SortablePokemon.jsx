import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useClickGuard } from "../utils/useClickGuard";

function SortablePokemon({ pokemon, activeId, onClick, isDragging }) {
  const id = `${pokemon.pokemon_id}-${pokemon.form_id}`;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const { handlePointerDown, handlePointerUp } = useClickGuard(
    () => {
      console.log("[🖱️ Click判定]", pokemon.name);
      onClick?.(pokemon);
    },
    () => {
      console.log("[🚚 Drag判定]", pokemon.name);
    },
    isDragging
  );

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: id === activeId ? 0 : 1,
    pointerEvents: id === activeId ? "none" : "auto",
    width: "40px",
    height: "40px",
    flexShrink: 0,
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    borderRadius: "4px",
    touchAction: "none",
    cursor: "pointer",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      // 🟡 dnd-kit の listeners を展開
      {...attributes}
      {...listeners}
      // 🟢 pointerDownを別で併用（drag優先を壊さない）
      onPointerDown={(e) => {
        listeners?.onPointerDown?.(e); // ← dnd-kit に先に通知
        handlePointerDown(e); // ← クリック判定ロジック
      }}
    >
      <img
        src={`/images/${pokemon.image}`}
        alt={pokemon.name}
        onLoad={() => console.log("[🖼️ 成功]", pokemon.image)}
        onError={(e) => {
          console.error("[🧨 エラー]", pokemon.name, pokemon.image);
          e.target.src = "/images/placeholder.png";
        }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain"
        }}
      />
    </div>
  );
}

export default SortablePokemon;
