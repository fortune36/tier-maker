import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableTier({ tierId, label, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tierId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    border: "2px solid #ccc",
    borderRadius: "8px",
    padding: "8px",
    backgroundColor: "#fff",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h2 style={{ fontWeight: "bold", marginBottom: "4px" }}>{label}</h2>
      {children}
    </div>
  );
}

export default SortableTier;
