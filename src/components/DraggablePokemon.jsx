import { useDraggable } from "@dnd-kit/core";
import { useClickGuard } from "../utils/useClickGuard";

function DraggablePokemon({ pokemon, onClick, isDragging }) {
  const id = `${pokemon.pokemon_id}-${pokemon.form_id}`;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const { handlePointerDown, handlePointerUp } = useClickGuard(
    () => {
      console.log("[🖱️ Draggable Click判定]", pokemon.name);
      onClick?.(pokemon);
    },
    () => {
      console.log("[🚚 Draggable Drag判定]", pokemon.name);
    },
    isDragging
  );

  const style = {
    width: "40px",
    height: "40px",
    flexShrink: 0,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    touchAction: "none",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#fff",
    pointerEvents: "auto",
    cursor: "pointer",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <img
        src={`/images/${pokemon.image}`}
        alt={pokemon.name}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onError={(e) => (e.target.src = "/images/placeholder.png")}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
}

export default DraggablePokemon;
