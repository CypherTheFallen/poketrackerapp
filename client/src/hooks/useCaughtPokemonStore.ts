import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';


interface CaughtPokemonState {
  caughtPokemon: number[],
  catchPokemon: (dexNumber: number) => void
  releasePokemon: (dexNumber: number) => void
}

export const useCaughtPokemonStore = create<CaughtPokemonState>()(
  devtools(
    persist(
      (set) => ({
        caughtPokemon: [],
        catchPokemon: (dexNumber) => set((state) => ({ caughtPokemon: [...state.caughtPokemon, dexNumber]  })),
        releasePokemon: (dexNumber) => set((state) => ({ caughtPokemon: state.caughtPokemon.filter(pokemon => pokemon !== dexNumber)  }))
      }),
      {
        name: 'pokemon-home'
      }
    )
  )
)
