import DroppableTier from "./DroppableTier";

function TierBoard({ tiers, activeId }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {Object.entries(tiers)
          .filter(([tierId]) => tierId !== "tier-Z")
          .map(([tierId, tier]) => (
            <DroppableTier
              key={tierId}
              tierId={tierId}
              label={tier.label}
              pokemons={tier.pokemons}
              activeId={activeId}  // ← ✅ ここでも渡す！
            />
          ))}
      </div>
    );
  }

export default TierBoard;
