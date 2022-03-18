import type { Pokemon } from '../functions/types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosHandler } from '../functions/axios'
import { parsePokemon } from '../functions/common'

const PokemonDetail = () => {
  const routeParams = useParams()
  const [pokemon, setPokemon] = useState<Pokemon>()

  useEffect(() => {
    const fetchData = async() => {
      const [data, error] = await axiosHandler<any>(`pokemon/${routeParams.no}`, 'GET')
      if (!error) {
        const parsedPokemon = parsePokemon(data)
        setPokemon(parsedPokemon)
      }
    }

    fetchData()
  }, [routeParams])

  return (
    <div className=' px-8 mx-auto mt-8 max-w-7xl'>
      <div className='flex flex-col w-full sm:flex-row sm:justify-between sm:items-baseline'>
        <div className='text-5xl font-medium text-gray-600'>{pokemon?.name}</div>
        <div className='text-3xl font-medium text-gray-600'>#{pokemon?.no}</div>
      </div>
      <div className='grid grid-cols-1 mt-4 sm:grid-cols-3'>
        <img src={pokemon?.image} alt={`Pokemon ${pokemon?.name}`} className='col-span-1 w-60 h-60' />
        <div className='col-span-2 h-10 bg-red-100'></div>
      </div>
    </div>
  )
}

export default PokemonDetail
