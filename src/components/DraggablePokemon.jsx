import { useDraggable } from "@dnd-kit/core";

function DraggablePokemon({ pokemon }) {
  const id = `${pokemon.pokemon_id}-${pokemon.form_id}`;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

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
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <img
            src={`/images/${pokemon.image}`}
            onError={(e) => (e.target.src = "/images/placeholder.png")}
            alt={pokemon.name}
            style={{ width: "40px", height: "40px", objectFit: "contain" }}
        />
    </div>
  );
}

export default DraggablePokemon;
