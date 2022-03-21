import type { Pokemon, TypeRelation } from '../functions/types'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { axiosHandler } from '../functions/axios'
import { parsePokemon, getTypeRelations } from '../functions/common'
import PokemonDescription from '../components/detail/PokemonDescription'
import LoaderLine from '../components/LoaderLine'

const PokemonDetail = () => {
  const routeParams = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [strength, setStrengths] = useState<TypeRelation[]>()
  const [weakness, setWeakness] = useState<TypeRelation[]>()

  useEffect(() => {
    const fetchData = async() => {
      setLoading(true)

      const [data, error] = await axiosHandler<any>(`pokemon/${routeParams.no}`, 'GET')
      const [speciesData] = await axiosHandler<any>(`pokemon-species/${routeParams.no}`, 'GET')
      const [strengthData, weaknessData] = await getTypeRelations(data)

      setLoading(false)

      if (!error) {
        const parsedPokemon = parsePokemon(data, speciesData)
        setPokemon(parsedPokemon)
        setStrengths(strengthData)
        setWeakness(weaknessData)
      }
    }

    fetchData()
  }, [routeParams])

  return (
    <div className='overflow-y-auto relative px-8 pb-16 mx-auto mt-8 max-w-7xl h-full hiddenScrollbar'>
      <div className='flex flex-col w-full sm:flex-row sm:justify-between sm:items-baseline'>
        {loading
          ? <LoaderLine width='250px' height='48px' />
          : <h1>{pokemon?.name}</h1>
        }
        {loading
          ? <LoaderLine width='80px' height='36px' />
          : <h2>#{routeParams.no}</h2>
        }
      </div>
      <div className='grid grid-cols-1 mt-4 sm:grid-cols-3'>
        {loading
          ? <img src='/loader.gif' alt='Pokedex loader' className='col-span-1 w-60 h-60' />
          : <img src={pokemon?.image} alt={`Pokemon ${pokemon?.name}`} className='col-span-1 w-60 h-60' />
        }

        <PokemonDescription
          pokemon={pokemon}
          strength={strength}
          weakness={weakness}
          loading={loading}
        />
      </div>
      <button
        className='flex fixed top-16 bottom-0 left-0 justify-center items-center w-16 text-7xl font-extrabold bg-gray-300 opacity-75 hover:opacity-100 disabled:opacity-20 disabled:cursor-not-allowed transition-hover h-content'
        disabled={routeParams.no === '1'}
        onClick={() => { navigate(`/pokemon/${parseInt(routeParams.no!) - 1}`, { replace: true }) }}
      >
        {'<'}
      </button>
      <button
        className='flex fixed top-16 right-0 bottom-0 justify-center items-center w-16 text-7xl font-extrabold bg-gray-300 opacity-75 hover:opacity-100 disabled:opacity-20 disabled:cursor-not-allowed transition-hover h-content'
        disabled={routeParams.no === '898'}
        onClick={() => { navigate(`/pokemon/${parseInt(routeParams.no!) + 1}`, { replace: true }) }}
      >
        {'>'}
      </button>
    </div>
  )
}

export default PokemonDetail
