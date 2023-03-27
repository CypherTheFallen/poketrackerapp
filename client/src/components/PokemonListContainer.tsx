import { useEffect, useState } from "react";
import { PokemonInfo } from "../data/pokemon";
import { types } from "../data/types";
import { useCaughtPokemonStore } from "../hooks/useCaughtPokemonStore";
import { getTotalPokemon, searchByDexNumber, searchByName, searchByType } from '../utilities/searchPokemon';
import { PokemonGrid } from "./PokemonGrid";


type Props = {};

export const PokemonListContainer = (props: Props) => {
  const [resultPokemon, setResultPokemon] = useState<PokemonInfo[] | null>(null);
  const [type1Selected, setType1Selected] = useState('all');
  const [type2Selected, setType2Selected] = useState('all');

  useEffect(() => {
    setResultPokemon(searchByType(type1Selected, type2Selected));
  }, [type1Selected, type2Selected]);

  const caughtPokemon = useCaughtPokemonStore(state => state.caughtPokemon);
  const totalPokemon = getTotalPokemon();

  const handleSearch = (value: string) => {
    let result;

    if (/^\d+$/.test(value)) {
      result = searchByDexNumber(value);
    } else {
      result = searchByName(value);
    }

    setResultPokemon(result);
  }

  return (
    <div>
      <div className="grid gap-4 grid-cols-4 grid-rows-1 mb-4">
        <span className='inline-grid grid-cols-1 col-span-2 gap-2'>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pokemon-list-filter"
          >
            Filter By Name or PokeDex Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pokemon-list-filter"
            type="text"
            placeholder="Enter name or PokeDex Number..."
            onChange={ e => handleSearch(e.target.value.toLowerCase()) }
          />
        </span>
        <span className='inline-grid grid-cols-1 gap-2'>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pokemon-type-filter-1"
          >
            Type 1
          </label>
          <select
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pokemon-type-filter-1"
            onChange={ (e) => setType1Selected(e.target.value.toLowerCase()) }
          >
            <option>All</option>
            { types.map(type => <option>{ type.name[0].toUpperCase() + type.name.slice(1) }</option>) } 
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </span>
        <span className='inline-grid grid-cols-1 gap-2'>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pokemon-type-filter-2"
          >
            Type 2
          </label>
          <select
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pokemon-type-filter-2"
            onChange={ (e) => setType2Selected(e.target.value.toLowerCase()) }
          >
            <option>All</option>
            { types.map(type => <option>{ type.name[0].toUpperCase() + type.name.slice(1) }</option>) } 
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </span>
      </div>
      <p>
        You have caught <strong>{ caughtPokemon.length }</strong> out of <strong>{ totalPokemon }</strong>, or&nbsp;
        <strong>~{ Math.round(caughtPokemon.length / totalPokemon * 100) }%</strong>
      </p>
      <PokemonGrid pokemon={ resultPokemon } />
    </div>
  );
};
