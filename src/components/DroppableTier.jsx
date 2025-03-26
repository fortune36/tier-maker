import { useDroppable } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import SortablePokemon from "./SortablePokemon";

function DroppableTier({ tierId, label, pokemons, activeId, onPokemonClick, isDragging }) {
  const { setNodeRef, isOver } = useDroppable({ id: tierId });

  const isUnranked = tierId === "tier-Z";
  const displayPokemons = isUnranked
    ? [...pokemons].sort((a, b) => a.dex - b.dex)
    : [...pokemons];

  const getPokemonId = (p) => `${p.pokemon_id}-${p.form_id}`;
  const items = displayPokemons.map(getPokemonId);
  const isSameTier = activeId && pokemons.some((p) => getPokemonId(p) === activeId);
  const backgroundColor = isOver || isSameTier ? "#FEF3C7" : "#F3F4F6";

  return (
    <div style={{ width: "100%", marginBottom: "16px" }}>
      <h2 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "4px" }}>{label}</h2>

      <div
        ref={setNodeRef}
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          gap: "6px",
          overflowX: "auto",
          padding: "4px",
          minHeight: "50px",
          backgroundColor,
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      >
        {isUnranked ? (
          displayPokemons.map((pokemon) => (
            <SortablePokemon
              key={getPokemonId(pokemon)}
              pokemon={pokemon}
              activeId={activeId}
              onClick={() => onPokemonClick?.(pokemon)}
              isDragging={isDragging} // ✅ 追加！
            />
          ))
        ) : (
          <SortableContext items={items} strategy={horizontalListSortingStrategy}>
            {displayPokemons.map((pokemon) => (
              <SortablePokemon
                key={getPokemonId(pokemon)}
                pokemon={pokemon}
                activeId={activeId}
                onClick={() => {
                  console.log("[📦 DroppableTier] ポケモン選択:", pokemon.name);
                  onPokemonClick?.(pokemon);
                }}
                isDragging={isDragging} // ✅ 追加！
              />
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  );
}

export default DroppableTier;
