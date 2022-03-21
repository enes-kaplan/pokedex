import type { Pokemon, TypeRelation } from '../../functions/types'
import { capitalizeFirstLetterOfEveryWord } from '../../functions/common'
import LoaderLine from '../LoaderLine'

interface props {
  pokemon: Pokemon | undefined
  strength?: TypeRelation[]
  weakness?: TypeRelation[]
  loading: boolean
}

const PokemonDescription = ({
  pokemon, strength, weakness, loading
}: props) => {
  return (
    <div className='col-span-2'>
      <div className='flex gap-4 items-center'>
        <h3>Type</h3>
        {loading
          ? (<>
            <LoaderLine width='75px' height='32px' />
            <LoaderLine width='75px' height='32px' />
          </>)
          : pokemon?.types.map((type, iType) =>
            <div
              key={iType}
              className='py-1 px-2 font-bold text-center text-white rounded select-none text-shadow-type'
              style={{ backgroundColor: type.color }}
            >
              {capitalizeFirstLetterOfEveryWord(type.name)}
            </div>
          )
        }
      </div>
      <div className='mt-4'>
        <h3>Description</h3>
        {loading
          ? (<>
            <LoaderLine width='100%' height='22px' />
            <LoaderLine width='40%' height='22px' classes='mt-1' />
          </>)
          : <p>{pokemon?.description}</p>
        }
      </div>
      <div className='flex w-full'>
        <div className='flex flex-col grow gap-2 mt-4'>
          <h3>Abilities</h3>
          {loading
            ? <>
              <LoaderLine width='90px' height='24px' />
              <LoaderLine width='90px' height='24px' />
            </>
            : pokemon?.abilities.map((ability, iAbility) =>
              <div key={iAbility}>
                {ability}
              </div>
            )}
        </div>
        <div className='flex flex-col grow gap-2 mt-4'>
          <h3>Height</h3>
          <div>
            {loading
              ? <LoaderLine width='60px' height='24px' />
              : pokemon?.height
            }
          </div>
        </div>
        <div className='flex flex-col grow gap-2 mt-4'>
          <h3>Weight</h3>
          <div>
            {loading
              ? <LoaderLine width='60px' height='24px' />
              : pokemon?.weight
            }
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h3>Strengths</h3>
        <div className='flex gap-4 items-center mt-1'>
          {loading
            ? (<>
              <LoaderLine width='95px' height='32px' />
              <LoaderLine width='95px' height='32px' />
              <LoaderLine width='95px' height='32px' />
            </>)
            : strength?.map((type, sType) =>
              <div
                key={`strength-${sType}`}
                className='py-1 px-2 font-bold text-center text-white rounded select-none text-shadow-type'
                style={{ backgroundColor: type.color }}
              >
                {capitalizeFirstLetterOfEveryWord(type.name)}
                <span className='ml-2 text-xs'>x{type.multiplier}</span>
              </div>
            )}
        </div>
      </div>
      <div className='mt-4'>
        <h3>Weaknesses</h3>
        <div className='flex gap-4 items-center mt-1'>
          {loading
            ? (<>
              <LoaderLine width='95px' height='32px' />
              <LoaderLine width='95px' height='32px' />
              <LoaderLine width='95px' height='32px' />
            </>)
            : weakness?.map((type, wType) =>
              <div
                key={`strength-${wType}`}
                className='py-1 px-2 font-bold text-center text-white rounded select-none text-shadow-type'
                style={{ backgroundColor: type.color }}
              >
                {capitalizeFirstLetterOfEveryWord(type.name)}
                <span className='ml-2 text-xs'>x{type.multiplier}</span>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default PokemonDescription
