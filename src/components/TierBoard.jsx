import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableTier from "./SortableTier";
import DroppableTier from "./DroppableTier";

function TierBoard({ tiers, tierOrder, activeId, onPokemonClick, isDragging }) {
  return (
    <SortableContext items={tierOrder} strategy={verticalListSortingStrategy}>
      {tierOrder.map((tierId) => (
        <SortableTier key={tierId} tierId={tierId} label={tiers[tierId].label}>
          <DroppableTier
            tierId={tierId}
            label={tiers[tierId].label}
            pokemons={tiers[tierId].pokemons}
            activeId={activeId}
            onPokemonClick={onPokemonClick}
            isDragging={isDragging} // ✅ 追加！
          />
        </SortableTier>
      ))}
    </SortableContext>
  );
}

export default TierBoard;
