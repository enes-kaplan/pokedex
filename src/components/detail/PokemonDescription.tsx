import type { Pokemon } from '../../functions/types'
import { capitalizeFirstLetterOfEveryWord } from '../../functions/common'

interface props {
  pokemon: Pokemon | undefined
}

const PokemonDescription = ({ pokemon }: props) => {
  return (
    <div className='col-span-2'>
      <div className='flex gap-4 items-baseline'>
        <div className='text-3xl font-medium text-gray-600'>Type</div>
        {pokemon?.types.map(type =>
          <div
            className='py-1 px-2 font-bold text-center rounded'
            style={{ color: type.color, backgroundColor: type.background }}
          >
            {capitalizeFirstLetterOfEveryWord(type.name)}
          </div>)}
      </div>
    </div>
  )
}

export default PokemonDescription
