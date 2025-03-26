import { useEffect, useRef, useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { relaxedCollisionDetection } from "./utils/customCollisionDetection";
import { usePokemonData } from "./hooks/usePokemonData";
import TierBoard from "./components/TierBoard";
import DroppableTier from "./components/DroppableTier";
import DraggablePokemon from "./components/DraggablePokemon";
import { createHandleDragEnd } from "./handlers/createHandleDragEnd";

function App() {
  const initialPokemons = usePokemonData();

  const initialTiers = {
    "tier-S": { label: "Sランク", pokemons: [] },
    "tier-A": { label: "Aランク", pokemons: [] },
    "tier-B": { label: "Bランク", pokemons: [] },
    "tier-C": { label: "Cランク", pokemons: [] },
    "tier-D": { label: "Dランク", pokemons: [] },
    "tier-E": { label: "Eランク", pokemons: [] },
    "tier-Z": { label: "未分類", pokemons: initialPokemons },
  };

  const [tiers, setTiers] = useState(initialTiers);
  const [activePokemon, setActivePokemon] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const lastHandledIdRef = useRef(null);

  useEffect(() => {
    if (initialPokemons.length > 0) {
      setTiers((prev) => ({
        ...prev,
        "tier-Z": {
          ...prev["tier-Z"],
          pokemons: initialPokemons,
        },
      }));
    }
  }, [initialPokemons]);

  const handleDragStart = (event) => {
    const id = event.active.id;
    setActiveId(id);

    for (const tier of Object.values(tiers)) {
      const found = tier.pokemons.find(
        (p) => `${p.pokemon_id}-${p.form_id}` === id
      );
      if (found) {
        setActivePokemon(found);
        break;
      }
    }
  };

  const handleDragEnd = createHandleDragEnd(tiers, setTiers, setActivePokemon, setActiveId);

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={relaxedCollisionDetection}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">ポケモンキャラランクメーカー</h1>

        <TierBoard tiers={tiers} activeId={activeId} />

        <div className="mt-8 border-t pt-4">
          <DroppableTier
            tierId="tier-Z"
            label="未分類"
            pokemons={tiers["tier-Z"].pokemons}
            activeId={activeId}
          />
        </div>
      </div>

      <DragOverlay>
        {activePokemon ? <DraggablePokemon pokemon={activePokemon} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
