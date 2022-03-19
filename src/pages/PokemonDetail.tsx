import type { Pokemon } from '../functions/types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosHandler } from '../functions/axios'
import { parsePokemon } from '../functions/common'
import PokemonDescription from '../components/detail/PokemonDescription'

const PokemonDetail = () => {
  const routeParams = useParams()
  const [pokemon, setPokemon] = useState<Pokemon>()

  useEffect(() => {
    const fetchData = async() => {
      const [data, error] = await axiosHandler<any>(`pokemon/${routeParams.no}`, 'GET')
      const [speciesData, speciesError] = await axiosHandler<any>(`pokemon-species/${routeParams.no}`, 'GET')
      if (!error) {
        const parsedPokemon = parsePokemon(data, speciesData)
        setPokemon(parsedPokemon)
      }
    }

    fetchData()
  }, [routeParams])

  return (
    <div className=' px-8 mx-auto mt-8 max-w-7xl'>
      <div className='flex flex-col w-full sm:flex-row sm:justify-between sm:items-baseline'>
        <h1>{pokemon?.name}</h1>
        <h2>#{pokemon?.no}</h2>
      </div>
      <div className='grid grid-cols-1 mt-4 sm:grid-cols-3'>
        <img src={pokemon?.image} alt={`Pokemon ${pokemon?.name}`} className='col-span-1 w-60 h-60' />
        <PokemonDescription pokemon={pokemon} />
      </div>
    </div>
  )
}

export default PokemonDetail
