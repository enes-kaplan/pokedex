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
      <h3 className='absolute top-2 right-2'>
        #{pokemon?.no ?? '?'}
      </h3>
      <h2>
        {pokemon?.name ?? 'Loading...'}
      </h2>
    </div>
  )

  const cardBack = (
    <Link to={`/pokemon/${pokemon?.no}`} className='bg-white shadow-lg flip-card-back'>
      <img src='/pokedex.png' alt='Pokedex for details' className='h-40' />
      <h2>Go to details</h2>
    </Link>
  )

  return (
    <FlipCard front={cardFront} back={cardBack} />
  )
}

export default PokemonCard
