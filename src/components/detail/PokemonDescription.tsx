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
        {pokemon?.types.map(type =>
          <div
            className='py-1 px-2 font-bold text-center text-white rounded text-shadow-type'
            style={{ backgroundColor: type.color }}
          >
            {capitalizeFirstLetterOfEveryWord(type.name)}
          </div>)}
      </div>
    </div>
  )
}

export default PokemonDescription
