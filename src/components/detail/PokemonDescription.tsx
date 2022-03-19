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
        {pokemon?.types.map((type, i) =>
          <div
            key={i}
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
    </div>
  )
}

export default PokemonDescription
