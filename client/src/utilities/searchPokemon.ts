import { pokemonData } from "../data/pokemon";
import { types } from "../data/types";


export const searchByName = (name: string) => pokemonData.filter(pokemon => pokemon.name.startsWith(name));

export const searchByDexNumber = (number: string) => pokemonData.filter(pokemon => pokemon.dex_number.toString().startsWith(number));

export const searchByType = (type1: string = 'all', type2: string = 'all') => {
  if (type1 !== 'all' && type2 === 'all') { // Search all pokemon by primary type
    return pokemonData.filter(pokemon => pokemon.type_1 === type1);
  } else if (type1 !== 'all' && type2 !== 'all') { // Search all pokemon by primary and secondary type
    if (type1 === type2) { // If primary and secondary types are the same, return all pokemon with either primary or secondary type equal to search value
      const type1Pokemon = pokemonData.filter(pokemon => pokemon.type_1 == type1);
      const type2Pokemon = pokemonData.filter(pokemon => pokemon.type_2 === type2);

      return [...type1Pokemon, ...type2Pokemon];
    }
    return pokemonData.filter(pokemon => pokemon.type_1 === type1 && pokemon.type_2 === type2);
  } else if (type1 === 'all' && type2 !== 'all') { // Search all pokemon by secondary type
    return pokemonData.filter(pokemon => pokemon.type_2 === type2);
  }
  
  return pokemonData;
}

export const getTotalPokemon = () => pokemonData.length;

export const getTypeImgLink = (typeName: string) => types.find(type => type.name === typeName)?.image_url
