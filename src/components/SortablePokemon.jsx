import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortablePokemon({ pokemon, activeId }) {
    const id = `${pokemon.pokemon_id}-${pokemon.form_id}`;
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id });
  
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
      };
  
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <img
          src={`/images/${pokemon.image}`}
          onError={(e) => (e.target.src = "/images/placeholder.png")}
          alt={pokemon.name}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    );
  }
  
  export default SortablePokemon;
