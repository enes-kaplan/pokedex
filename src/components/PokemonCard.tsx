import type { Pokemon } from '../functions/types'
import { useState, useEffect } from 'react'
import { axiosHandler } from '../functions/axios'
import { parsePokemon } from '../functions/common'

interface props {
  url: string
}

const PokemonCard = ({ url }: props) => {
  const [pokemon, setPokemon] = useState<Pokemon>()

  useEffect(() => {
    const fetchData = async() => {
      const endpoint = url.split('v2/')[1]
      const [data, error] = await axiosHandler<any>(endpoint, 'GET')
      if (!error) {
        const parsedPokemon = parsePokemon(data)
        setPokemon(parsedPokemon)
      }
    }

    fetchData()
  }, [url])

  const card = (
    <div className='flex relative flex-col items-center p-6 bg-white rounded shadow-lg hover:shadow-2xl hover:translate-x-px hover:translate-y-px cursor-pointer transition-hover'>
      {/* For pokedex loader, used this gif: https://dribbble.com/shots/14003796-Pok-dex-Pokemon-Pixel-Art */}
      {/* Used this tool to remove background: https://onlinegiftools.com/remove-gif-background */}
      {/* Used this tool to trim the empty spaces around: https://trimmy.io/ */}
      <img
        src={pokemon?.image ?? '/loader.gif'}
        loading='lazy'
        alt={`Pokemon ${pokemon?.name}`}
        className="w-40 h-40"
      />
      <div className='absolute top-2 right-2 text-lg font-medium leading-tight text-gray-600'>
        #{pokemon?.no ?? '?'}
      </div>
      <div className='text-3xl font-medium text-gray-600'>
        {pokemon?.name ?? 'Loading...'}
      </div>
    </div>
  )

  return card
}

export default PokemonCard
