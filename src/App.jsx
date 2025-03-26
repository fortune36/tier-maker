import { useEffect, useRef, useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { relaxedCollisionDetection } from "./utils/customCollisionDetection";
import { usePokemonData } from "./hooks/usePokemonData";
import TierBoard from "./components/TierBoard";
import DroppableTier from "./components/DroppableTier";
import DraggablePokemon from "./components/DraggablePokemon";
import PokemonDialog from "./components/PokemonDialog";
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
  const [tierOrder, setTierOrder] = useState([
    "tier-S",
    "tier-A",
    "tier-B",
    "tier-C",
    "tier-D",
    "tier-E",
  ]);

  const [activePokemon, setActivePokemon] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // ✅ ドラッグ状態管理

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

  useEffect(() => {
    if (selectedPokemon) {
      console.log("[📋 App] Dialogを表示：", selectedPokemon.name);
    }
  }, [selectedPokemon]);

  const handleClickPokemon = (pokemon) => {
    // ✅ フォーカスを外してからDialogを表示（←これが重要）
    if (typeof document !== "undefined") {
      document.activeElement?.blur();
    }
  
    console.log("[📋 App] ポケモンがクリックされました:", pokemon.name);
    setSelectedPokemon(pokemon);
    setActiveId(null);
  };
  

  const handleDragStart = (event) => {
    const id = event.active.id;
    console.log("[🐞 Drag Start]", id);
    setActiveId(id);
    setIsDragging(true); // ✅ ドラッグ開始！

    // すべてのtierを検索して対象ポケモンを取得
    let found = null;
    for (const tierId in tiers) {
      const tier = tiers[tierId];
      found = tier.pokemons.find(
        (p) => `${p.pokemon_id}-${p.form_id}` === id
      );
      if (found) break;
    }

    if (found) {
      console.log("[✅ handleDragStart] 対象ポケモン:", found.name);
      setActivePokemon(found);
    } else {
      console.warn("[⚠️ handleDragStart] 対象ポケモンが見つかりません:", id);
      setActivePokemon(null);
    }
  };

  const handleDragEnd = (event) => {
    setIsDragging(false); // ✅ ドラッグ終了
    const { active, over } = event;

    if (!over || active.id === over.id) {
      console.log("⛔ overが存在しないか、同一ID — 操作スキップ");
      return;
    }

    if (active.id.startsWith("tier-") && over.id.startsWith("tier-")) {
      const oldIndex = tierOrder.indexOf(active.id);
      const newIndex = tierOrder.indexOf(over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(tierOrder, oldIndex, newIndex);
        console.log("✅ Tier並び替え:", newOrder);
        setTierOrder(newOrder);
      }
      return;
    }

    // ポケモン移動
    createHandleDragEnd(tiers, setTiers, setActivePokemon, setActiveId)(event);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={relaxedCollisionDetection}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">ポケモンキャラランクメーカー</h1>

        <TierBoard
          tiers={tiers}
          tierOrder={tierOrder}
          activeId={activeId}
          onPokemonClick={handleClickPokemon}
          isDragging={isDragging} // ✅ 追加！
        />

        <div className="mt-8 border-t pt-4">
          <DroppableTier
            tierId="tier-Z"
            label="未分類"
            pokemons={tiers["tier-Z"].pokemons}
            activeId={activeId}
            onPokemonClick={handleClickPokemon}
            isDragging={isDragging} // ✅ 追加！
          />
        </div>
      </div>

      <DragOverlay>
        {activePokemon ? (
          <DraggablePokemon
            pokemon={activePokemon}
            onClick={handleClickPokemon}
            isDragging={isDragging}
          />
        ) : null}
      </DragOverlay>

      {selectedPokemon && (
        <PokemonDialog
          pokemon={selectedPokemon}
          onClose={() => {
            console.log("[❌ Dialog] 閉じるクリック");
            setSelectedPokemon(null);
          }}
        />
      )}
    </DndContext>
  );
}

export default App;
