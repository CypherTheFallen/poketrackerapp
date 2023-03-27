import { PokemonInfo, pokemonData } from '../data/pokemon';
import { NoPokemonFound } from './NoPokemonFound';
import { PokemonCard } from './PokemonCard';


type Props = {
  pokemon: PokemonInfo[] | null
}

export const PokemonGrid = (props: Props) => {
  

  
  return (
    <div className="grid gap-8 grid-flow-row-dense grid-cols-3 grid-rows-auto ...">
      {
        props.pokemon === null &&
        pokemonData.map(pokemon => <PokemonCard pokemon={ pokemon } />)
      }
      {
        props.pokemon !== null && props.pokemon.length > 0 &&
        props.pokemon.map(pokemon => <PokemonCard pokemon={ pokemon } />)
      }
      {
        props.pokemon !== null && props.pokemon.length === 0 &&
        <NoPokemonFound />
      }
    </div>
  );
};
