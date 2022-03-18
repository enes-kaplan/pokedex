import type { Pokemon } from '../functions/types'
import { useState, useEffect } from 'react'
import { axiosHandler } from '../functions/axios'
import { parsePokemon } from '../functions/common'
import { Link } from 'react-router-dom'
import FlipCard from './FlipCard'

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

  const cardFront = (
    <div className='bg-white shadow-lg flip-card-front'>
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

  const cardBack = (
    <Link to={`/pokemon/${pokemon?.no}`} className='bg-red-200 flip-card-back'>
      <img src='/pokedex.png' alt='Pokedex for details' className='' />
      <span className='text-2xl font-bold text-gray-600'>
        Go to details
      </span>
    </Link>
  )

  return (
    <FlipCard front={cardFront} back={cardBack} />
  )
}

export default PokemonCard
