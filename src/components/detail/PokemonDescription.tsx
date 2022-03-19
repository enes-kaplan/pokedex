import type { Pokemon } from '../../functions/types'
import { capitalizeFirstLetterOfEveryWord } from '../../functions/common'

interface props {
  pokemon: Pokemon | undefined
}

const PokemonDescription = ({ pokemon }: props) => {
  return (
    <div className='col-span-2'>
      <div className='flex gap-4 items-baseline'>
        <h2>Type</h2>
        {pokemon?.types.map((type, iType) =>
          <div
            key={iType}
            className='py-1 px-2 font-bold text-center text-white rounded select-none text-shadow-type'
            style={{ backgroundColor: type.color }}
          >
            {capitalizeFirstLetterOfEveryWord(type.name)}
          </div>)}
      </div>
      <div className='mt-4'>
        <h2>Description</h2>
        <p>{pokemon?.description}</p>
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <h2>Abilities</h2>
        {pokemon?.abilities.map((ability, iAbility) =>
          <div key={iAbility}>
            {ability}
          </div>
        )}
      </div>
    </div>
  )
}

export default PokemonDescription
