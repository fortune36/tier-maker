import { useDroppable } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import SortablePokemon from "./SortablePokemon";

function DroppableTier({ tierId, label, pokemons, activeId }) {
  const { setNodeRef, isOver } = useDroppable({ id: tierId });

  // 未分類だけ並び替え禁止、dex順で固定ソート
  const isUnranked = tierId === "tier-Z";
  const displayPokemons = isUnranked
    ? [...pokemons].sort((a, b) => a.dex - b.dex)
    : [...pokemons];

  const getPokemonId = (p) => `${p.pokemon_id}-${p.form_id}`;
  const items = displayPokemons.map(getPokemonId);

  const isSameTier = activeId && pokemons.some((p) => getPokemonId(p) === activeId);

  const backgroundColor = isOver || isSameTier ? "#FEF3C7" : "#F3F4F6";

  // 干渉したTierのみログ出力（実際の描画順で表示）
  if (isOver || isSameTier) {
    //console.log(`📦 [${label}] 並び順:`, displayPokemons.map(getPokemonId));
    if (activeId) {
      //console.log(`🎯 activeId: ${activeId}, tierId: ${tierId}`);
    }
  }

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
            />
          ))
        ) : (
          <SortableContext items={items} strategy={horizontalListSortingStrategy}>
            {displayPokemons.map((pokemon) => (
              <SortablePokemon
                key={getPokemonId(pokemon)}
                pokemon={pokemon}
                activeId={activeId}
              />
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  );
}

export default DroppableTier;
