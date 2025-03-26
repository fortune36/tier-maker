export const createHandleDragEnd = (tiers, setTiers, setActivePokemon, setActiveId) => (event) => {
    const { active, over } = event;
    const activeId = active?.id;
    const overId = over?.id;
  
    console.log("📦 Drag End Event:");
    console.log("➡ activeId:", activeId);
    console.log("➡ overId:", overId);
  
    if (!over || activeId === overId) {
      console.log("⛔ overが存在しないか、同一ID — 操作スキップ");
      setActiveId(null);
      setActivePokemon(null);
      return;
    }
  
    const fromTierId = findTierId(tiers, activeId);
    const toTierId = findTierId(tiers, overId) ?? overId;
  
    console.log("🔍 fromTierId:", fromTierId, "→ toTierId:", toTierId);
  
    if (!fromTierId || !toTierId) {
      console.log("⛔ Tier IDの特定に失敗");
      return;
    }
  
    const activePokemon = findPokemon(tiers, activeId);
    if (!activePokemon) {
      console.log("⛔ activePokemonが見つかりません");
      return;
    }
  
    const newTiers = { ...tiers };
  
    if (fromTierId === toTierId) {
      // ✅ Tier内並び替え（動的補正判定）
      const tierList = newTiers[toTierId].pokemons;
      const initialOrder = tierList.map(p => `${p.pokemon_id}-${p.form_id}`);
      const newList = [];
  
      console.log("🧪 activeId:", activeId);
      console.log("🧪 overId:", overId);
      console.log("🧪 並び替え対象 Tier:", toTierId);
      console.log("🧪 並び替え前リスト:", initialOrder);
  
      let activeSeen = false;
      let inserted = false;
  
      for (let i = 0; i < tierList.length; i++) {
        const p = tierList[i];
        const id = `${p.pokemon_id}-${p.form_id}`;
  
        if (id === activeId) {
          activeSeen = true;
          continue; // skip削除
        }
  
        if (!inserted && id === overId) {
          if (activeSeen) {
            // activeが先に出現 → 後に入れる
            console.log("🧪 挿入位置（後）で active を追加:", activeId);
            newList.push(p);
            newList.push(activePokemon);
          } else {
            // activeがまだ → 前に入れる
            console.log("🧪 挿入位置（前）で active を追加:", activeId);
            newList.push(activePokemon);
            newList.push(p);
          }
          inserted = true;
          continue;
        }
  
        newList.push(p);
      }
  
      if (!inserted) {
        console.log("🧪 挿入されていなかったので末尾に追加:", activeId);
        newList.push(activePokemon);
      }
  
      newTiers[toTierId].pokemons = newList;
  
      console.log("📝 並び替え後:", newList.map(p => `${p.pokemon_id}-${p.form_id}`));
    } else {
      // ✅ Tier間移動
      newTiers[fromTierId].pokemons = newTiers[fromTierId].pokemons.filter(
        (p) => `${p.pokemon_id}-${p.form_id}` !== activeId
      );
  
      const toList = [...newTiers[toTierId].pokemons];
      const targetIndex = toList.findIndex(
        (p) => `${p.pokemon_id}-${p.form_id}` === overId
      );
  
      if (targetIndex >= 0) {
        toList.splice(targetIndex, 0, activePokemon);
      } else {
        toList.push(activePokemon);
      }
  
      newTiers[toTierId].pokemons = toList;
  
      console.log("📝 Tier間移動後:", toList.map(p => `${p.pokemon_id}-${p.form_id}`));
    }
  
    setTiers(newTiers);
    setActivePokemon(null);
    setActiveId(null);
  };
  
  // 🔍 Tier ID を取得
  function findTierId(tiers, id) {
    for (const [tierId, tier] of Object.entries(tiers)) {
      if (tier.pokemons.some((p) => `${p.pokemon_id}-${p.form_id}` === id)) {
        return tierId;
      }
    }
    return null;
  }
  
  // 🔍 ポケモンを取得
  function findPokemon(tiers, id) {
    for (const tier of Object.values(tiers)) {
      const found = tier.pokemons.find(
        (p) => `${p.pokemon_id}-${p.form_id}` === id
      );
      if (found) return found;
    }
    return null;
  }
  