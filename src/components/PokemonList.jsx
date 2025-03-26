import { usePokemonData } from "../hooks/usePokemonData";

function PokemonList() {
  const pokemonList = usePokemonData();

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {pokemonList.map((pokemon) => {
        const imageSrc = `/images/${pokemon.image}`;
        console.log("画像パス:", imageSrc); // ← ここでログ出力！

        return (
          <div key={`${pokemon.pokemon_id}-${pokemon.form_id}`}>
            <img
              src={imageSrc}
              onError={(e) => (e.target.src = "/images/placeholder.png")}
              alt={pokemon.name}
              className="w-12 h-12 object-contain"
            />
          </div>
        );
      })}
    </div>
  );
}

export default PokemonList;
