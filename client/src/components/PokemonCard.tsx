import { PokemonInfo } from "../data/pokemon";
import { useCaughtPokemonStore } from '../hooks/useCaughtPokemonStore';
import { getTypeImgLink } from "../utilities/searchPokemon";
import PokeBallIcon from "./PokeBallIcon";


type Props = {
  pokemon: PokemonInfo
}

export const PokemonCard = (props: Props) => {
  const {
    pokemon: {
      name,
      dex_number,
      type_1,
      type_2,
      image_url
    }
  } = props;

  const caughtPokemon = useCaughtPokemonStore(state => state.caughtPokemon);
  const catchPokemon = useCaughtPokemonStore(state => state.catchPokemon);
  const releasePokemon = useCaughtPokemonStore(state => state.releasePokemon);

  const handleClick = () => {
    !caughtPokemon.includes(dex_number) ?
    catchPokemon(dex_number) :
    releasePokemon(dex_number)
  }
  
  return (
  <div className={ `max-w-sm rounded overflow-hidden shadow-lg content-center ${ caughtPokemon.includes(dex_number) ? 'bg-green-500' : 'bg-white' }` }>
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 text-center">{ name }</div>
      <p className="text-gray-700 text-base text-center">
        #{ dex_number }
      </p>
      <button type='button' onClick={ handleClick } >{ PokeBallIcon(caughtPokemon.includes(dex_number)) }</button>
      <img className="w-48 h-48 inline" src={ image_url } alt={ `${ name }_png` }></img>
    </div>
  <div className="px-2 pb-4 text-center">
    <img src={ getTypeImgLink(type_1) } className="h-7 w-32 inline"></img>
    {
      type_2 != null &&
      <img src={ getTypeImgLink(type_2) } className="h-7 w-32 inline"></img>
    }
  </div>
</div>
);
}
