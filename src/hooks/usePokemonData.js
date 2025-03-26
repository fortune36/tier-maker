import { useEffect, useState } from "react";
import testData from "../data/test_pokemon.json"; // ← これ大事！

export const usePokemonData = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    console.log("読み込み確認:", testData); // ← ここで確認してみましょう！
    setPokemonList(testData);
  }, []);

  return pokemonList;
};
